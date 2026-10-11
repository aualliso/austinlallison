// scripts/dev-private.mjs
//
// PRIVATE PICTURES IN `npm run dev`. On the live site an address under
// /collections/-/ is answered by functions/collections/[[path]].js, which
// reads the private bucket for a signed-in relative. The dev server has no
// such function, so a private photograph whose files have been moved to the
// private bucket would be a broken picture while you work on its record -
// which is exactly when you need to see it, to draw its boxes.
//
// This stands in for the function, on your machine only: it answers those
// addresses from the private bucket with the R2 settings already in .env
// (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PRIVATE_BUCKET).
// There is no sign-in, because the dev server is only ever you.
//
// `apply: 'serve'` keeps it out of every build. It is added to the Vite
// plugins in astro.config.mjs.

import { loadEnv } from 'vite';

const PRIVATE = '/collections/-/';

export function privateBucketInDev() {
  return {
    name: 'private-bucket-in-dev',
    apply: 'serve',
    configureServer(server) {
      let ready = null; // { s3, GetObjectCommand, Bucket } | false
      const connect = async () => {
        const env = { ...loadEnv(server.config.mode, process.cwd(), ''), ...process.env };
        const need = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_PRIVATE_BUCKET'];
        const missing = need.filter((k) => !env[k]);
        if (missing.length) {
          console.warn(`[private] Private pictures cannot be shown: ${missing.join(', ')} not in .env.`);
          return false;
        }
        const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
        return {
          GetObjectCommand,
          Bucket: env.R2_PRIVATE_BUCKET,
          s3: new S3Client({
            region: 'auto',
            endpoint: env.R2_ENDPOINT || `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            forcePathStyle: !!env.R2_ENDPOINT,
            credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
          }),
        };
      };

      server.middlewares.use(async (req, res, next) => {
        const path = decodeURIComponent((req.url ?? '').split('?')[0]);
        if (!path.startsWith(PRIVATE)) return next();
        try {
          ready ??= await connect();
          if (!ready) {
            res.statusCode = 404;
            return res.end('The private bucket is not set up in .env');
          }
          const object = await ready.s3.send(
            new ready.GetObjectCommand({ Bucket: ready.Bucket, Key: path.slice(PRIVATE.length) })
          );
          if (object.ContentType) res.setHeader('Content-Type', object.ContentType);
          if (object.ContentDisposition) res.setHeader('Content-Disposition', object.ContentDisposition);
          res.setHeader('Cache-Control', 'private, max-age=3600');
          object.Body.pipe(res);
        } catch (err) {
          res.statusCode = err?.$metadata?.httpStatusCode === 404 || err?.name === 'NoSuchKey' ? 404 : 502;
          res.end(`Private bucket: ${err?.name ?? 'error'}`);
        }
      });
    },
  };
}
