import { symbolContours } from './symbol-contours';

export const SYMBOL_CYCLE_SECONDS = 15;
export { symbolContours };

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function easeBetween(time: number, from: number, to: number) {
  const t = clamp((time - from) / (to - from));
  return t * t * (3 - 2 * t);
}

// Preserve the supplied sketch, including its signage and entrance. The SVG
// viewport crops only the surrounding paper; it does not redraw the building.
export const sketchPlacement = {
  x: 280.556, y: 66, width: 238.889, height: 500,
  viewBox: '168 32 688 1440',
  facadeLeft: 330.208, facadeRight: 469.792,
  facadeTop: 77.111, facadeBottom: 552.111,
};

// At the beginning, the official symbol's contours align with the tall façade.
// A positive affine transform releases them into their original proportions;
// no contour interpolation or independently moving vertices can twist the logo.
export function symbolBounds(release: number) {
  return {
    top: mix(sketchPlacement.facadeTop, 135, release),
    height: mix(sketchPlacement.facadeBottom - sketchPlacement.facadeTop, 360, release),
    width: mix(sketchPlacement.facadeRight - sketchPlacement.facadeLeft, 202.497187, release),
  };
}

export function contourPath(index: number, release: number) {
  const bounds = symbolBounds(release);
  const values = symbolContours[index].map((coordinate, axis) => axis % 2 === 0
    ? 400 + (coordinate - 400) * bounds.width / 202.497187
    : bounds.top + (coordinate - 135) * bounds.height / 360);
  return `M${values.slice(0, 2).map(n => n.toFixed(3)).join(' ')} C${values.slice(2).map(n => n.toFixed(3)).join(' ')} Z`;
}

export function symbolFrame(seconds: number) {
  const trace = easeBetween(seconds, 1.5, 5.9);
  const release = easeBetween(seconds, 6.2, 9.5);
  const fill = easeBetween(seconds, 8.1, 10.3);
  const returnToSketch = easeBetween(seconds, 13.3, 15);
  const bounds = symbolBounds(release);
  const ink = [220, 83, 16].map((value, index) => Math.round(mix(value, [40, 31, 28][index], release)));
  return {
    release,
    trace,
    fill,
    sketchOpacity: (1 - .68 * easeBetween(seconds, 1.3, 3.1)) * (1 - easeBetween(seconds, 5.9, 8.1)) + returnToSketch,
    symbolOpacity: 1 - easeBetween(seconds, 12.8, 14.2),
    traceClip: trace === 0 ? 0 : trace === 1 ? 650 : sketchPlacement.facadeTop + trace * (sketchPlacement.facadeBottom - sketchPlacement.facadeTop),
    fillClip: fill === 0 ? 0 : fill === 1 ? 650 : bounds.top + fill * bounds.height,
    outlineColor: `rgb(${ink.join(',')})`,
    outlineOpacity: 1 - easeBetween(seconds, 9.8, 10.6),
    haloOpacity: .8 * (1 - release),
  };
}
