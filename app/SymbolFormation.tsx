'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion } from 'motion/react';
import { SYMBOL_CYCLE_SECONDS, blueprintLines, blueprintFrame, contourPath, easeBetween, symbolContours, symbolFrame } from './symbol-motion';

type Playback = { play: () => void; pause: () => void; stop: () => void; time: number };

export default function SymbolFormation() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { amount: .2 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const playback = useRef<Playback | null>(null);
  const restart = useRef<() => void>(() => {});
  const shouldPlay = inView && visible && !paused && !reduced;
  const playState = useRef(shouldPlay);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    playState.current = shouldPlay;
    if (shouldPlay) playback.current?.play();
    else playback.current?.pause();
  }, [shouldPlay]);

  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>('[data-symbol-contour]'));
    const lines = Array.from(root.querySelectorAll<SVGLineElement>('[data-blueprint-line]'));
    const drawing = root.querySelector<SVGGElement>('[data-drawing]')!;
    const guides = root.querySelector<SVGGElement>('[data-guides]')!;
    const progress = root.querySelector<HTMLElement>('[data-progress]')!;
    let lastMorph = -1;

    // One animation clock; all geometry is prepared beforehand, with no React
    // updates or layout measurements per frame. Pause outside the viewport.
    const render = (seconds: number) => {
      const frame = symbolFrame(seconds);
      drawing.style.opacity = String(frame.opacity);
      guides.style.opacity = String(frame.guides * frame.opacity);
      progress.style.transform = `scaleX(${seconds / SYMBOL_CYCLE_SECONDS})`;
      paths.forEach((path, index) => {
        if (lastMorph !== frame.morph) path.setAttribute('d', contourPath(index, frame.morph));
        const gather = easeBetween(seconds, .5 + index * .18, 3.9);
        const offset = 1 - gather;
        path.setAttribute('transform', `translate(${(index - 1) * 135 * offset} ${(index % 2 ? -80 : 55) * offset}) rotate(${(index - 1) * 12 * offset} 400 315)`);
        path.style.strokeDashoffset = String(1 - easeBetween(seconds, .2 + index * .2, 3.5));
        path.style.fillOpacity = String(frame.fill);
        path.style.strokeOpacity = String(1 - frame.fill);
        path.style.opacity = String(easeBetween(seconds, .2, 1.1));
      });
      lastMorph = frame.morph;
      if (frame.guides > 0) lines.forEach((line, index) => {
        const { points, opacity } = blueprintFrame(blueprintLines[index], seconds);
        ['x1', 'y1', 'x2', 'y2'].forEach((name, coordinate) => line.setAttribute(name, points[coordinate].toFixed(3)));
        line.style.opacity = String(opacity);
      });
    };

    if (reduced) {
      render(11.5);
      return;
    }
    render(0);
    const controls = animate(0, SYMBOL_CYCLE_SECONDS, { duration: SYMBOL_CYCLE_SECONDS, ease: 'linear', repeat: Infinity, onUpdate: render });
    playback.current = controls;
    restart.current = () => { controls.time = 0; render(0); };
    if (!playState.current) controls.pause();
    return () => { controls.stop(); playback.current = null; restart.current = () => {}; };
  }, [animate, reduced, scope]);

  return <div className="symbol-formation" ref={scope} data-playing={shouldPlay}>
    {/* SVG provides the motion's accessible name and description as one image. */}
    {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
    <svg className="symbol-formation-canvas" viewBox="80 0 640 650" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
      <title id={titleId}>공간에서 시작되는 AP865 심볼</title>
      <desc id={descriptionId}>흩어진 선들이 모여 건물의 수직 파사드와 층별 설계선을 이루고, 구조선이 곡선과 획으로 변하면서 AP865의 원본 심볼이 완성됩니다.</desc>
      <g data-guides opacity="0" fill="none" stroke="currentColor">
        {blueprintLines.map((line, index) => <line data-blueprint-line key={index} x1={line.to[0]} y1={line.to[1]} x2={line.to[2]} y2={line.to[3]} strokeWidth={line.weight} strokeDasharray={line.kind === 'guide' ? '3 5' : undefined} />)}
      </g>
      <g data-drawing fill="currentColor" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        {symbolContours.map((_, index) => <path data-symbol-contour key={index} d={contourPath(index, 1)} pathLength="1" strokeDasharray="1" fillRule="nonzero" />)}
      </g>
    </svg>
    {!reduced && <div className="symbol-formation-controls">
      <button type="button" aria-label={paused ? '심볼 모션 재생' : '심볼 모션 일시정지'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="M9 5 19 12 9 19Z" /> : <path d="M8 5H10V19H8ZM14 5H16V19H14Z" />}</svg>
      </button>
      <button type="button" aria-label="심볼 모션 처음부터 재생" onClick={() => { restart.current(); setPaused(false); }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10A7 7 0 1 1 6 17M5 5V10H10" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
    </div>}
    <div className="symbol-formation-progress" aria-hidden="true"><span data-progress /></div>
  </div>;
}
