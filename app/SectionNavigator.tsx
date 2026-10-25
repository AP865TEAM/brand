'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { sectionMenu, sectionFromHash, type SectionId } from './section-menu';

export default function SectionNavigator({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>('intro');
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sync = () => {
      setActive(sectionFromHash(window.location.hash));
      const target = document.getElementById(window.location.hash.slice(1));
      const details = target?.closest('details');
      if (details) {
        details.open = true;
        target?.scrollIntoView({ block: 'start' });
      }
    };
    sync();
    window.addEventListener('hashchange', sync);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id as SectionId);
    }, { rootMargin: '-15% 0px -65% 0px' });
    sectionMenu.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', sync);
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
    };
  }, []);

  return <>
    <header className="experience-header">
      <a className="experience-brand" href="#intro" aria-label="AP865 브랜드 첫 화면">AP865 <span>CLINIC</span></a>
      <span className="experience-header-label">Brand Experience</span>
      <details className="experience-index" ref={menu}>
        <summary>Index <span aria-hidden="true">＋</span></summary>
        <nav aria-label="브랜드 전체 섹션">
          {sectionMenu.map((section, index) => <a key={section.id} href={`#${section.id}`}
            aria-current={active === section.id ? 'location' : undefined}
            onClick={() => { if (menu.current) menu.current.open = false; }}>
            <span>{String(index).padStart(2, '0')}</span>{section.label}<span aria-hidden="true">↗</span>
          </a>)}
        </nav>
      </details>
    </header>
    {children}
    <div className="experience-chapter" aria-hidden="true">
      <span>{String(sectionMenu.findIndex(section => section.id === active)).padStart(2, '0')}</span>
      {sectionMenu.find(section => section.id === active)?.label}
    </div>
  </>;
}
