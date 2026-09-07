'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from 'motion/react';
import { keywords, sourceValues } from './foundation';

// Match the supplied diagram; wording remains editable in foundation.ts.
const sourceOrder = ['10', '02', '04', '07', '08', '06', '01', '03', '05', '09'];
const groups = keywords.map(keyword => ({
  ...keyword,
  values: sourceValues.filter(value => keyword.sources.includes(value.id))
    .sort((a, b) => sourceOrder.indexOf(a.id) - sourceOrder.indexOf(b.id)),
}));
const CYCLE = 5;
type Playback = { play: () => void; pause: () => void; stop: () => void };

export default function ValueConvergence() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const playback = useRef<Playback | null>(null);
  const inView = useInView(scope, { amount: .15 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const shouldPlay = inView && visible && !paused && !reduced;
  const playState = useRef(shouldPlay);
  playState.current = shouldPlay;

  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    if (!scope.current || reduced) return;
    const root = scope.current;
    let lastGeometry = '';
    const build = () => {
      // Measure stationary anchors, never the animated children.
      const measurements = groups.flatMap((group, index) => {
        const circle = root.querySelector<HTMLElement>(`[data-circle="${index}"]`)!.getBoundingClientRect();
        return group.values.map((value, order) => {
          const pill = root.querySelector<HTMLElement>(`[data-anchor="${value.id}"]`)!.getBoundingClientRect();
          // Absorb the closest label first, then work up each circle's stack.
          const start = (1.25 + (group.values.length - 1 - order) * .25) / CYCLE;
          return { id: value.id, start, x: circle.x + circle.width / 2 - pill.x - pill.width / 2,
            y: circle.y + circle.height / 2 - pill.y - pill.height / 2 };
        });
      });
      const geometry = JSON.stringify(measurements);
      if (geometry === lastGeometry) return;
      lastGeometry = geometry;
      playback.current?.stop();
      const sequence: AnimationSequence = measurements.flatMap(point => [
        [
          `[data-pill="${point.id}"]`,
          { x: [0, 0, point.x, point.x, 0, 0], y: [0, 0, point.y, point.y, 0, 0],
            scale: [1, 1, .2, .2, 1, 1] },
          { at: 0, duration: CYCLE, times: [0, point.start, point.start + .17, .86, .8601, 1], ease: [.22, 1, .36, 1] },
        ],
        [
          `[data-pill="${point.id}"]`,
          { opacity: [1, 1, 0, 0, 0, 1] },
          { at: 0, duration: CYCLE, times: [0, point.start + .08, point.start + .17, .86, .8601, 1], ease: 'easeInOut' },
        ],
      ] as AnimationSequence);
      sequence.push(
        ['.value-circle-title, .value-circle-outline', { scale: [1, 1, 1.04, 1.04, 1] },
          { at: 0, duration: CYCLE, times: [0, .42, .66, .84, 1], ease: [.22, 1, .36, 1] }],
        ['.value-circle-outline', { opacity: [1, 1, .45, 1, 1] },
          { at: 0, duration: CYCLE, times: [0, .34, .52, .66, 1], ease: 'easeInOut' }],
      );
      const controls = animate(sequence, { repeat: Infinity, repeatDelay: 0 });
      playback.current = controls;
      if (!playState.current) controls.pause();
    };
    build();
    const observer = new ResizeObserver(build);
    observer.observe(root);
    root.querySelectorAll('.value-pill-anchor, .value-circle').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); playback.current?.stop(); playback.current = null; };
  }, [animate, reduced, scope]);

  useEffect(() => {
    if (shouldPlay) playback.current?.play();
    else playback.current?.pause();
  }, [shouldPlay]);

  return <div className={`value-orbit${reduced ? ' is-reduced' : ''}`} ref={scope}>
    <div className="value-orbit-grid">
      {groups.map((group, index) => <article className="value-orbit-group" key={group.keyword} aria-labelledby={`circle-title-${index}`}>
        <ul className="value-pill-stack">
          {group.values.map(value => <li className="value-pill-anchor" data-anchor={value.id} key={value.id}>
            <span className="value-pill" data-pill={value.id}>{value.title}</span>
          </li>)}
        </ul>
        <div className="value-circle" data-circle={index}>
          <div className="value-circle-outline" aria-hidden="true" />
          <h2 className="value-circle-title" id={`circle-title-${index}`}>{group.keyword}</h2>
        </div>
      </article>)}
    </div>
    {/* Hidden in normal viewing; keyboard/screen-reader users retain a pause action. */}
    {!reduced && <button className="motion-keyboard-control" type="button" aria-pressed={paused}
      onClick={() => setPaused(value => !value)}>{paused ? '코어밸류 모션 재생' : '코어밸류 모션 일시정지'}</button>}
  </div>;
}
