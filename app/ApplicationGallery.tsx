'use client';

import { useEffect, useState } from 'react';
import { Contact, Files, ShoppingBag, CreditCard, IdCard } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { applicationCategories, type ApplicationCategory, type ApplicationImage } from './applications';

const categoryIcons = {
  'business-cards': Contact,
  stationery: Files,
  'shopping-bags': ShoppingBag,
  'membership-cards': CreditCard,
  'name-tags': IdCard,
};

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
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => { api.off('select', update); api.off('reInit', update); };
  }, [api]);

  return <figure className="proposal-image-page proposal-media-page">
    {category.images.length > 0 ? <Carousel className="proposal-carousel" setApi={setApi}
      opts={{ loop: false }} tabIndex={0} aria-label={`${category.label} 시안 이미지`}>
      <CarouselContent className="proposal-carousel-track">
        {category.images.map((image, index) => <CarouselItem key={image.src}
          className="proposal-carousel-slide" aria-label={`${index + 1} / ${category.images.length}`} inert={active !== index}>
          <Artwork image={image} basePath={basePath} />
        </CarouselItem>)}
      </CarouselContent>
    </Carousel> : <div className="application-empty"><p>시안 준비 중</p></div>}
    <figcaption className="proposal-image-comment">
      {category.images.length > 1 && <nav className="proposal-pagination" aria-label={`${category.label} 슬라이드 선택`}>
        {category.images.map((image, index) => <button key={image.src} type="button"
          aria-label={`${index + 1}번 시안 보기`} aria-current={active === index ? 'true' : undefined}
          onClick={() => api?.scrollTo(index)}><span /></button>)}
        <span className="sr-only" aria-live="polite">{active + 1} / {category.images.length}</span>
      </nav>}
      <h3 className="proposal-number">{category.label}</h3>
    </figcaption>
  </figure>;
}

function Category({ category, basePath }: { category: ApplicationCategory; basePath: string }) {
  const [open, setOpen] = useState(false);
  const Icon = categoryIcons[category.id];
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className="proposal-symbol-button application-category-button" aria-label={`${category.label} 시안 보기`}>
      <span className="proposal-symbol-stage" aria-hidden="true"><Icon className="application-category-icon" strokeWidth={1} /></span>
      <span className="proposal-symbol-label">{category.label}</span>
    </DialogTrigger>
    <DialogContent className="proposal-modal application-modal" showCloseButton={false}>
      <DialogTitle className="sr-only">{category.label}</DialogTitle>
      <DialogDescription className="sr-only">{category.images.length ? '하단 점, 좌우 방향키 또는 스와이프로 시안 이미지를 볼 수 있습니다.' : '이 카테고리의 시안 이미지는 준비 중입니다.'}</DialogDescription>
      <DialogClose className="proposal-modal-close" aria-label="시안 닫기">×</DialogClose>
      {open && <ApplicationSlides category={category} basePath={basePath} />}
    </DialogContent>
  </Dialog>;
}

export default function ApplicationGallery({ basePath }: { basePath: string }) {
  return <div className="proposal-symbol-row application-category-row">
    {applicationCategories.map(category => <Category key={category.id} category={category} basePath={basePath} />)}
  </div>;
}
