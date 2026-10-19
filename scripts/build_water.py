"""scripts/build_water.py

Builds public/ground/water.json: every named water feature on the map of the
publications page, from the USGS Geographic Names Information System (GNIS),
laid over the page's own elevations (public/ground/llano-dem.webp).

    python scripts/build_water.py public/ground/llano-dem.webp \
        DomesticNames_TX.txt DomesticNames_NM.txt public/ground/water.json

The GNIS state files ("Domestic Names", state text files) come from
https://www.usgs.gov/us-board-on-geographic-names/download-gnis-data .
Needs numpy, scipy, scikit-image and Pillow. Takes about two minutes.

What it does:
  1. Keeps every GNIS stream, valley (draws, canyons, hollows, arroyos), lake,
     reservoir, spring and fall with a point inside the map's frame; drops
     features GNIS marks "(historical)".
  2. Routes water over the elevations (depressions filled, each cell draining
     to its steepest neighbour) and traces each stream and valley from its
     GNIS source to its GNIS mouth. A course that ends in a playa, or that the
     routing sends elsewhere, is traced along the low ground between the two
     instead. Courses that rise or end beyond the frame are cut at its edge.
  3. Outlines each lake from its basin and each reservoir from its water
     surface; stock tanks and anything too small to outline are points.
  4. Ranks them: tier 1 and 2 are drawn faintly and may be named when the
     land is viewed bare; tier 3 answers to the pointer only.

The written file holds, per feature, [name, kind, tier, weight, points], kind
being l (course), a (lake outline), p (pond or tank), s (spring), f (falls);
points are x, y pairs in tenths of an elevation cell, counted from the centre
of the top-left cell, as src/lib/water.ts reads them.
"""
import csv, heapq, json, math, re, sys
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage import measure

DEM_PATH, OUT = sys.argv[1], sys.argv[-1]
GNIS = sys.argv[2:-1]

# The frame of llano-dem.webp (edges of the cells), as printed by build_dem.py.
L0, L1, A0, A1 = -103.66328, -100.53672, 33.0, 34.5
COS = math.cos(math.radians((A0 + A1) / 2))
KM = 111.2

# ---------------------------------------------------------------- 1. names
def within(la, lo):
    return la is not None and A0 < la < A1 and L0 < lo < L1

def num(v):
    try:
        return float(v)
    except ValueError:
        return None

names = {}
for path in GNIS:
    with open(path, encoding='utf-8-sig') as fh:
        for r in csv.DictReader(fh, delimiter='|'):
            pa, po = num(r['prim_lat_dec']), num(r['prim_long_dec'])
            sa, so = num(r['source_lat_dec']), num(r['source_long_dec'])
            if not (within(pa, po) or within(sa, so)):
                continue
            names[r['feature_id']] = dict(id=r['feature_id'], name=r['feature_name'], cls=r['feature_class'],
                                          lat=pa, lon=po, slat=sa, slon=so)
R = list(names.values())
print(len(R), 'GNIS features in the frame')

# ---------------------------------------------------------------- elevations
im = np.asarray(Image.open(DEM_PATH).convert('RGB')).astype(np.int64)
EF = ((im[..., 0] << 8) | im[..., 1]) / 4.0      # metres
H, W = EF.shape
lon = lambda x: L0 + (x + 0.5) / W * (L1 - L0)
lat = lambda y: A1 - (y + 0.5) / H * (A1 - A0)
cx = lambda lo: (lo - L0) / (L1 - L0) * W - 0.5
cy = lambda la: (A1 - la) / (A1 - A0) * H - 0.5

# ---------------------------------------------------------------- 2. flow
NB = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
E = EF
seen = np.zeros(E.shape, bool)
filled = np.zeros(E.shape)
pq = []
for x in range(W):
    for y in (0, H - 1):
        pq.append((E[y, x], y, x)); seen[y, x] = True
for y in range(1, H - 1):
    for x in (0, W - 1):
        pq.append((E[y, x], y, x)); seen[y, x] = True
