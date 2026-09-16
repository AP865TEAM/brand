export type ApplicationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ApplicationCategory = {
  id: 'business-cards' | 'stationery' | 'shopping-bags' | 'membership-cards' | 'name-tags';
  label: string;
  images: ApplicationImage[];
};

// Add supplied artwork to the appropriate images array. Use paths beginning
// with /applications/ and place the files in public/applications/.
// Preserve the supplied artwork's aspect ratio and provide descriptive alt text.
export const applicationCategories: ApplicationCategory[] = [
  { id: 'business-cards', label: 'Business Cards', images: [
    { src: '/applications/business-cards-01.png', alt: '명함 시안 01 — 아이보리 용지와 골드 로고의 가로형 명함', width: 1536, height: 1024 },
    { src: '/applications/business-cards-02.png', alt: '명함 시안 02 — 브라운 바탕과 오렌지 가로 조합 로고 명함', width: 1536, height: 1024 },
    { src: '/applications/business-cards-03.png', alt: '명함 시안 03 — 브라운 바탕의 세로 조합 로고와 아이보리 정보면', width: 1536, height: 1024 },
    { src: '/applications/business-cards-04.png', alt: '명함 시안 04 — 오렌지와 아이보리 양각 패턴의 세로형 명함', width: 1536, height: 1024 },
  ] },
  { id: 'stationery', label: 'Stationery', images: [] },
  { id: 'shopping-bags', label: 'Shopping Bags', images: [] },
  { id: 'membership-cards', label: 'Membership Cards', images: [] },
  { id: 'name-tags', label: 'Name Tags', images: [] },
];
