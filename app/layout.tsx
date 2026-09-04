import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AP865 — Brand Identity Workroom',
  description: 'AP865 프라이빗 스킨 컨시어지의 브랜드 방향, BI 제작 과정과 의사결정 기준을 공유하는 디지털 워크룸.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
