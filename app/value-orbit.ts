// One eight-second loop. Each character keeps its own path through absorption.
export const CYCLE_SECONDS = 8;
export const VIEWBOX_SIZE = 400;

export function particleLayout(index: number, count: number, group: number) {
  const twoTracks = count > 3;
  const outer = index % 2 === 0;
  const trackCount = twoTracks ? (outer ? Math.ceil(count / 2) : Math.floor(count / 2)) : count;
  const trackIndex = twoTracks ? Math.floor(index / 2) : index;
  return {
    angle: -Math.PI / 2 + trackIndex * Math.PI * 2 / trackCount + group * .22 + (twoTracks && !outer ? .45 : 0),
    // Circle radius is .30: close lettering, with two readable tracks for Premium.
    radiusRatio: twoTracks && outer ? .408 : .345,
    halfArc: Math.PI / trackCount * .9,
  };
}

type Layout = ReturnType<typeof particleLayout>;
export function letterLayout(title: string, layout: Layout, measuredWidths?: number[]) {
  const characters = Array.from(title);
  const widths = characters.map((character, index) => measuredWidths?.[index] ?? (/\s/.test(character) ? 5 : 14));
  const radius = layout.radiusRatio * VIEWBOX_SIZE;
  const available = radius * layout.halfArc * 2 * .94;
  const width = widths.reduce((sum, value) => sum + value, 0);
  const fit = Math.min(1, available / Math.max(1, width));
  let cursor = -width * fit / 2;
  return characters.map((character, index) => {
    const advance = widths[index] * fit;
    const angle = layout.angle + (cursor + advance / 2) / radius;
    cursor += advance;
    return { character, angle, radius, fit };
  });
}

// Quintic easing has zero velocity and acceleration at either end.
export function smoothRange(time: number, start: number, end: number) {
  const t = Math.min(1, Math.max(0, (time - start) / (end - start)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function coreScale(time: number) {
  return 1 + .12 * smoothRange(time, .55, .87) * (1 - smoothRange(time, .925, 1));
}

export function letterFrame(time: number, letter: { radius: number; angle: number }, index: number, count: number, sourceIndex: number) {
  // Reset while invisible; return to the exact opening geometry at eight seconds.
  const reset = time >= .92;
  const localTime = reset ? 0 : time;
  const offset = index / Math.max(1, count - 1);
  const stagger = offset * .07 + sourceIndex * .008;
  const condense = smoothRange(localTime, .28 + stagger, .48 + stagger);
  const absorb = smoothRange(localTime, .56 + stagger, .80 + stagger);
  const turns = .13 * localTime + .45 * localTime * localTime;
  const theta = letter.angle + turns * Math.PI * 2 + (offset - .5) * .12 * condense;
  const radius = letter.radius * (1 - .72 * absorb);
  const opacity = reset ? smoothRange(time, .94, 1) : 1 - smoothRange(absorb, .12, .46);
  return {
    x: VIEWBOX_SIZE / 2 + Math.cos(theta) * radius,
    y: VIEWBOX_SIZE / 2 + Math.sin(theta) * radius,
    rotation: theta * 180 / Math.PI + 90,
    opacity,
    glyphScale: 1 - .91 * condense,
    glyphOpacity: 1 - smoothRange(condense, .48, 1),
    dotOpacity: smoothRange(condense, .5, 1),
    dotRadius: (1.1 + .4 * offset) * (1 - .7 * absorb),
  };
}

export function letterTransform(frame: Pick<ReturnType<typeof letterFrame>, 'x' | 'y' | 'rotation'>) {
  // Stable decimal strings avoid server/client float hydration differences.
  return `translate(${frame.x.toFixed(3)} ${frame.y.toFixed(3)}) rotate(${frame.rotation.toFixed(3)})`;
}
