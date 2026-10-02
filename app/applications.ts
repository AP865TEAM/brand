export type ApplicationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ApplicationSlide = (ApplicationImage & {
  companion?: ApplicationImage;
}) | {
  id: string;
  title: string;
  collection: ApplicationImage[];
};

export type ApplicationCategory = {
  id: 'business-cards' | 'stationery' | 'shopping-bags' | 'membership-cards' | 'name-tags' | 'cafe';
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
    { src: '/applications/shopping-bags-15.png', alt: '쇼핑백 시안 01 — 꽃 문양과 건물 일러스트, 양각 로고와 모카 리본 손잡이를 적용한 아이보리 쇼핑백의 정면·측면 및 제작 사양', width: 1312, height: 817 },
    { id: 'shopping-bags-archive', title: '기존 시안 모아보기', collection: [
      { src: '/applications/shopping-bags-14.png', alt: '기존 쇼핑백 시안 14 — 오렌지색 문에 걸린 아이보리 쇼핑백, 꽃 문양과 건물 일러스트, AP865 CLINIC 로고와 리본 손잡이', width: 1054, height: 1492 },
      { src: '/applications/shopping-bags-11.png', alt: '기존 쇼핑백 시안 11 — 대형 양각 심볼과 리본 태그를 적용한 아이보리 쇼핑백', width: 1122, height: 1402 },
      { src: '/applications/shopping-bags-11-detail.png', alt: '기존 쇼핑백 시안 11 추가 이미지 — 대형 양각 심볼과 헤링본 리본 손잡이', width: 1122, height: 1402 },
      { src: '/applications/shopping-bags-12-v2.png', alt: '기존 쇼핑백 시안 12 — 꽃 문양과 건물 일러스트, 골드 로고와 리본 태그', width: 1024, height: 1536 },
      { src: '/applications/shopping-bags-12-detail.png', alt: '기존 쇼핑백 시안 12 추가 이미지 — 클래식 실내 배경의 꽃 문양과 건물 일러스트 쇼핑백', width: 1145, height: 1374 },
      { src: '/applications/shopping-bags-01.png', alt: '기존 쇼핑백 시안 01 — 브라운 바탕의 가로형 로고와 오렌지 손잡이', width: 1079, height: 1457 },
      { src: '/applications/shopping-bags-02.png', alt: '기존 쇼핑백 시안 02 — 브라운 바탕의 세로형 로고와 오렌지 손잡이', width: 1079, height: 1457 },
      { src: '/applications/shopping-bags-03.png', alt: '기존 쇼핑백 시안 03 — 오렌지 바탕의 양각 로고와 손잡이', width: 1079, height: 1457 },
      { src: '/applications/shopping-bags-04.png', alt: '기존 쇼핑백 시안 04 — 오렌지 바탕과 검은 손잡이, 아이보리 태그', width: 1122, height: 1402 },
      { src: '/applications/shopping-bags-05.png', alt: '기존 쇼핑백 시안 05 — 아이보리 바탕의 골드 로고와 태그', width: 1024, height: 1536 },
      { src: '/applications/shopping-bags-06.png', alt: '기존 쇼핑백 시안 06 — 아이보리 격자 양각 패턴과 브랜드 태그', width: 1024, height: 1536 },
      { src: '/applications/shopping-bags-07.png', alt: '기존 쇼핑백 시안 07 — 아이보리 심볼 반복 양각 패턴과 브랜드 태그', width: 1024, height: 1536 },
      { src: '/applications/shopping-bags-08.png', alt: '기존 쇼핑백 시안 08 — 브라운 바탕의 클래식 식물 문양과 리본', width: 1122, height: 1402 },
      { src: '/applications/shopping-bags-09.png', alt: '기존 쇼핑백 시안 09 — 아이보리 바탕의 클래식 조각상과 풍경 일러스트', width: 1122, height: 1402 },
      { src: '/applications/shopping-bags-10.png', alt: '기존 쇼핑백 시안 10 — 아이보리 바탕의 테두리 음각과 골드 로고', width: 1024, height: 1536 },
      { src: '/applications/shopping-bags-13.png', alt: '기존 쇼핑백 시안 13 — 대형 심볼과 클래식 꽃 문양을 조합한 쇼핑백', width: 1024, height: 1536 },
    ] },
  ] },
  { id: 'stationery', label: 'Stationery', images: [
    { src: '/applications/stationery-03.png', alt: '스테이셔너리 시안 01 — 건물 일러스트와 AP865 CLINIC 로고를 적용한 레터헤드·소봉투·대봉투', width: 1800, height: 1200 },
    { src: '/applications/stationery-01-v2.png', alt: '스테이셔너리 시안 02 — 심볼 워터마크 레터헤드와 모노톤 로고, 밝은 회색 안감의 소봉투·대봉투', width: 1920, height: 1080 },
  ] },
  { id: 'membership-cards', label: 'Membership Cards', images: [
    { src: '/applications/membership-cards-01-v2.png', alt: '멤버십카드 시안 01 — 골드 멤버십카드와 오렌지 안내 카드를 담은 아이보리 접이식 패키지, 카드 고정 탭과 양각 로고, 새틴 리본', width: 1086, height: 1448 },
    { src: '/applications/membership-cards-02-v2.png', alt: '멤버십카드 시안 02 — 흰색 각인 표현의 AP865 CLINIC 로고와 서명을 적용한 골드 메탈 멤버십카드 앞면과 뒷면', width: 1536, height: 1024 },
  ] },
  { id: 'name-tags', label: 'Name Tags', images: [
    { src: '/applications/name-tags-01.png', alt: '네임택 시안 01 — AP865 CLINIC 로고와 대표원장 이름을 적용한 메탈 명찰', width: 1536, height: 1024 },
  ] },
  { id: 'cafe', label: 'Café', images: [
    { src: '/applications/cafe-01.png', alt: '카페 시안 01 — AP865 CLINIC 로고를 적용한 테이크아웃 컵과 컵 슬리브, 냅킨과 냅킨 홀더', width: 1312, height: 1199 },
    { src: '/applications/cafe-02.png', alt: '카페 시안 02 — AP865 심볼과 로고, 클래식 꽃 문양을 적용한 아이보리 코스터와 생수 보틀 행거', width: 1312, height: 1199 },
  ] },
];
