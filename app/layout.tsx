import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'AP865 — Brand Identity Workroom',
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico?v=ap865-symbol`, sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: `${basePath}/favicon.svg?v=ap865-symbol`, sizes: 'any', type: 'image/svg+xml' },
    ],
  },
  description: 'AP865 프라이빗 스킨 컨시어지의 브랜드 방향, BI 제작 과정과 의사결정 기준을 공유하는 디지털 워크룸.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><head><link rel="preload" href={`${basePath}/fonts/AP865Display-Regular.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;
}
