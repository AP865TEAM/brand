'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion } from 'motion/react';
import { SYMBOL_CYCLE_SECONDS, sketchPlacement, contourPath, symbolContours, symbolFrame } from './symbol-motion';

type Playback = { play: () => void; pause: () => void; stop: () => void; time: number };

export default function SymbolFormation({ basePath = '' }: { basePath?: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { amount: .2 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [sketchReady, setSketchReady] = useState(false);
  const [sketchFailed, setSketchFailed] = useState(false);
  const playback = useRef<Playback | null>(null);
  const restart = useRef<() => void>(() => {});
  const shouldPlay = inView && visible && sketchReady && !sketchFailed && !paused && !reduced;
  const playState = useRef(shouldPlay);
  const titleId = useId();
  const descriptionId = useId();
  const traceClipId = useId();
  const fillClipId = useId();
  const sketchSrc = `${basePath}/identity/final/ap865-building-line-sketch-20261031.png`;

  useEffect(() => {
    const image = new Image();
    image.onload = () => setSketchReady(true);
    image.onerror = () => setSketchFailed(true);
    image.src = sketchSrc;
    return () => { image.onload = null; image.onerror = null; };
  }, [sketchSrc]);

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
    const sketch = root.querySelector<SVGGElement>('[data-sketch]')!;
    const drawing = root.querySelector<SVGGElement>('[data-drawing]')!;
    const outline = root.querySelector<SVGGElement>('[data-outline]')!;
    const halo = root.querySelector<SVGGElement>('[data-halo]')!;
    const traceClip = root.querySelector<SVGRectElement>('[data-trace-clip]')!;
    const fillClip = root.querySelector<SVGRectElement>('[data-fill-clip]')!;
    const progress = root.querySelector<HTMLElement>('[data-progress]')!;
    let lastRelease = -1;

    // One animation clock; all geometry is prepared beforehand, with no React
    // updates or layout measurements per frame. Pause outside the viewport.
    const render = (seconds: number) => {
      const frame = symbolFrame(seconds);
      drawing.style.opacity = String(frame.symbolOpacity);
      sketch.style.opacity = String(frame.sketchOpacity);
      outline.style.stroke = frame.outlineColor;
      outline.style.opacity = String(frame.outlineOpacity);
      halo.style.opacity = String(frame.haloOpacity);
      traceClip.setAttribute('height', String(frame.traceClip));
      fillClip.setAttribute('height', String(frame.fillClip));
      progress.style.transform = `scaleX(${seconds / SYMBOL_CYCLE_SECONDS})`;
      if (lastRelease !== frame.release) paths.forEach(path => {
        path.setAttribute('d', contourPath(Number(path.dataset.symbolContour), frame.release));
      });
      lastRelease = frame.release;
    };

    if (reduced || sketchFailed) {
      render(11.5);
      return;
    }
    render(0);
    const controls = animate(0, SYMBOL_CYCLE_SECONDS, { duration: SYMBOL_CYCLE_SECONDS, ease: 'linear', repeat: Infinity, onUpdate: render });
    playback.current = controls;
    restart.current = () => { controls.time = 0; render(0); };
    if (!playState.current) controls.pause();
    return () => { controls.stop(); playback.current = null; restart.current = () => {}; };
  }, [animate, reduced, sketchFailed, scope]);

  return <div className="symbol-formation" ref={scope} data-playing={shouldPlay}>
    {/* SVG provides the motion's accessible name and description as one image. */}
    {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
    <svg className="symbol-formation-canvas" viewBox="80 0 640 650" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
      <title id={titleId}>공간에서 시작되는 AP865 심볼</title>
      <desc id={descriptionId}>AP865 건물의 라인 스케치에서 상단부터 하단으로 심볼의 윤곽이 형성됩니다. 건축선이 잦아들고 윤곽이 고유의 비례를 찾아, AP865의 원본 심볼로 완성됩니다.</desc>
      <defs>
        <clipPath id={traceClipId} clipPathUnits="userSpaceOnUse"><rect data-trace-clip x="80" y="0" width="640" height="650" /></clipPath>
        <clipPath id={fillClipId} clipPathUnits="userSpaceOnUse"><rect data-fill-clip x="80" y="0" width="640" height="650" /></clipPath>
      </defs>
      <g data-sketch opacity="0" className="symbol-formation-sketch">
        <svg x={sketchPlacement.x} y={sketchPlacement.y} width={sketchPlacement.width} height={sketchPlacement.height} viewBox={sketchPlacement.viewBox} overflow="hidden">
          <image href={sketchSrc} width="1024" height="1536" />
        </svg>
      </g>
      <g data-drawing strokeLinejoin="round">
        <g clipPath={`url(#${traceClipId})`}>
          <g data-halo fill="none" stroke="#e2dbd1" strokeWidth="4.6" opacity="0">
            {symbolContours.map((_, index) => <path data-symbol-contour={index} key={index} d={contourPath(index, 1)} />)}
          </g>
          <g data-outline fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0">
            {symbolContours.map((_, index) => <path data-symbol-contour={index} key={index} d={contourPath(index, 1)} />)}
          </g>
        </g>
        <g data-symbol-fill clipPath={`url(#${fillClipId})`} fill="currentColor" fillRule="nonzero">
          {symbolContours.map((_, index) => <path data-symbol-contour={index} key={index} d={contourPath(index, 1)} />)}
        </g>
      </g>
    </svg>
    {!reduced && !sketchFailed && <div className="symbol-formation-controls">
      <button type="button" disabled={!sketchReady} aria-label={paused ? '심볼 모션 재생' : '심볼 모션 일시정지'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="M9 5 19 12 9 19Z" /> : <path d="M8 5H10V19H8ZM14 5H16V19H14Z" />}</svg>
      </button>
      <button type="button" disabled={!sketchReady} aria-label="심볼 모션 처음부터 재생" onClick={() => { restart.current(); setPaused(false); }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10A7 7 0 1 1 6 17M5 5V10H10" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
    </div>}
    <div className="symbol-formation-progress" aria-hidden="true"><span data-progress /></div>
  </div>;
}
