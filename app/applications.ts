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
    src: '/applications/business-cards-stacked-hero-20261028.jpg',
    alt: '오렌지 양각 로고와 격자 패턴의 명함, 아이보리 정보면을 여러 겹 높이 쌓아 화면을 가득 채운 AP865 명함 비주얼',
    width: 1672, height: 941,
  } },
  { id: 'shopping-bags', label: 'Shopping Bags', korean: '쇼핑백', hero: {
    src: '/applications/shopping-bags-hero-20261028.jpg',
    alt: '꽃 문양과 건물 일러스트, 모카색 그로그랭 손잡이를 적용한 아이보리 쇼핑백',
    width: 1672, height: 941,
  } },
  { id: 'stationery', label: 'Stationery', korean: '스테이셔너리', hero: {
    src: '/applications/stationery-hero-20261028.jpg',
    alt: '최종 스테이셔너리 디자인 — 심볼 워터마크 레터헤드와 모노톤 로고를 적용한 소봉투·대봉투',
    width: 1672, height: 941,
  } },
  { id: 'membership-cards', label: 'Membership Cards', korean: '멤버십카드', hero: {
    src: '/applications/membership-cards-hero-20261028.jpg',
    alt: '흰색 AP865 로고와 서명란을 각인한 최종 골드 메탈 멤버십카드의 앞면과 뒷면',
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
