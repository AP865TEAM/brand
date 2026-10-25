'use client';

import { useEffect, useState } from 'react';
import BrandDownloads from './BrandDownloads';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { applicationCategories, type ApplicationCategory, type ApplicationImage, type ApplicationSlide } from './applications';

function Artwork({ image, basePath }: { image: ApplicationImage; basePath: string }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <p className="application-empty">이미지를 불러오지 못했습니다.</p>
    : <img className="proposal-application-image" src={`${basePath}${image.src}`} alt={image.alt}
        width={image.width} height={image.height} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function ApplicationSlides({ category, basePath }: { category: ApplicationCategory; basePath: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const slides: ApplicationSlide[] = category.concept ? [category.concept, ...category.images] : category.images;
  const hasConcept = Boolean(category.concept);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => { api.off('select', update); api.off('reInit', update); };
  }, [api]);

  return <figure className="proposal-image-page proposal-media-page">
    {slides.length > 0 ? <Carousel className="proposal-carousel" setApi={setApi}
      opts={{ loop: false }} tabIndex={0} aria-label={`${category.label} 시안 이미지`}>
      <CarouselContent className="proposal-carousel-track">
        {slides.map((image, index) => <CarouselItem key={'collection' in image ? image.id : image.src}
          className="proposal-carousel-slide" aria-label={`${index + 1} / ${slides.length}`} inert={active !== index}>
          {'collection' in image ? <section className="application-image-collection" tabIndex={0} aria-label={image.title}>
            <header className="application-collection-heading">
              <h4>{image.title}</h4>
              <p>{image.collection.length} images · 스크롤하여 전체 시안을 확인하세요</p>
            </header>
            <div className="application-collection-grid">
              {image.collection.map(artwork => <div className="application-collection-tile" key={artwork.src}>
                <Artwork image={artwork} basePath={basePath} />
              </div>)}
            </div>
          </section> : image.companion ? <div className="application-image-pair">
            <Artwork image={image} basePath={basePath} />
            <Artwork image={image.companion} basePath={basePath} />
          </div> : <Artwork image={image} basePath={basePath} />}
        </CarouselItem>)}
      </CarouselContent>
    </Carousel> : <div className="application-empty"><p>시안 준비 중</p></div>}
    <figcaption className="proposal-image-comment">
      {slides.length > 1 && <nav className="proposal-pagination" aria-label={`${category.label} 슬라이드 선택`}>
        {slides.map((image, index) => <button key={'collection' in image ? image.id : image.src} type="button"
          aria-label={hasConcept && index === 0 ? '컨셉 이미지 보기' : 'collection' in image ? image.title : `${index + (hasConcept ? 0 : 1)}번 시안 보기`} aria-current={active === index ? 'true' : undefined}
          onClick={() => api?.scrollTo(index)}><span /></button>)}
        <span className="sr-only" aria-live="polite">{active + 1} / {slides.length}</span>
      </nav>}
      <h3 className="proposal-number">{category.label}{hasConcept && active === 0 ? ' / Concept' : ''}</h3>
    </figcaption>
  </figure>;
}

function Category({ category, basePath }: { category: ApplicationCategory; basePath: string }) {
  const [open, setOpen] = useState(false);
  const first = category.images[0];
  const cover = category.concept ?? (first && ('collection' in first ? first.collection[0] : first));
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger id={`application-trigger-${category.id}`} className="proposal-symbol-button application-category-button" aria-label={`${category.label} 시안 보기`}>
      <span className="application-cover" aria-hidden="true">{cover && <img src={`${basePath}${cover.src}`} alt="" width={cover.width} height={cover.height} loading="lazy" decoding="async" />}</span>
      <span className="application-label"><span>{category.label}<small>{category.concept ? 'Concept · ' : ''}{category.images.length} {category.images.length === 1 ? 'proposal' : 'proposals'}</small></span><span aria-hidden="true">↗</span></span>
    </DialogTrigger>
    <DialogContent className="proposal-modal application-modal" showCloseButton={false}>
      <DialogTitle className="sr-only">{category.label}</DialogTitle>
      <DialogDescription className="sr-only">{category.images.length ? '하단 점, 좌우 방향키 또는 스와이프로 시안 이미지를 볼 수 있습니다.' : '이 카테고리의 시안 이미지는 준비 중입니다.'}</DialogDescription>
      <DialogClose className="proposal-modal-close" aria-label="시안 닫기">×</DialogClose>
      <BrandDownloads basePath={basePath} inline />
      {open && <ApplicationSlides category={category} basePath={basePath} />}
    </DialogContent>
  </Dialog>;
}

export default function ApplicationGallery({ basePath }: { basePath: string }) {
  return <div className="proposal-symbol-row application-category-row">
    {applicationCategories.map(category => <Category key={category.id} category={category} basePath={basePath} />)}
  </div>;
}
