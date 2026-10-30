export type ApplicationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ApplicationCategory = {
  id: 'business-cards' | 'stationery' | 'shopping-bags' | 'membership-cards' | 'name-tags' | 'cafe';
  label: string;
  korean: string;
  hero: ApplicationImage;
};

// One selected design per application. Original proposal assets are preserved.
export const applicationCategories: ApplicationCategory[] = [
  { id: 'business-cards', label: 'Business Cards', korean: '명함', hero: {
    src: '/applications/business-cards-stacked-hero-20261031.jpg',
    alt: '오렌지 양각 로고와 격자 패턴의 명함, 아이보리 정보면을 여러 겹 높이 쌓아 화면을 가득 채운 AP865 명함 비주얼',
    width: 1671, height: 941,
  } },
  { id: 'shopping-bags', label: 'Shopping Bags', korean: '쇼핑백', hero: {
    src: '/applications/shopping-bags-production-hero-20261030.jpg',
    alt: '인쇄 제작 원본의 토프색 꽃 문양과 건물 일러스트를 앞면과 측면에 적용하고 모카색 그로그랭 손잡이로 마감한 AP865 쇼핑백',
    width: 1672, height: 941,
  } },
  { id: 'stationery', label: 'Stationery', korean: '스테이셔너리', hero: {
    src: '/applications/stationery-hero-20261030.jpg',
    alt: '얇고 가벼운 종이 질감으로 표현한 최종 스테이셔너리 — 심볼 워터마크 레터헤드와 모노톤 소봉투·대봉투',
    width: 1672, height: 941,
  } },
  { id: 'membership-cards', label: 'Membership Cards', korean: '멤버십카드', hero: {
    src: '/applications/membership-cards-floating-hero-20261030.jpg',
    alt: '딥브라운 공간에 홀로 떠 있는 골드 메탈 멤버십카드 한 장 — 은은한 로고 각인과 금빛 윤곽이 드러나는 앞면',
    width: 1672, height: 941,
  } },
  { id: 'name-tags', label: 'Name Tags', korean: '네임택', hero: {
    src: '/applications/name-tags-hero-20261028.jpg',
    alt: 'AP865 로고와 대표원장 홍관 이름을 새긴 브러시드 메탈 네임택',
    width: 1672, height: 941,
  } },
  { id: 'cafe', label: 'Café', korean: '카페', hero: {
    src: '/applications/cafe-hero-20261028.jpg',
    alt: '아이보리 컵과 토프색 슬리브, 아이스커피와 양각 냅킨으로 구성한 AP865 카페 비주얼',
    width: 1672, height: 941,
  } },
];
