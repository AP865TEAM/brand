'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import LogoProposalCarousel from './LogoProposalCarousel';
import type { LogoProposal } from './foundation';

// Stable source IDs, independent of the presentation order. Frame only the
// original white symbol, excluding the wordmark and photographic surroundings.
const symbolFrames: Record<string, string> = {
  '02': '780 450 108 180',
  '01': '850 365 215 245',
  '05': '850 400 205 280',
  '03': '860 450 200 180',
  '04': '850 368 218 280',
};

function Proposal({ proposal, number, basePath }: { proposal: LogoProposal; number: number; basePath: string }) {
  const [open, setOpen] = useState(false);
  const label = `Logo Proposal ${String(number).padStart(2, '0')}`;
  const [x, y, width, height] = symbolFrames[proposal.id].split(' ').map(Number);
  const clipId = `proposal-symbol-clip-${proposal.id}`;
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className="proposal-symbol-button" aria-label={`${label} 이미지와 영상 보기`}>
      <span className="proposal-symbol-stage" aria-hidden="true">
        <svg className="proposal-symbol" viewBox={symbolFrames[proposal.id]}>
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <rect x={x} y={y} width={width} height={height} />
            </clipPath>
          </defs>
          {/* viewBox alone can reveal adjacent artwork in the letterboxed area.
              Clip the source itself so only the symbol is ever rendered. */}
          <image href={`${basePath}${proposal.asset}`} width="1920" height="1080" clipPath={`url(#${clipId})`} />
        </svg>
      </span>
      <span className="proposal-symbol-label">{label}</span>
    </DialogTrigger>
    <DialogContent className="proposal-modal" showCloseButton={false}>
      <DialogTitle className="sr-only">{label}</DialogTitle>
      <DialogDescription className="sr-only">시안 이미지와 적용 사례입니다. 하단 점 또는 좌우 방향키로 넘겨 볼 수 있습니다.</DialogDescription>
      <DialogClose className="proposal-modal-close" aria-label="시안 닫기">×</DialogClose>
      {open && <LogoProposalCarousel proposal={proposal} number={number} basePath={basePath} />}
    </DialogContent>
  </Dialog>;
}

export default function LogoProposalGallery({ proposals, basePath }: { proposals: LogoProposal[]; basePath: string }) {
  return <div className="proposal-symbol-row">
    {proposals.filter(proposal => proposal.asset).map((proposal, index) => <Proposal key={proposal.id} proposal={proposal} number={index + 1} basePath={basePath} />)}
  </div>;
}
