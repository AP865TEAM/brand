export const sectionMenu = [
  { id: 'intro', label: 'Branding Works' },
  { id: 'positioning', label: 'Overview' },
  { id: 'core-values', label: 'Core Values' },
  { id: 'identity', label: 'Logo' },
  { id: 'color', label: 'Key Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'key-visual', label: 'Key Visual' },
  { id: 'applications', label: 'Applications' },
  { id: 'proposals', label: 'Archive' },
] as const;

export type SectionId = typeof sectionMenu[number]['id'];

export function sectionFromHash(hash: string): SectionId {
  const target = hash.replace(/^#/, '');
  if (target === 'keywords' || /^value-\d{2}$/.test(target)) return 'core-values';
  return sectionMenu.find(section => section.id === target)?.id ?? 'intro';
}
