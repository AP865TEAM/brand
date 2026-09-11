export const sectionMenu = [
  { id: 'intro', label: 'Brand Direction' },
  { id: 'core-values', label: 'Core Values' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'color', label: 'Key Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'identity', label: 'Logo' },
  { id: 'key-visual', label: 'Key Visual' },
  { id: 'proposals', label: 'Etc.' },
] as const;

export type SectionId = typeof sectionMenu[number]['id'];

export function sectionFromHash(hash: string): SectionId {
  const target = hash.replace(/^#/, '');
  if (target === 'keywords' || /^value-\d{2}$/.test(target)) return 'core-values';
  return sectionMenu.find(section => section.id === target)?.id ?? 'intro';
}
