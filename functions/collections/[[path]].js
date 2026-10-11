// functions/collections/[[path]].js
//
// THE DOOR. A Cloudflare Pages Function that answers every request under
// /collections. It does three things, and the public site does not depend
// on any of them:
//
//   1. SIGNS FAMILY IN AND OUT.  POST /collections/family checks the shared
//      password and sets a cookie for DAYS days. /collections/family/out
//      clears it.
//   2. SERVES THE FAMILY PAGES.  The build (scripts/family.mjs) makes the
//      collections pages twice. Where the family copy of a page differs
//      from the public one - it lists a private photograph, or the page IS
//      one - the family copy is stored ENCRYPTED under /_family/, and this
//      function decrypts it for a signed-in relative. Everyone else gets the
//      public file, exactly as if this function were not here.
//   3. SERVES PRIVATE PICTURES.  /collections/-/... is read from the private
//      R2 bucket (tiles, downloads, face crops), for a signed-in relative
//      only. That bucket has no address of its own.
//
// WHERE THE SECRETS ARE. On the Pages project, under Settings:
//   FAMILY_PASSWORD   (secret)   what relatives type
//   FAMILY_KEY        (secret)   a long random string; signs the cookie and
//                                is the key the family pages are encrypted
//                                with, so the BUILD needs it too
//   PRIVATE_BUCKET    (R2 bucket binding)   the private bucket
// Changing FAMILY_PASSWORD signs everyone out. So does changing FAMILY_KEY,
// and then the site must be rebuilt, since the pages were encrypted with it.
//
// IF THIS FUNCTION IS NOT RUNNING - the secrets are missing, or the free
// plan's daily allowance is spent and Pages "fails open" - the site serves
// its static files, which are the public site and some encrypted files
// nobody can read. Nothing private is a static file in the clear. That is
// the property the whole arrangement rests on; keep it when changing this.
//
// WHO IS TOLD WHAT. Someone not signed in who asks for an address the public
// site does not have is sent to the sign-in page - whether the address is a
// private photograph or simply a mistake. The answer is the same for both,
// so it cannot be used to find out which photographs or people exist.
//
// No imports and no build step: Pages compiles this file as it stands.

const DAYS = 14; // keep equal to DAYS in src/pages/collections/family.astro
const COOKIE = 'fam'; // the sign-in itself; pages cannot read it
const MARKER = 'fam_ui'; // tells the page to show the family bar; grants nothing
const SIGN_IN = '/collections/family';
const SIGN_OUT = '/collections/family/out';
const PRIVATE = '/collections/-/';
const GUIDE = '/collections';
const WRONG_DELAY_MS = 700; // a wrong password costs this long, every time

const enc = new TextEncoder();
const dec = new TextDecoder();

const b64url = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
const fromB64url = (s) =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

const secret = (v) => (typeof v === 'string' ? v.trim() : '');

/* ------------------------------------------------------------------ *
 * The cookie
 *
 * 'v1.<expiry>.<signature>': the expiry in seconds, signed with a key made
 * from FAMILY_KEY and the password together - which is why changing either
 * signs everyone out. Nothing is stored anywhere; the signature is the
 * whole of the session.
 * ------------------------------------------------------------------ */
