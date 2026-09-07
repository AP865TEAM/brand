// One five-second loop: text orbit → dot orbit → inward spiral → quiet reset.
export const CYCLE_SECONDS = 5;
export const ORBIT_RADIUS_RATIO = .4;

export function initialAngle(index: number, count: number, group: number) {
  return -Math.PI / 2 + index * Math.PI * 2 / count + group * .22;
}

export function orbitFrames(radius: number, angle: number, index: number) {
  const times = Array.from({ length: 101 }, (_, frame) => frame / 100);
  const finish = .80 + index * .012;
  const points = times.map(time => {
    // Reset only while both the text and the dot are invisible.
    if (time >= .90) return { x: 0, y: 0 };
    const progress = Math.min(1, Math.max(0, (time - .59) / (finish - .59)));
    const inward = progress * progress * (3 - 2 * progress);
    const distance = radius * (1 - inward);
    const turns = time <= .34 ? time * .32 : .34 * .32 + (time - .34) * 1.7;
    const theta = angle + turns * Math.PI * 2;
    return {
      x: Math.cos(theta) * distance - Math.cos(angle) * radius,
      y: Math.sin(theta) * distance - Math.sin(angle) * radius,
    };
  });
  return { times, x: points.map(point => point.x), y: points.map(point => point.y) };
}
