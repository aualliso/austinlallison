// src/lib/ground-worker.ts
//
// Shades the land off the page's main thread, so drawing the relief never
// stalls scrolling or a card being picked up. It is handed the elevations
// once, then a job each time the light or the window changes.
import { localRelief, shade, type ShadeJob } from './ground-shade';

let elev: Float32Array | null = null;
let focus: Uint8Array | null = null;
let relief: Float32Array | null = null;

self.onmessage = (ev: MessageEvent) => {
  const msg = ev.data;
  if (msg.type === 'elev') {
    elev = new Float32Array(msg.buffer);
    focus = new Uint8Array(msg.focus);
    relief = localRelief(elev, msg.w, msg.h, msg.r);
    return;
  }
  if (msg.type === 'job' && elev && focus && relief) {
    const job = msg.job as ShadeJob;
    const pixels = shade(job, elev, focus, relief);
    (self as unknown as Worker).postMessage({ id: job.id, pixels }, [pixels.buffer]);
  }
};
