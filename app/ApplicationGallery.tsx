'use client';

import { useState } from 'react';
import BrandDownloads from './BrandDownloads';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { applicationCategories, type ApplicationCategory, type ApplicationImage } from './applications';

function Artwork({ image, basePath }: { image: ApplicationImage; basePath: string }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <p className="application-empty">이미지를 불러오지 못했습니다.</p>
    : <img src={`${basePath}${image.src}`} alt={image.alt} width={image.width} height={image.height}
        loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Category({ category, basePath, index }: { category: ApplicationCategory; basePath: string; index: number }) {
  const [open, setOpen] = useState(false);
  return <article className="application-hero" aria-labelledby={`application-title-${category.id}`}>
    <div className="application-hero-heading">
      <span className="application-hero-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <h3 id={`application-title-${category.id}`} lang="en">{category.label}</h3>
      <span className="application-hero-korean">{category.korean}</span>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger id={`application-trigger-${category.id}`} className="application-hero-button" aria-label={`${category.korean} 이미지 확대`}>
        <Artwork image={category.hero} basePath={basePath} />
        <span className="application-hero-expand" aria-hidden="true">↗</span>
      </DialogTrigger>
      <DialogContent className="proposal-modal application-hero-modal" showCloseButton={false}>
        <DialogTitle className="sr-only">{category.korean}</DialogTitle>
        <DialogDescription className="sr-only">{category.hero.alt}</DialogDescription>
        <DialogClose className="proposal-modal-close" aria-label="이미지 닫기">×</DialogClose>
        <BrandDownloads basePath={basePath} inline />
        {open && <figure className="application-hero-enlarged"><Artwork image={category.hero} basePath={basePath} /><figcaption>{category.label}</figcaption></figure>}
      </DialogContent>
    </Dialog>
  </article>;
}

export default function ApplicationGallery({ basePath }: { basePath: string }) {
  return <div className="application-heroes">
    {applicationCategories.map((category, index) => <Category key={category.id} category={category} basePath={basePath} index={index} />)}
  </div>;
}
