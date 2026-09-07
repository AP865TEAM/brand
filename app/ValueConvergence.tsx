'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from 'motion/react';
import { keywords, sourceValues } from './foundation';
import { CYCLE_SECONDS, ORBIT_RADIUS_RATIO, initialAngle, orbitFrames } from './value-orbit';

// Match the supplied diagram; wording remains editable in foundation.ts.
const sourceOrder = ['10', '02', '04', '07', '08', '06', '01', '03', '05', '09'];
const groups = keywords.map(keyword => ({
  ...keyword,
  values: sourceValues.filter(value => keyword.sources.includes(value.id))
    .sort((a, b) => sourceOrder.indexOf(a.id) - sourceOrder.indexOf(b.id)),
}));
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
      // Read only stationary square stages; transforms cannot trigger a rebuild.
      const widths = groups.map((_, index) => root.querySelector<HTMLElement>(`[data-stage="${index}"]`)!.getBoundingClientRect().width);
      const geometry = JSON.stringify(widths);
      if (geometry === lastGeometry) return;
      lastGeometry = geometry;
      playback.current?.stop();
      const sequence: AnimationSequence = [];
      groups.forEach((group, groupIndex) => group.values.forEach((value, index) => {
        const path = orbitFrames(widths[groupIndex] * ORBIT_RADIUS_RATIO, initialAngle(index, group.values.length, groupIndex), index);
        sequence.push([
          `[data-particle="${value.id}"]`, { x: path.x, y: path.y },
          { at: 0, duration: CYCLE_SECONDS, times: path.times, ease: 'linear' },
        ]);
      }));
      sequence.push(
        ['.orbital-text', { opacity: [1, 1, 0, 0, 1], scale: [1, 1, .08, .08, 1] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .27, .38, .92, 1], ease: [.22, 1, .36, 1] }],
        ['.orbital-dot', { opacity: [0, 0, 1, 1, 0, 0], scale: [0, 0, 1, 1, 0, 0] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .28, .38, .59, .86, 1], ease: 'easeInOut' }],
        ['.value-circle-title, .value-circle-outline', { scale: [1, 1, 1.12, 1.12, 1] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .59, .84, .92, 1], ease: [.22, 1, .36, 1] }],
      );
      const controls = animate(sequence, { repeat: Infinity, repeatDelay: 0 });
      playback.current = controls;
      if (!playState.current) controls.pause();
    };
    build();
    const observer = new ResizeObserver(build);
    observer.observe(root);
    root.querySelectorAll('[data-stage]').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); playback.current?.stop(); playback.current = null; };
  }, [animate, reduced, scope]);

  useEffect(() => {
    if (shouldPlay) playback.current?.play();
    else playback.current?.pause();
  }, [shouldPlay]);

  return <div className={`value-orbit${reduced ? ' is-reduced' : ''}`} ref={scope}>
    <div className="value-orbit-grid">
      {groups.map((group, index) => <article className="value-orbit-group" data-stage={index} key={group.keyword} aria-labelledby={`circle-title-${index}`}>
        <ul className="orbital-sources">
          {group.values.map((value, order) => {
            const angle = initialAngle(order, group.values.length, index);
            return <li className="orbital-particle" data-particle={value.id} key={value.id}
              style={{ left: `${50 + Math.cos(angle) * ORBIT_RADIUS_RATIO * 100}%`, top: `${50 + Math.sin(angle) * ORBIT_RADIUS_RATIO * 100}%` }}>
              <span className="orbital-label"><span className="orbital-text">{value.title}</span></span>
              <span className="orbital-dot-center" aria-hidden="true"><span className="orbital-dot" /></span>
            </li>;
          })}
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
