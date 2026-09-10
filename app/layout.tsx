import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AP865 — Brand Identity Workroom',
  description: 'AP865 프라이빗 스킨 컨시어지의 브랜드 방향, BI 제작 과정과 의사결정 기준을 공유하는 디지털 워크룸.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return <html lang="ko"><head><link rel="preload" href={`${basePath}/fonts/AP865Display-Regular.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;
}
