'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from 'motion/react';
import { keywords, sourceValues } from './foundation';

const labels = ['의학적 정확성', '프라이빗한 관리', '자연스러운 변화', '통합 케어', '의사의 책임과 신뢰', '조용한 고급감', '장기적인 관리 루틴', '고객을 기억하는 공간', '머무는 경험의 완성도', '존중받는 안정감'];
const meanings = ['프라이버시 · 존중', '통합 관리 · 지속성 · 개인화', '의학적 신뢰 · 자연스러운 변화 · 경험의 품격'];
const CYCLE = 5;
const positions = sourceValues.map((value, index) => {
  const group = keywords.findIndex(item => item.sources.includes(value.id));
  return { x: 25 + Math.floor(index / 5) * 50, y: 10 + (index % 5) * 19, targetX: 50, targetY: 18 + group * 32 };
});
type Playback = { play: () => void; pause: () => void; stop: () => void; time: number };

export default function ValueConvergence() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const stage = useRef<HTMLDivElement>(null);
  const playback = useRef<Playback | null>(null);
  const inView = useInView(scope, { amount: .2 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
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
    if (!stage.current || reduced) return;
    let width = 0;
    let height = 0;
    const build = () => {
      const box = stage.current!;
      if (width === box.clientWidth && height === box.clientHeight) return;
      width = box.clientWidth; height = box.clientHeight;
      playback.current?.stop();
      const sequence: AnimationSequence = [];
      positions.forEach((point, index) => {
        const dx = (point.targetX - point.x) * width / 100;
        const dy = (point.targetY - point.y) * height / 100;
        sequence.push([
          `[data-word="${index}"]`,
          { x: [0, 0, dx, dx, 0, 0], y: [0, 0, dy, dy, 0, 0], opacity: [1, 1, 0, 0, 0, 1], scale: [1, 1, .94, .94, 1, 1] },
          { at: 0, duration: CYCLE, times: [0, .24, .48, .86, .8601, 1], ease: [.22, 1, .36, 1] },
        ]);
      });
      sequence.push(
        ['.keyword-reveal', { opacity: [0, 0, 1, 1, 0], y: [16, 16, 0, 0, 16] }, { at: 0, duration: CYCLE, times: [0, .4, .56, .86, 1], ease: [.22, 1, .36, 1] }],
        ['.convergence-path', { strokeDashoffset: [1, 1, 0, 0, 1], opacity: [0, 0, .65, 0, 0] }, { at: 0, duration: CYCLE, times: [0, .2, .44, .62, 1], ease: 'easeInOut' }],
        ['.caption-ten', { opacity: [1, 1, 0, 0, 1] }, { at: 0, duration: CYCLE, times: [0, .25, .42, .86, 1] }],
        ['.caption-final', { opacity: [0, 0, 1, 1, 0] }, { at: 0, duration: CYCLE, times: [0, .4, .56, .86, 1] }],
      );
      const controls = animate(sequence, { repeat: Infinity, repeatDelay: 0 });
      playback.current = controls;
      if (!playState.current) controls.pause();
      setReady(true);
    };
    build();
    const resize = new ResizeObserver(build);
    resize.observe(stage.current);
    return () => { resize.disconnect(); playback.current?.stop(); playback.current = null; };
  }, [animate, reduced]);

  useEffect(() => {
    if (shouldPlay) playback.current?.play();
    else playback.current?.pause();
  }, [shouldPlay]);

  const restart = () => {
    if (!playback.current) return;
    playback.current.time = 0;
    setPaused(false);
    if (inView && visible) playback.current.play();
  };

  return <div className={`convergence editorial-motion three-values ${ready ? 'is-ready' : ''} ${reduced ? 'is-reduced' : ''}`} ref={scope}>
    <div className="motion-topline"><span>AP865 / The essence</span><span>10 perspectives → 3 core values</span></div>
    <div className="motion-layout">
      <div className="motion-art" aria-hidden="true">
        <div className="editorial-caption"><span className="caption-ten">열 가지 기준.</span><span className="caption-final">세 가지 핵심 가치.</span></div>
        <div className="type-stage" ref={stage}>
          <svg className="convergence-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {positions.map((point, index) => <path className="convergence-path" key={index} pathLength="1" vectorEffect="non-scaling-stroke" d={`M ${point.x} ${point.y} C ${point.x} ${(point.y + point.targetY) / 2}, ${point.targetX} ${(point.y + point.targetY) / 2}, ${point.targetX} ${point.targetY}`} />)}
          </svg>
          {sourceValues.map((value, index) => <div className="word-anchor" key={value.id} style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}><div className="word-origin" data-word={index}><span>{value.id}</span><p>{labels[index]}</p></div></div>)}
          {keywords.map((item, index) => <div className="keyword-anchor" key={item.keyword} style={{ left: '50%', top: `${18 + index * 32}%` }}><div className="keyword-reveal"><h3>{item.keyword}</h3><p>{meanings[index]}</p><span>{item.sources.join(' / ')}</span></div></div>)}
        </div>
      </div>
      <aside className="motion-reading" aria-label="세 코어밸류의 도출 근거">
        <span>From meaning to identity</span>
        <p>가치의 중심을 따라,<br />세 가지로 정의합니다.</p>
        <dl>{keywords.map((item, index) => <div key={item.keyword}><dt>{item.keyword}<span>{item.sources.join(' · ')}</span></dt><dd>{meanings[index]}</dd></div>)}</dl>
        <p className="reading-note">움직임은 핵심을 압축하고,<br />근거는 이곳에 남습니다.</p>
      </aside>
    </div>
    <div className="motion-controls"><p>{reduced ? '동작 줄이기 설정 · 세 코어밸류 요약' : '10 → 3 · 5초 자동 반복'}</p>{!reduced && <div><button type="button" onClick={() => setPaused(value => !value)}>{paused ? '재생' : '일시정지'}</button><button type="button" onClick={restart}>다시 보기 ↻</button></div>}</div>
  </div>;
}