const signingKey = (env) =>
  crypto.subtle.importKey(
    'raw',
    enc.encode(`${secret(env.FAMILY_KEY)}\n${secret(env.FAMILY_PASSWORD)}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

const cookieOf = (request, name) => {
  for (const part of (request.headers.get('Cookie') ?? '').split(';')) {
    const at = part.indexOf('=');
    if (at > 0 && part.slice(0, at).trim() === name) return part.slice(at + 1).trim();
  }
  return '';
};

async function isSignedIn(request, env) {
  const [v, exp, sig] = cookieOf(request, COOKIE).split('.');
  if (v !== 'v1' || !/^\d{1,12}$/.test(exp ?? '') || !sig) return false;
  if (Number(exp) * 1000 < Date.now()) return false;
  try {
    return await crypto.subtle.verify('HMAC', await signingKey(env), fromB64url(sig), enc.encode(`v1.${exp}`));
  } catch {
    return false;
  }
}

/** Compared through the signing key, so the time taken says nothing. */
async function samePassword(env, given) {
  const key = await signingKey(env);
  const real = await crypto.subtle.sign('HMAC', key, enc.encode(secret(env.FAMILY_PASSWORD)));
  return crypto.subtle.verify('HMAC', key, real, enc.encode(given));
}

/** Only ever back into the collections; anything else is the guide. */
const safeNext = (v) => {
  const s = String(v ?? '');
  if (!/^\/collections(\/|\?|$)/.test(s)) return GUIDE;
  if (s.includes('\\') || s.includes('//') || /[\r\n]/.test(s)) return GUIDE;
  if (s.startsWith(SIGN_IN)) return GUIDE;
  return s;
};

const cookie = (name, value, maxAge, readable) =>
  `${name}=${value}; Path=${readable ? '/' : GUIDE}; Max-Age=${maxAge}; Secure; SameSite=Lax${readable ? '' : '; HttpOnly'}`;

const redirect = (location, cookies = []) => {
  const headers = new Headers({ Location: location, 'Cache-Control': 'no-store' });
  for (const c of cookies) headers.append('Set-Cookie', c);
  return new Response(null, { status: 303, headers });
};

async function signIn(request, env, configured) {
  let form;
  try {
    form = await request.formData();
  } catch {
    form = new FormData();
  }
  const next = safeNext(form.get('next'));
  const back = (code) => redirect(`${SIGN_IN}?e=${code}&next=${encodeURIComponent(next)}`);
  if (!configured) return back('setup');

  const given = String(form.get('password') ?? '');
  const ok = given.length > 0 && given.length <= 256 && (await samePassword(env, given));
  if (!ok) {
    await new Promise((r) => setTimeout(r, WRONG_DELAY_MS));
    return back('1');
  }

  const life = DAYS * 86400;
  const exp = Math.floor(Date.now() / 1000) + life;
  const sig = b64url(await crypto.subtle.sign('HMAC', await signingKey(env), enc.encode(`v1.${exp}`)));
  return redirect(next, [cookie(COOKIE, `v1.${exp}.${sig}`, life, false), cookie(MARKER, '1', life, true)]);
}

const signOut = () => redirect(GUIDE, [cookie(COOKIE, '', 0, false), cookie(MARKER, '', 0, true)]);

/* ------------------------------------------------------------------ *
 * The family pages
 *
 * /_family/index.bin lists, encrypted like everything beside it:
 *   public   every address the public site has under /collections
 *   family   every address whose family copy differs, with the name of the
 *            encrypted file that holds it
 * Each file is 12 bytes of nonce, then AES-256-GCM ciphertext. The key is
 * made from FAMILY_KEY, the same way scripts/family.mjs makes it.
 * ------------------------------------------------------------------ */
let pagesKeyFor = null; // { secret, key }
async function pagesKey(env) {
  const s = secret(env.FAMILY_KEY);
  if (pagesKeyFor?.secret !== s) {
    const raw = await crypto.subtle.digest('SHA-256', enc.encode(`family-pages\n${s}`));
    pagesKeyFor = { secret: s, key: await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']) };
  }
  return pagesKeyFor.key;
}

/** One encrypted file, decrypted - or null if it is not there or not ours. */
async function sealed(context, name) {
  const res = await context.env.ASSETS.fetch(new URL(`/_family/${name}.bin`, context.request.url));
  // A site with no 404 page answers a missing file with its home page.
  if (!res.ok || (res.headers.get('Content-Type') ?? '').includes('text/html')) return null;
  const data = new Uint8Array(await res.arrayBuffer());
  if (data.length < 12 + 16) return null;
  try {
    return await crypto.subtle.decrypt({ name: 'AES-GCM', iv: data.slice(0, 12) }, await pagesKey(context.env), data.slice(12));
  } catch {
    return null;
  }
}

// Read once and kept for as long as this copy of the function lives. A new
// deployment is a new copy, so the list can never be from another build.
let index = null;
async function familyIndex(context) {
  if (index) return index;
  const buf = await sealed(context, 'index');
  if (!buf) return null;
  const read = JSON.parse(dec.decode(buf));
  index = { public: new Set(read.public), family: read.family };
  return index;
}

/** An address as the lists hold it: no /index.html, no trailing slash. */
const keyOf = (path) => path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
const looksLikePage = (key) => !/\.[a-z0-9]{1,8}$/i.test(key) || /\.html$/i.test(key);

const notFound = () =>
  new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });

/* ------------------------------------------------------------------ *
 * The private bucket
 * ------------------------------------------------------------------ */
async function fromBucket(context, key) {
  const { env, request } = context;
  if (!env.PRIVATE_BUCKET || !key || key.includes('..')) return notFound();
  if (request.method !== 'GET' && request.method !== 'HEAD') return notFound();
  const object = await env.PRIVATE_BUCKET.get(key, { onlyIf: request.headers });
  if (!object) return notFound();
  const headers = new Headers();
  object.writeHttpMetadata(headers); // content type, and "save, don't show" on downloads
  headers.set('ETag', object.httpEtag);
  // A tile's address holds a hash of its scan, so it never changes; a face
  // crop's does not, so it is asked for again within the hour.
  headers.set('Cache-Control', key.startsWith('iiif/') ? 'private, max-age=2592000, immutable' : 'private, max-age=3600');
  headers.set('X-Robots-Tag', 'noindex');
  // No body means the browser's own copy is still good.
  if (!object.body) return new Response(null, { status: 304, headers });
  return new Response(request.method === 'HEAD' ? null : object.body, { headers });
}

/* ------------------------------------------------------------------ *
 * Every request under /collections
 * ------------------------------------------------------------------ */
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  let path = url.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    /* an address that will not decode is used as it came */
  }
  const configured = !!(secret(env.FAMILY_KEY) && secret(env.FAMILY_PASSWORD));

  if (keyOf(path) === SIGN_IN) {
    return request.method === 'POST' ? signIn(request, env, configured) : next();
  }
  if (keyOf(path) === SIGN_OUT) return signOut();

  // Not set up: there is no family side, only the public site.
  if (!configured) return path.startsWith(PRIVATE) ? notFound() : next();

  const signedIn = await isSignedIn(request, env);

  if (path.startsWith(PRIVATE)) {
    return signedIn ? fromBucket(context, path.slice(PRIVATE.length)) : notFound();
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const lists = await familyIndex(context);
  if (!lists) return next(); // nothing private in this build
  const key = keyOf(path);

  if (signedIn) {
    const hit = lists.family[key];
    if (!hit) return next(); // the same page for family as for everyone
    // A page is served with a trailing slash, as the static ones are, so
    // any relative address inside it means the same thing.
    if (hit.dir && !path.endsWith('/')) {
      return new Response(null, { status: 308, headers: { Location: `${url.pathname}/${url.search}` } });
    }
    const body = await sealed(context, hit.file);
    if (!body) return next();
    return new Response(request.method === 'HEAD' ? null : body, {
      headers: { 'Content-Type': hit.type, 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' },
    });
  }

  if (lists.public.has(key)) return next();
  // Not on the public site. Private, or a mistake: the answer does not say.
  if (!looksLikePage(key)) return notFound();
  return redirect(`${SIGN_IN}?next=${encodeURIComponent(url.pathname + url.search)}`);
}
