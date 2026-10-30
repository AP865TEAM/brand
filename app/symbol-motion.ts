import { symbolContours } from './symbol-contours';

export const SYMBOL_CYCLE_SECONDS = 15;
export { symbolContours };

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
export function easeBetween(time: number, from: number, to: number) {
  const t = clamp((time - from) / (to - from));
  return t * t * (3 - 2 * t);
}

// Corresponding structural corners keep every vertical stroke and connecting
// bay in the same contour order as the source symbol, avoiding twisted lines.
const structuralCorners = [
  [[281,170],[281,170],[281,135],[315,135],[315,170],[315,170],[315,288],[281,288],[281,170]],
  [[349,495],[349,460],[349,460],[349,340],[343,340],[341,340],[337,340],[330,340],[315,340],
   [315,460],[315,460],[315,495],[281,495],[281,460],[281,460],[281,306],[300,306],[315,306],
   [345,306],[349,306],[349,170],[349,170],[349,135],[383,135],[383,170],[383,170],
   [383,460],[383,460],[383,495],[349,495]],
  [[417,495],[417,460],[417,460],[417,170],[417,170],[417,135],[451,135],[451,170],[451,170],
   [451,340],[457,340],[459,340],[463,340],[470,340],[485,340],[485,170],[485,170],
   [485,135],[519,135],[519,170],[519,170],[519,374],[500,374],[485,374],[455,374],
   [451,374],[451,460],[451,460],[451,495],[417,495]],
];
export const buildingContours = structuralCorners.map(corners => {
  const result = [...corners[0]];
  for (let index = 1; index < corners.length; index++) {
    for (const fraction of [1 / 3, 2 / 3, 1]) {
      result.push(mix(corners[index - 1][0], corners[index][0], fraction), mix(corners[index - 1][1], corners[index][1], fraction));
    }
  }
  return result;
});

export function contourPath(index: number, morph: number) {
  const source = buildingContours[index];
  const target = symbolContours[index];
  const values = target.map((value, coordinate) => mix(source[coordinate], value, morph).toFixed(3));
  return `M${values.slice(0, 2).join(' ')} C${values.slice(2).join(' ')} Z`;
}

export type BlueprintLine = {
  from: readonly [number, number, number, number];
  to: readonly [number, number, number, number];
  delay: number;
  weight: number;
  kind: 'facade' | 'floor' | 'guide';
};

const blueprints: { to: BlueprintLine['to']; kind: BlueprintLine['kind']; weight: number }[] = [];
const add = (to: BlueprintLine['to'], kind: BlueprintLine['kind'], weight: number) => blueprints.push({ to, kind, weight });

// A conceptual elevation follows AP865's vertical façade rhythm. These are
// proportional construction guides, not dimensions for a construction drawing.
for (let index = 0; index <= 35; index++) add([281 + index * 6.8, 135, 281 + index * 6.8, 495], 'facade', .58);
for (let index = 0; index <= 7; index++) {
  const y = 135 + index * (360 / 7);
  add([281, y, 519, y], 'floor', 1);
  add([262, y, 274, y], 'guide', .6);
  add([527, y, 539, y], 'guide', .6);
}
// Entrance, mullions, ground and extension/dimension lines.
([[382, 445, 382, 495], [418, 445, 418, 495], [382, 445, 418, 445], [400, 445, 400, 495],
 [255, 495, 545, 495], [255, 502, 545, 502]] as const).forEach(line => add(line, 'floor', .9));
([[281, 100, 281, 525], [519, 100, 519, 525], [400, 88, 400, 542],
 [217, 135, 577, 135], [217, 495, 577, 495], [237, 135, 237, 495],
 [281, 525, 519, 525], [231, 141, 243, 129], [231, 501, 243, 489],
 [275, 531, 287, 519], [513, 531, 525, 519],
 [220, 112, 236, 112], [228, 104, 228, 120], [564, 518, 580, 518], [572, 510, 572, 526]
] as const).forEach(line => add(line, 'guide', .55));

export const blueprintLines: readonly BlueprintLine[] = blueprints.map((line, index) => {
  const angle = index * 2.399963;
  const centerX = 400 + Math.cos(angle) * (170 + index % 5 * 29);
  const centerY = 315 + Math.sin(angle) * (130 + index % 7 * 15);
  const direction = angle * .3;
  const length = 18 + index % 6 * 12;
  return {
    ...line,
    from: [centerX, centerY, centerX + Math.cos(direction) * length, centerY + Math.sin(direction) * length],
    delay: (index % 11) * .075,
  };
});

export function symbolFrame(seconds: number) {
  return {
    assembled: easeBetween(seconds, .6, 3.9),
    morph: easeBetween(seconds, 6.1, 9.5),
    fill: easeBetween(seconds, 8.8, 10.2),
    guides: (1 - easeBetween(seconds, 5.9, 8.1)) * easeBetween(seconds, .15, 1),
    opacity: 1 - easeBetween(seconds, 13.3, 14.65),
    phase: seconds < 3.9 ? 'lines' : seconds < 6.1 ? 'blueprint' : seconds < 10.2 ? 'morph' : 'symbol',
  };
}

export function blueprintFrame(line: BlueprintLine, seconds: number) {
  const gather = easeBetween(seconds, .45 + line.delay, 3.1 + line.delay);
  const retract = easeBetween(seconds, 6.1 + line.delay * .4, 8.1 + line.delay * .4);
  const middleY = (line.to[1] + line.to[3]) / 2;
  const target = line.to.map((coordinate, index) => index % 2 === 0
    ? mix(coordinate, 400, retract * .7)
    : mix(coordinate, middleY, retract * .35));
  return {
    points: line.from.map((coordinate, index) => mix(coordinate, target[index], gather)),
    opacity: (line.kind === 'guide' ? .48 : line.kind === 'floor' ? .7 : .5) * (1 - retract),
  };
}
