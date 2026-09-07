'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion } from 'motion/react';
import { keywords, sourceValues } from './foundation';
import { CYCLE_SECONDS, VIEWBOX_SIZE, particleLayout, letterLayout, letterFrame, letterTransform, coreScale } from './value-orbit';

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
    if (!scope.current) return;
    const root = scope.current;
    let lastGeometry = '';
    let disposed = false;
    const build = (force = false) => {
      if (disposed) return;
      const widths = groups.map((_, index) => root.querySelector<HTMLElement>(`[data-stage="${index}"]`)!.getBoundingClientRect().width);
      if (widths.some(width => width <= 0)) return;
      const geometry = JSON.stringify(widths);
      if (!force && geometry === lastGeometry) return;
      lastGeometry = geometry;
      playback.current?.stop();
      const letters = groups.flatMap((group, groupIndex) => group.values.flatMap((value, sourceIndex) => {
        const svg = root.querySelector<SVGSVGElement>(`[data-source="${value.id}"]`)!;
        const nodes = Array.from(svg.querySelectorAll<SVGGElement>('[data-letter]'));
        const texts = nodes.map(node => node.querySelector('text')!);
        const fontSize = Math.max(14, Math.min(18, widths[groupIndex] * .045)) * VIEWBOX_SIZE / widths[groupIndex];
        texts.forEach(text => { text.style.fontSize = `${fontSize}px`; });
        const layout = letterLayout(value.title, particleLayout(sourceIndex, group.values.length, groupIndex),
          texts.map(text => text.getComputedTextLength()));
        return layout.map((letter, index) => ({
          letter, index, count: layout.length, sourceIndex,
          node: nodes[index], text: texts[index], dot: nodes[index].querySelector('circle')!,
        }));
      }));
      const cores = Array.from(root.querySelectorAll<HTMLElement>('.value-circle-title, .value-circle-outline'));
      // One Motion clock, no React state updates or layout reads on animation frames.
      const render = (time: number) => {
        letters.forEach(({ letter, index, count, sourceIndex, node, text, dot }) => {
          const frame = letterFrame(time, letter, index, count, sourceIndex);
          node.setAttribute('transform', letterTransform(frame));
          node.style.opacity = String(frame.opacity);
          text.setAttribute('transform', `scale(${(letter.fit * frame.glyphScale).toFixed(4)})`);
          text.style.opacity = String(frame.glyphOpacity);
          dot.setAttribute('r', frame.dotRadius.toFixed(3));
          dot.style.opacity = String(frame.dotOpacity);
        });
        const transform = `scale(${coreScale(time).toFixed(5)})`;
        cores.forEach(core => { core.style.transform = transform; });
      };
      render(0);
      if (reduced) return;
      const controls = animate(0, 1, { duration: CYCLE_SECONDS, ease: 'linear', repeat: Infinity, onUpdate: render });
      playback.current = controls;
      if (!playState.current) controls.pause();
    };
    build();
    const observer = new ResizeObserver(() => build());
    root.querySelectorAll('[data-stage]').forEach(element => observer.observe(element));
    void document.fonts.ready.then(() => build(true));
    return () => { disposed = true; observer.disconnect(); playback.current?.stop(); playback.current = null; };
  }, [animate, reduced, scope]);

  useEffect(() => {
    if (shouldPlay) playback.current?.play();
    else playback.current?.pause();
  }, [shouldPlay]);

  return <div className={`value-orbit${reduced ? ' is-reduced' : ''}`} ref={scope}>
    <div className="value-orbit-grid">
      {groups.map((group, index) => <article className="value-orbit-group" data-stage={index} key={group.keyword} aria-labelledby={`circle-title-${index}`}>
        <ul className="orbital-sources">
          {group.values.map((value, order) => <li className="orbital-source" key={value.id} aria-label={value.title}>
            <svg className="orbital-letter-field" viewBox="0 0 400 400" data-source={value.id} aria-hidden="true">
              {letterLayout(value.title, particleLayout(order, group.values.length, index)).map((letter, letterIndex, letters) =>
                <g data-letter={letterIndex} key={letterIndex} transform={letterTransform(letterFrame(0, letter, letterIndex, letters.length, order))}>
                  <text className="orbital-text" textAnchor="middle" dominantBaseline="central" xmlSpace="preserve" transform={`scale(${letter.fit.toFixed(4)})`}>{letter.character}</text>
                  <circle className="orbital-letter-dot" r="1.1" visibility={/\S/.test(letter.character) ? 'visible' : 'hidden'} />
                </g>)}
            </svg>
          </li>)}
        </ul>
        <div className="value-circle">
          <div className="value-circle-outline" aria-hidden="true" />
          <h2 className="value-circle-title" id={`circle-title-${index}`}>{group.keyword}</h2>
        </div>
      </article>)}
    </div>
    {!reduced && <button className="motion-keyboard-control" type="button" aria-pressed={paused}
      onClick={() => setPaused(value => !value)}>{paused ? '코어밸류 모션 재생' : '코어밸류 모션 일시정지'}</button>}
  </div>;
}
