'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { sectionMenu, sectionFromHash, type SectionId } from './section-menu';

export default function SectionNavigator({ children }: { children: ReactNode }) {
  const sections = Children.toArray(children);
  const [active, setActive] = useState<SectionId>('intro');
  const stage = useRef<HTMLDivElement>(null);
  const pendingTarget = useRef('');

  useEffect(() => {
    const sync = () => {
      pendingTarget.current = window.location.hash.slice(1);
      setActive(sectionFromHash(window.location.hash));
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const viewport = stage.current;
    if (!viewport) return;
    const measure = () => viewport.style.setProperty('--section-height', `${viewport.clientHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      stage.current?.scrollTo({ top: 0, behavior: 'instant' });
      const target = pendingTarget.current;
      if (target === 'keywords' || /^value-\d{2}$/.test(target)) {
        const element = document.getElementById(target);
        const details = element?.closest('details');
        if (details) details.open = true;
        element?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      pendingTarget.current = '';
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function openSection(value: SectionId) {
    pendingTarget.current = '';
    if (window.location.hash !== `#${value}`) window.history.pushState(null, '', `#${value}`);
    setActive(value);
    stage.current?.scrollTo({ top: 0, behavior: 'instant' });
  }

  return <Tabs className="section-deck" value={active} onValueChange={value => {
    if (typeof value === 'string') openSection(sectionFromHash(value));
  }}>
    <div className="section-viewport" ref={stage}>
      {sectionMenu.map((section, index) => <TabsContent key={section.id} value={section.id}
        className="section-panel" hidden={active !== section.id} keepMounted>
        {sections[index]}
      </TabsContent>)}
    </div>
    <nav className="section-dock" aria-label="브랜드 전체 섹션">
      <TabsList className="section-menu" aria-label="섹션 선택">
        {sectionMenu.map((section, index) => <TabsTrigger key={section.id} value={section.id}
          className="section-menu-button">
          <span className="section-menu-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span>{section.label}</span>
        </TabsTrigger>)}
      </TabsList>
    </nav>
  </Tabs>;
}
