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
  { id: 'stationery', label: 'Stationery', images: [
    { src: '/applications/stationery-01.png', alt: '스테이셔너리 시안 01 — 심볼 워터마크 레터헤드와 오렌지 안감의 소봉투·대봉투', width: 1920, height: 823 },
    { src: '/applications/stationery-02.png', alt: '스테이셔너리 시안 02 — 오렌지 세로선과 좌측 정렬 로고를 적용한 레터헤드·소봉투·대봉투', width: 1920, height: 823 },
  ] },
  { id: 'shopping-bags', label: 'Shopping Bags', images: [
    { src: '/applications/shopping-bags-01.png', alt: '쇼핑백 시안 01 — 브라운 바탕에 오렌지 손잡이와 가로 조합 로고', width: 1079, height: 1457 },
    { src: '/applications/shopping-bags-02.png', alt: '쇼핑백 시안 02 — 브라운 바탕에 오렌지 손잡이와 세로 조합 로고', width: 1079, height: 1457 },
    { src: '/applications/shopping-bags-03.png', alt: '쇼핑백 시안 03 — 오렌지 바탕과 손잡이에 톤온톤 세로 조합 로고', width: 1079, height: 1457 },
    { src: '/applications/shopping-bags-04.png', alt: '쇼핑백 시안 04 — 오렌지 세로형 쇼핑백에 짙은 손잡이와 아이보리 브랜드 태그', width: 1122, height: 1402 },
    { src: '/applications/shopping-bags-05.png', alt: '쇼핑백 시안 05 — 아이보리 세로형 쇼핑백에 골드 로고와 아이보리 브랜드 태그', width: 1024, height: 1536 },
    { src: '/applications/shopping-bags-06.png', alt: '쇼핑백 시안 06 — 아이보리 쇼핑백에 직사각형 양각 패턴과 브랜드 태그', width: 1024, height: 1536 },
    { src: '/applications/shopping-bags-07.png', alt: '쇼핑백 시안 07 — 아이보리 쇼핑백에 반복 심볼 양각 패턴과 브랜드 태그', width: 1024, height: 1536 },
  ] },
  { id: 'membership-cards', label: 'Membership Cards', images: [
    { src: '/applications/membership-cards-01.png', alt: '멤버십카드 시안 01 — 골드 카드와 오렌지 안내 카드를 담은 아이보리 리본 패키지', width: 902, height: 1080 },
  ] },
  { id: 'name-tags', label: 'Name Tags', images: [
    { src: '/applications/name-tags-01.png', alt: '네임택 시안 01 — AP865 CLINIC 로고와 대표원장 이름을 적용한 메탈 명찰', width: 1536, height: 1024 },
  ] },
];
