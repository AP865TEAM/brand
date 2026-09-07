// One eight-second loop: curved text → condensation → dot orbit → absorption.
export const CYCLE_SECONDS = 8;
export const VIEWBOX_SIZE = 400;

export function initialAngle(index: number, count: number, group: number) {
  return -Math.PI / 2 + index * Math.PI * 2 / count + group * .22;
}

export function particleLayout(index: number, count: number, group: number) {
  // Five full sentences use two concentric paths, avoiding overlapping text.
  const twoTracks = count > 3;
  const outer = index % 2 === 0;
  const trackCount = twoTracks ? (outer ? Math.ceil(count / 2) : Math.floor(count / 2)) : count;
  return {
    angle: initialAngle(twoTracks ? Math.floor(index / 2) : index, trackCount, group) + (twoTracks && !outer ? .45 : 0),
    radiusRatio: twoTracks ? (outer ? .46 : .35) : .4,
    halfArc: Math.PI / trackCount * .9,
  };
}

export function textArc(radius: number, halfAngle: number) {
  const x = radius * Math.sin(halfAngle);
  const y = radius * (1 - Math.cos(halfAngle));
  // The arc midpoint is (0,0), shared with the eventual dot's centre.
  return `M ${-x} ${y} A ${radius} ${radius} 0 0 1 ${x} ${y}`;
}

export function orbitFrames(radius: number, angle: number, index: number) {
  const times = Array.from({ length: 101 }, (_, frame) => frame / 100);
  const finish = .82 + index * .012;
  const points = times.map(time => {
    // Reset only while both the text and the dot are invisible.
    if (time >= .92) return { x: 0, y: 0, rotation: 0 };
    const progress = Math.min(1, Math.max(0, (time - .65) / (finish - .65)));
    const inward = progress * progress * (3 - 2 * progress);
    const distance = radius * (1 - inward);
    // Continuous angular velocity through the text-to-dot handoff.
    const turns = .12 * time + .8 * time * time;
    const theta = angle + turns * Math.PI * 2;
    return {
      x: Math.cos(theta) * distance - Math.cos(angle) * radius,
      y: Math.sin(theta) * distance - Math.sin(angle) * radius,
      rotation: turns * 360,
    };
  });
  return { times, x: points.map(point => point.x), y: points.map(point => point.y), rotation: points.map(point => point.rotation) };
}
