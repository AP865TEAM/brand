import type { Metadata } from 'next';
import './globals.css';
import './experience.css';
import BrandDownloads from './BrandDownloads';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'AP865 — Brand Experience',
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico?v=ap865-symbol`, sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: `${basePath}/favicon.svg?v=ap865-symbol`, sizes: 'any', type: 'image/svg+xml' },
    ],
  },
  description: 'AP865 CLINIC의 브랜드 스토리, 아이덴티티와 일상의 접점. 로고와 전용 서체를 만나는 브랜드 아카이브.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}<BrandDownloads basePath={basePath} /></body></html>;
}