heapq.heapify(pq)
order = np.empty(H * W, np.int64)
n = 0
while pq:
    z, y, x = heapq.heappop(pq)
    filled[y, x] = z
    order[n] = y * W + x; n += 1
    for dy, dx in NB:
        yy, xx = y + dy, x + dx
        if 0 <= yy < H and 0 <= xx < W and not seen[yy, xx]:
            seen[yy, xx] = True
            v = E[yy, xx]
            heapq.heappush(pq, (v if v > z + 1e-4 else z + 1e-4, yy, xx))
F = filled
pad = np.pad(F, 1, constant_values=-np.inf)
best = np.zeros(E.shape)
rec = np.full(E.shape, -1, np.int64)
Y, X = np.mgrid[0:H, 0:W]
for dy, dx in NB:
    nb = pad[1 + dy:1 + dy + H, 1 + dx:1 + dx + W]
    drop = (F - nb) / (1.4142 if dy and dx else 1.0)
    b = drop > best
    best[b] = drop[b]
    rec[b] = (np.clip(Y + dy, 0, H - 1) * W + np.clip(X + dx, 0, W - 1))[b]
# the frame's edge drains off the map
rec[0, :] = rec[-1, :] = rec[:, 0] = rec[:, -1] = -1
rec = rec.ravel()
accf = np.ones(H * W)
for i in order[::-1]:
    r = rec[i]
    if r >= 0:
        accf[r] += accf[i]
acc = accf.reshape(H, W)
ups = [[] for _ in range(H * W)]
for i in np.nonzero(rec >= 0)[0]:
    ups[rec[i]].append(i)
print('flow routed')

def km(i, la, lo):
    y, x = divmod(i, W)
    return math.hypot((lon(x) - lo) * COS * KM, (lat(y) - la) * KM)

def down(i, limit):
    p = [i]
    while len(p) < limit:
        r = rec[p[-1]]
        if r < 0:
            break
        p.append(int(r))
    return p

def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0]), np.array(pts[-1]); ab = b - a; nn = np.hypot(*ab) or 1e-12
    d = [abs(ab[0] * (p[1] - a[1]) - ab[1] * (p[0] - a[0])) / nn for p in pts[1:-1]]
    k = int(np.argmax(d)) + 1
    if d[k - 1] > eps:
        return rdp(pts[:k + 1], eps)[:-1] + rdp(pts[k:], eps)
    return [pts[0], pts[-1]]

def valley_path(sl, so, ml, mo):
    """Cheapest way along the low ground from source to mouth."""
    ys, xs, ym, xm = round(cy(sl)), round(cx(so)), round(cy(ml)), round(cx(mo))
    m = 40
    y0, y1 = max(0, min(ys, ym) - m), min(H, max(ys, ym) + m + 1)
    x0, x1 = max(0, min(xs, xm) - m), min(W, max(xs, xm) + m + 1)
    sub = EF[y0:y1, x0:x1]; h, w = sub.shape
    es, em = EF[ys, xs], EF[ym, xm]
    vx, vy = xm - xs, ym - ys; vv = vx * vx + vy * vy or 1
    Yy, Xx = np.mgrid[y0:y1, x0:x1]
    t = np.clip(((Xx - xs) * vx + (Yy - ys) * vy) / vv, 0, 1)
    cost = 1 + 0.6 * np.maximum(0, sub - (es + (em - es) * t))
    dist = np.full(sub.shape, np.inf); prev = np.full(sub.shape, -1, np.int64)
    s0, g = (ys - y0, xs - x0), (ym - y0, xm - x0)
    dist[s0] = 0; q = [(0.0, s0[0], s0[1])]
    while q:
        d, y, x = heapq.heappop(q)
        if (y, x) == g:
            break
        if d > dist[y, x]:
            continue
        for dy, dx in NB:
            yy, xx = y + dy, x + dx
            if 0 <= yy < h and 0 <= xx < w:
                nd = d + cost[yy, xx] * (1.4142 if dy and dx else 1)
                if nd < dist[yy, xx]:
                    dist[yy, xx] = nd; prev[yy, xx] = y * w + x; heapq.heappush(q, (nd, yy, xx))
    if not np.isfinite(dist[g]):
        return None
    p = []; c = g[0] * w + g[1]
    while c >= 0:
        yy, xx = divmod(c, w); p.append((y0 + yy) * W + x0 + xx); c = prev[yy, xx]
    return p[::-1]

