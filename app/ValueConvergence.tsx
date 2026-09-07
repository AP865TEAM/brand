'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from 'motion/react';
import { keywords, sourceValues } from './foundation';
import { CYCLE_SECONDS, VIEWBOX_SIZE, particleLayout, textArc, orbitFrames } from './value-orbit';

// Match the supplied diagram; wording remains editable in foundation.ts.
const sourceOrder = ['10', '02', '04', '07', '08', '06', '01', '03', '05', '09'];
const groups = keywords.map(keyword => ({
  ...keyword,
  values: sourceValues.filter(value => keyword.sources.includes(value.id))
    .sort((a, b) => sourceOrder.indexOf(a.id) - sourceOrder.indexOf(b.id)),
}));
type Playback = { play: () => void; pause: () => void; stop: () => void };

export default function ValueConvergence() {
  const idPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, '');
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
        const layout = particleLayout(index, group.values.length, groupIndex);
        const path = orbitFrames(widths[groupIndex] * layout.radiusRatio, layout.angle, index);
        const text = root.querySelector<SVGTextElement>(`[data-arc-text="${value.id}"]`)!;
        text.style.fontSize = `${Math.max(14, Math.min(18, widths[groupIndex] * .045)) * VIEWBOX_SIZE / widths[groupIndex]}px`;
        text.removeAttribute('textLength');
        const arcLength = 2 * layout.radiusRatio * VIEWBOX_SIZE * layout.halfArc;
        text.setAttribute('textLength', String(Math.min(text.getComputedTextLength(), arcLength * .94)));
        sequence.push(
          [`[data-particle="${value.id}"]`, { x: path.x, y: path.y },
            { at: 0, duration: CYCLE_SECONDS, times: path.times, ease: 'linear' }],
          [`[data-tangent="${value.id}"]`, { rotate: path.rotation },
            { at: 0, duration: CYCLE_SECONDS, times: path.times, ease: 'linear' }],
        );
      }));
      sequence.push(
        ['.orbital-glyph', { scale: [1, 1, .18, .025, .025, 1] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .30, .43, .49, .94, 1], ease: [.45, 0, .2, 1] }],
        ['.orbital-glyph', { opacity: [1, 1, 0, 0, 1] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .43, .50, .94, 1], ease: 'easeInOut' }],
        ['.orbital-dot', { opacity: [0, 0, 1, 1, 0, 0], scale: [0, .15, .75, 1, 0, 0] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .425, .49, .65, .89, 1], ease: 'easeInOut' }],
        ['.value-circle-title, .value-circle-outline', { scale: [1, 1, 1.12, 1.12, 1] },
          { at: 0, duration: CYCLE_SECONDS, times: [0, .65, .87, .94, 1], ease: [.22, 1, .36, 1] }],
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
            const { angle, radiusRatio, halfArc } = particleLayout(order, group.values.length, index);
            const pathId = `${idPrefix}-arc-${value.id}`;
            return <li className="orbital-particle" data-particle={value.id} key={value.id}
              style={{ left: `${50 + Math.cos(angle) * radiusRatio * 100}%`, top: `${50 + Math.sin(angle) * radiusRatio * 100}%` }}>
              <span className="orbital-tangent" data-tangent={value.id}>
                <span className="orbital-alignment" style={{ transform: `rotate(${angle * 180 / Math.PI + 90}deg)` }}>
                  <span className="orbital-glyph">
                    <svg className="orbital-arc" viewBox="-200 -200 400 400" overflow="visible" aria-label={value.title} role="img">
                      <defs><path id={pathId} d={textArc(radiusRatio * VIEWBOX_SIZE, halfArc)} /></defs>
                      <text className="orbital-text" data-arc-text={value.id} textAnchor="middle" dominantBaseline="central" lengthAdjust="spacingAndGlyphs">
                        <textPath href={`#${pathId}`} startOffset="50%">{value.title}</textPath>
                      </text>
                    </svg>
                  </span>
                </span>
              </span>
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
