export type ApplicationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ApplicationSlide = ApplicationImage & {
  companion?: ApplicationImage;
};

export type ApplicationCategory = {
  id: 'business-cards' | 'stationery' | 'shopping-bags' | 'membership-cards' | 'name-tags';
  label: string;
  images: ApplicationSlide[];
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
  { id: 'shopping-bags', label: 'Shopping Bags', images: [
    { src: '/applications/shopping-bags-11.png', alt: '쇼핑백 시안 11 — 아이보리 쇼핑백에 대형 양각 심볼과 가로 조합 로고, 리본과 브랜드 태그', width: 1122, height: 1402,
      companion: { src: '/applications/shopping-bags-11-detail.png', alt: '쇼핑백 시안 11 추가 이미지 — 아이보리 쇼핑백의 대형 양각 심볼과 가로 조합 로고, 헤링본 리본 손잡이와 브랜드 태그', width: 1122, height: 1402 },
    },
    { src: '/applications/shopping-bags-12-v2.png', alt: '쇼핑백 시안 12 — 아이보리 바탕에 클래식 꽃 문양과 건물 일러스트, 골드 로고와 브랜드 태그를 적용한 쇼핑백', width: 1024, height: 1536,
      companion: { src: '/applications/shopping-bags-12-detail.png', alt: '쇼핑백 시안 12 추가 이미지 — 클래식 실내 배경의 꽃 문양과 건물 일러스트 쇼핑백, 골드 로고와 리본 태그', width: 1145, height: 1374 },
    },
    { src: '/applications/shopping-bags-collection-v2.jpg', alt: '쇼핑백 기타 시안 모아보기 — 기존 01·02·03·04·05·06·07·08·09·10·13번 시안', width: 3200, height: 3100 },
  ] },
  { id: 'stationery', label: 'Stationery', images: [
    { src: '/applications/stationery-01.png', alt: '스테이셔너리 시안 01 — 심볼 워터마크 레터헤드와 오렌지 안감의 소봉투·대봉투', width: 1920, height: 823 },
    { src: '/applications/stationery-02.png', alt: '스테이셔너리 시안 02 — 오렌지 세로선과 좌측 정렬 로고를 적용한 레터헤드·소봉투·대봉투', width: 1920, height: 823 },
  ] },
  { id: 'membership-cards', label: 'Membership Cards', images: [
    { src: '/applications/membership-cards-01.png', alt: '멤버십카드 시안 01 — 골드 카드와 오렌지 안내 카드를 담은 아이보리 리본 패키지', width: 902, height: 1080 },
  ] },
  { id: 'name-tags', label: 'Name Tags', images: [
    { src: '/applications/name-tags-01.png', alt: '네임택 시안 01 — AP865 CLINIC 로고와 대표원장 이름을 적용한 메탈 명찰', width: 1536, height: 1024 },
  ] },
];