lines = []
for r in R:
    if r['cls'] not in ('Stream', 'Valley'):
        continue
    ml, mo, sl, so = r['lat'], r['lon'], r['slat'], r['slon']
    note = ''
    straight = math.hypot((mo - so) * COS * KM, (ml - sl) * KM) if sl is not None else 0
    rad = 6
    if within(sl, so):
        # from each cell near the source, follow the water down; keep the
        # course that comes nearest the mouth (and starts nearest the source)
        y0, x0 = round(cy(sl)), round(cx(so))
        limit = int(straight / 0.08 * 3) + 300
        bestc = None
        for y in range(max(1, y0 - rad), min(H - 1, y0 + rad + 1)):
            for x in range(max(1, x0 - rad), min(W - 1, x0 + rad + 1)):
                if (y - y0) ** 2 + (x - x0) ** 2 > rad * rad:
                    continue
                p = down(y * W + x, limit)
                ds = [km(i, ml, mo) for i in p[::2]]
                k = int(np.argmin(ds))
                sc = ds[k] + 0.25 * math.hypot((x - x0) * 0.08, (y - y0) * 0.083)
                if bestc is None or sc < bestc[0]:
                    bestc = (sc, ds[k], p if not within(ml, mo) else p[:2 * k + 1])
        _, miss, path = bestc
        if not within(ml, mo):
            note = 'mouth outside frame'
        elif miss > 0.6:
            alt = valley_path(sl, so, ml, mo)
            if alt:
                path, note = alt, 'valley path'
    elif within(ml, mo):
        # rising beyond the frame: climb from the mouth, keeping the climb
        # that heads toward the source
        y0, x0 = round(cy(ml)), round(cx(mo))
        limit = int(straight / 0.08 * 2.5) + 100
        bestc = None
        for y in range(max(1, y0 - rad), min(H - 1, y0 + rad + 1)):
            for x in range(max(1, x0 - rad), min(W - 1, x0 + rad + 1)):
                if (y - y0) ** 2 + (x - x0) ** 2 > rad * rad or accf[y * W + x] < 30:
                    continue
                p = [y * W + x]
                while len(p) < limit:
                    c = ups[p[-1]]
                    if not c:
                        break
                    nxt = max(c, key=lambda u: accf[u])
                    if accf[nxt] < 30:
                        break
                    p.append(nxt)
                sc = km(p[-1], sl, so) + 0.25 * math.hypot((x - x0) * 0.08, (y - y0) * 0.083)
                if bestc is None or sc < bestc[0]:
                    bestc = (sc, p)
        if bestc is None:
            continue
        path, note = bestc[1][::-1], 'source outside frame'
    else:
        continue
    if len(path) < 6:
        continue
    pts = rdp([(round(lon(i % W), 5), round(lat(i // W), 5)) for i in path], 0.00025)
    length = sum(math.hypot((b[0] - a[0]) * COS * KM, (b[1] - a[1]) * KM) for a, b in zip(pts, pts[1:]))
    lines.append(dict(r, line=pts, km=round(length, 1), note=note))
print(len(lines), 'courses traced;', sum(1 for o in lines if o['note'] == 'valley path'), 'along the low ground')

# ---------------------------------------------------------------- 3. lakes
CELL_KM2 = (L1 - L0) / W * COS * KM * (A1 - A0) / H * KM
flat = ndimage.maximum_filter(EF, 3) - ndimage.minimum_filter(EF, 3) < 0.5
lab, _ = ndimage.label(flat)
sizes = np.bincount(lab.ravel())
smooth5 = ndimage.maximum_filter(EF, 5) - ndimage.minimum_filter(EF, 5) < 1.0

def ring(reg, y0, x0):
    cs = measure.find_contours(np.pad(reg, 1).astype(float), 0.5); c = max(cs, key=len)
    step = max(1, len(c) // 80)
    return [(round(L0 + (x0 + px - 0.5) / W * (L1 - L0), 5), round(A1 - (y0 + py - 0.5) / H * (A1 - A0), 5)) for py, px in c[::step]]

def close(reg):
    return ndimage.binary_closing(np.pad(reg, 2), iterations=2)

def flat_shape(y, x):
    """A water surface the elevation data holds level (3DEP flattens water)."""
    rad = 10; y0, y1, x0, x1 = max(0, y - rad), min(H, y + rad + 1), max(0, x - rad), min(W, x + rad + 1)
    ids = [i for i in np.unique(lab[y0:y1, x0:x1]) if i and sizes[i] >= 10]
    if not ids:
        return None
    k = max(ids, key=lambda i: sizes[i])
    if sizes[k] >= 200000:
        return None
    z = float(np.median(EF[lab == k]))
    sl = ndimage.find_objects((lab == k).astype(int))[0]
    Y0, X0 = max(0, sl[0].start - 150), max(0, sl[1].start - 150)
    win = EF[Y0:sl[0].stop + 150, X0:sl[1].stop + 150]
    lb, _ = ndimage.label(np.abs(win - z) <= 0.3)
    seed = np.argwhere(lab[Y0:Y0 + win.shape[0], X0:X0 + win.shape[1]] == k)[0]
    reg = lb == lb[tuple(seed)]; nn = int(reg.sum())
    return (ring(close(reg), Y0 - 2, X0 - 2), nn) if 10 <= nn <= 4000 else None

def level_shape(y, x):
    """The nearest smooth patch, grown over the ground at its own level."""
    rad = 14; y0, y1, x0, x1 = max(0, y - rad), min(H, y + rad + 1), max(0, x - rad), min(W, x + rad + 1)
    cand = np.argwhere(smooth5[y0:y1, x0:x1])
    if not len(cand):
        return None
    d = (cand[:, 0] + y0 - y) ** 2 + (cand[:, 1] + x0 - x) ** 2
    bestl = None
    for j in np.argsort(d)[:12]:
        sy, sx = cand[j][0] + y0, cand[j][1] + x0
        Y0, X0 = max(0, sy - 150), max(0, sx - 150)
        win = EF[Y0:sy + 151, X0:sx + 151]
        lb, _ = ndimage.label((np.abs(win - EF[sy, sx]) <= 0.6) & smooth5[Y0:sy + 151, X0:sx + 151])
        reg = lb == lb[sy - Y0, sx - X0]; nn = int(reg.sum())
        if 10 <= nn <= 4000 and (bestl is None or nn > bestl[0]):
            bestl = (nn, reg, Y0, X0)
    if not bestl:
        return None
    nn, reg, Y0, X0 = bestl
    return (ring(close(reg), Y0 - 2, X0 - 2), nn)

def basin_shape(y, x):
    """A playa: the ground within 1.5 m of the lowest point near the name."""
    rad = 5; y0, y1, x0, x1 = max(0, y - rad), min(H, y + rad + 1), max(0, x - rad), min(W, x + rad + 1)
    sub = EF[y0:y1, x0:x1]; kk = np.unravel_index(np.argmin(sub), sub.shape); fy, fx = y0 + kk[0], x0 + kk[1]
    Y0, X0 = max(0, fy - 120), max(0, fx - 120)
    win = EF[Y0:fy + 121, X0:fx + 121]
    lb, _ = ndimage.label(win <= EF[fy, fx] + 1.5); reg = lb == lb[fy - Y0, fx - X0]
    nn = int(reg.sum())
    touches = reg[0].any() or reg[-1].any() or reg[:, 0].any() or reg[:, -1].any()
    return (ring(close(reg), Y0 - 2, X0 - 2), nn) if 6 <= nn <= 1500 and not touches else None

waters, kept = [], []
for r in R:
    if r['cls'] not in ('Lake', 'Reservoir', 'Spring', 'Falls') or '(historical)' in r['name']:
        continue
    la, lo = r['lat'], r['lon']
    if not within(la, lo):
        continue
    if any(nm == r['name'] and abs(a - la) < 0.02 and abs(b - lo) < 0.02 for nm, a, b in kept):
        continue
    kept.append((r['name'], la, lo))
    y, x = int((A1 - la) / (A1 - A0) * H), int((lo - L0) / (L1 - L0) * W)
    tank = r['cls'] == 'Reservoir' and re.search(r'Tank|Pond|Windmill', r['name'])
    shape = None
    if r['cls'] == 'Lake':
        shape = basin_shape(y, x) or level_shape(y, x)
    elif r['cls'] == 'Reservoir' and not tank:
        opts = [o for o in (level_shape(y, x), flat_shape(y, x)) if o]
        shape = max(opts, key=lambda o: o[1]) if opts else basin_shape(y, x)
    if shape:
        waters.append(dict(r, kind='lake', ring=shape[0], km2=round(shape[1] * CELL_KM2, 2)))
    else:
        waters.append(dict(r, kind='spring' if r['cls'] == 'Spring' else 'falls' if r['cls'] == 'Falls' else 'pond', at=[round(lo, 5), round(la, 5)]))
print(len(waters), 'lakes, reservoirs, springs and falls;', sum(1 for w in waters if w['kind'] == 'lake'), 'outlined')

# ---------------------------------------------------------------- 4. rank, write
plain = re.compile(r'Number|Site|Service|Structure|Reservoir|Tank|Pond|Terminal|Feedlot')
feats = []
for o in lines:
    tier = 1 if o['km'] >= 30 else 2 if o['km'] >= 8 else 3
    weight = o['km'] * (1.6 if re.search(r'River|Canyon|Fork', o['name']) else 1)
    feats.append((o['name'], 'l', tier, round(weight, 1), o['line']))
for o in waters:
    if o['kind'] == 'lake':
        if o['cls'] == 'Reservoir':
            tier = 3 if plain.search(o['name']) else 2
        else:
            tier = 1 if o['km2'] >= 1.5 else 2
        weight = round(o['km2'] * 12, 1) + (8 if o['cls'] == 'Reservoir' and tier == 2 else 0)
        feats.append((o['name'], 'a', tier, round(weight, 1), o['ring']))
    else:
        feats.append((o['name'], {'pond': 'p', 'spring': 's', 'falls': 'f'}[o['kind']], 3, 0, [o['at']]))

# points in tenths of a cell, from the centre of the top-left cell
cl, ct = (L1 - L0) / W, (A1 - A0) / H
D0, D1, B0, B1 = L0 + cl / 2, L1 - cl / 2, A0 + ct / 2, A1 - ct / 2
gx = lambda lo: round((lo - D0) / (D1 - D0) * (W - 1) * 10)
gy = lambda la: round((B1 - la) / (B1 - B0) * (H - 1) * 10)
out = []
for name, kind, tier, weight, pts in sorted(feats, key=lambda f: (f[2], -f[3])):
    c = []
    for lo_, la_ in pts:
        c += [gx(lo_), gy(la_)]
    out.append([name, kind, tier, weight, c])
with open(OUT, 'w', encoding='ascii') as fh:
    json.dump({'v': 1, 'source': 'USGS GNIS DomesticNames TX, NM; traced over llano-dem.webp', 'f': out}, fh, separators=(',', ':'))
print(len(out), 'features written to', OUT)
