'use client';

import { Download, ArrowDownToLine } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

export default function BrandDownloads({ basePath = '', inline = false }: { basePath?: string; inline?: boolean }) {
  return <Dialog>
    <DialogTrigger className={`asset-trigger${inline ? ' asset-trigger--inline' : ''}`}>
      <span>브랜드 자료</span><Download size={18} strokeWidth={1.5} aria-hidden="true" />
    </DialogTrigger>
    <DialogContent className="asset-panel" showCloseButton={false}>
      <DialogClose className="asset-close" aria-label="다운로드 메뉴 닫기">×</DialogClose>
      <span className="experience-kicker">AP865 / Brand resources</span>
      <DialogTitle className="asset-title">Make it<br /><i>AP865.</i></DialogTitle>
      <DialogDescription className="asset-description">브랜드의 일관된 표현을 위한 로고 원본과 전용 서체입니다.</DialogDescription>
      <div className="asset-links">
        <a href={`${basePath}/downloads/logo.ai?v=e2eba420`} download="AP865-Logo.ai">
          <span><strong>Logo</strong><small>로고 원본 · Adobe Illustrator</small></span><span>AI <ArrowDownToLine size={20} aria-hidden="true" /></span>
        </a>
        <a href={`${basePath}/downloads/AP865-Text-V02.zip`} download="AP865-Text-V02.zip">
          <span><strong>Typeface</strong><small>AP865 Text V02 · TTF & 라이선스</small></span><span>ZIP <ArrowDownToLine size={20} aria-hidden="true" /></span>
        </a>
      </div>
      <p className="asset-note">로고의 비례와 서체의 형태를 유지해 주세요.<br />서체 사용 범위는 ZIP에 포함된 라이선스를 확인해 주세요.</p>
    </DialogContent>
  </Dialog>;
}
