'use client';

import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import type { LogoProposal } from './foundation';

export default function LogoProposalCarousel({ proposal, number, basePath }: { proposal: LogoProposal; number: number; basePath: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = `proposal-number-${proposal.id}`;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const next = api.selectedScrollSnap();
      setActive(next);
      if (next !== 1) videoRef.current?.pause();
    };
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => { api.off('select', onSelect); api.off('reInit', onSelect); };
  }, [api]);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25);
    }, { threshold: [0, 0.25] });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (active === 1 && inView && !document.hidden) {
        video.muted = true;
        void video.play().catch(() => {});
      } else video.pause();
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => { document.removeEventListener('visibilitychange', syncPlayback); video.pause(); };
  }, [active, inView]);

  return (
    <figure ref={figureRef} className="proposal-image-page proposal-media-page" aria-labelledby={titleId}>
      <Carousel className="proposal-carousel" setApi={setApi}
        opts={{ loop: false }}
        aria-label={`로고 시안 ${number} 슬라이드`} tabIndex={0}
        onKeyDownCapture={event => {
          if (event.target instanceof HTMLVideoElement) return;
          if (event.key === 'ArrowLeft') { event.preventDefault(); api?.scrollPrev(); }
          if (event.key === 'ArrowRight') { event.preventDefault(); api?.scrollNext(); }
        }}>
        <CarouselContent className="proposal-carousel-track">
          <CarouselItem className="proposal-carousel-slide" aria-label="1 / 2 · 로고 이미지" inert={active !== 0}>
            <img className="proposal-slide-image" src={`${basePath}${proposal.asset}`}
              alt={proposal.assetAlt?.replace(/시안 \d{2}/g, `시안 ${number}`) ?? `로고 시안 ${number}`}
              width="1920" height="1080" loading="lazy" decoding="async" />
          </CarouselItem>
          <CarouselItem className="proposal-carousel-slide proposal-detail-slide" aria-label={proposal.video ? '2 / 2 · 로고 모션 영상' : '2 / 2 · 브랜드 적용 이미지'} inert={active !== 1}>
            {proposal.video && <video ref={videoRef} src={`${basePath}${proposal.video}`} width="1920" height="1080"
              autoPlay={active === 1 && inView} muted loop playsInline preload="metadata" aria-label={`로고 시안 ${number} 필기 모션 영상`}
              onError={() => setFailed(true)}>
              영상을 재생할 수 없습니다. <a href={`${basePath}${proposal.video}`}>영상 파일 열기</a>
            </video>}
            {proposal.additionalImage && <img className="proposal-application-image" src={`${basePath}${proposal.additionalImage.src}`} alt={proposal.additionalImage.alt}
              width={proposal.additionalImage.width} height={proposal.additionalImage.height} loading="lazy" decoding="async" />}
            {failed && <p className="proposal-video-error">영상을 불러오지 못했습니다. <a href={`${basePath}${proposal.video}`}>영상 파일 열기</a></p>}
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <figcaption className="proposal-image-comment">
        <nav className="proposal-pagination" aria-label={`로고 시안 ${number} 슬라이드 선택`}>
          {[0, 1].map(slide => <button key={slide} type="button" aria-label={slide === 0 ? '로고 이미지 보기' : proposal.video ? '모션 영상 보기' : '브랜드 적용 이미지 보기'}
            aria-current={active === slide ? 'true' : undefined} onClick={() => api?.scrollTo(slide)}><span /></button>)}
          <span className="sr-only" aria-live="polite" aria-atomic="true">{active + 1} / 2</span>
        </nav>
        <h3 className="proposal-number" id={titleId}>{`Logo Proposal ${String(number).padStart(2, '0')}`}</h3>
        <p>{proposal.comment[0]}<br />{proposal.comment[1]}</p>
      </figcaption>
    </figure>
  );
}
