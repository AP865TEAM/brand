export const brand = {
  name: 'AP865',
  category: 'Private Skin Concierge',
  edition: 'Draft 01',
  updated: '2026.09',
  statement: '당신의 피부를\n먼저 이해하는 곳.',
  introduction:
    'AP865는 한 사람의 피부와 시간, 취향까지 세심하게 이해하고 가장 적합한 여정을 설계하는 프라이빗 스킨 컨시어지입니다.',
};

export const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'Direction', href: '#direction' },
  { label: 'Values', href: '#principles' },
  { label: 'Logo Lab', href: '#mark' },
  { label: 'Key Visual', href: '#key-visual' },
  { label: 'Color', href: '#color' },
  { label: 'Voice', href: '#voice' },
  { label: 'Decisions', href: '#archive' },
];

export const strategy = [
  { label: 'Brand role', title: '개인의 피부 여정을 설계하는 파트너', description: '한 번의 시술보다 시간에 따라 달라지는 피부의 맥락을 함께 관리합니다.' },
  { label: 'Audience', title: '프라이버시와 완성도를 중시하는 사람', description: '과한 설명보다 정확한 판단, 드러나는 화려함보다 세심한 배려를 기대합니다.' },
  { label: 'Promise', title: '필요한 순간에 가장 적합한 선택', description: '더 많은 시술이 아니라 지금의 피부에 맞는 다음 한 가지를 제안합니다.' },
  { label: 'Desired feeling', title: '설명하기 전에 이미 이해받는 느낌', description: '예약부터 사후 관리까지 끊김 없이 이어지는 경험으로 신뢰를 축적합니다.' },
];

export const principles = [
  { index: '01', title: 'Private', korean: '철저히 개인화된', description: '예약부터 상담, 시술과 사후 관리까지 한 사람만을 위한 흐름으로 설계합니다.' },
  { index: '02', title: 'Skin Concierge', korean: '처음부터 끝까지 연결된', description: '피부의 맥락을 먼저 읽고 필요한 선택을 선제적으로 제안하며 지속적으로 관리합니다.' },
  { index: '03', title: 'Premium', korean: '드러내지 않아도 느껴지는', description: '과시적인 표현보다 재료, 태도, 디테일의 완성도로 신뢰할 수 있는 품격을 만듭니다.' },
];

export const valueTranslations = [
  { value: 'Private', experience: '개별 예약, 분리된 동선, 기록의 연속성', design: '충분한 여백, 낮은 노출, 조용한 정보 위계' },
  { value: 'Skin Concierge', experience: '먼저 묻고, 기억하고, 다음을 준비하는 케어', design: '안내가 이어지는 구조, 명확한 순서, 인간적인 문장' },
  { value: 'Premium', experience: '정확한 전문성, 완성도 높은 접점, 흔들림 없는 응대', design: '오렌지 시그널, 샴페인 디테일, 깊이 있는 재료감' },
];

export const logoCriteria = [
  { index: '01', title: 'Quiet authority', description: '의료 전문성을 과장 없이 신뢰감 있게 전달하는가' },
  { index: '02', title: 'Personal precision', description: '개인화된 컨시어지의 섬세함과 정확성이 함께 보이는가' },
  { index: '03', title: 'Distinctive restraint', description: '절제되어 있으면서도 한 번에 기억되는 고유한 특징이 있는가' },
  { index: '04', title: 'System ready', description: '공간 사인부터 모바일 화면까지 일관되게 확장할 수 있는가' },
];

export const logoCandidates = [
  {
    number: 'L01',
    name: 'Ribbon Monogram',
    status: 'Primary exploration',
    asset: '/identity/ribbon-monogram.svg',
    assetLabel: '곡선이 세 층으로 맞물리는 AP865 리본 모노그램',
    ratio: '39 : 29',
    clearSpace: '1× ribbon loop',
    minimum: '32 px / 10 mm',
    role: '브랜드를 먼저 기억시키는 인장형 심벌',
    rationale:
      '겹쳐진 리본은 한 사람의 피부 이력을 끊김 없이 이어 관리하는 컨시어지 여정을 상징합니다. 좌우의 열린 곡선은 프라이버시를 지키면서도 필요한 순간에 열려 있는 케어를 표현합니다.',
    signals: ['Private seal', 'Continuous care', 'Quiet distinction'],
    className: 'candidate-ribbon',
  },
  {
    number: 'L02',
    name: 'Serif Wordmark',
    status: 'Primary exploration',
    asset: '/identity/serif-wordmark.svg',
    assetLabel: '대비가 섬세한 세리프 AP865 워드마크',
    ratio: '20 : 7',
    clearSpace: '1× cap height',
    minimum: '72 px / 22 mm',
    role: '전문성과 프리미엄을 직접 전달하는 공식 명칭',
    rationale:
      '클래식한 세리프의 신뢰감에 숫자 865의 유려한 디테일을 더했습니다. 병원의 정확한 전문성을 유지하면서 일반적인 메디컬 브랜드보다 개인적이고 에디토리얼한 인상을 만듭니다.',
    signals: ['Medical authority', 'Editorial premium', 'Timeless presence'],
    className: 'candidate-serif',
  },
  {
    number: 'L03',
    name: 'Condensed Wordmark',
    status: 'Supporting exploration',
    asset: '/identity/condensed-wordmark.svg',
    assetLabel: '세로 비례가 강조된 콘덴스드 AP865 워드마크',
    ratio: '39 : 31',
    clearSpace: '½× cap height',
    minimum: '48 px / 14 mm',
    role: '공간 사인과 좁은 포맷에서 작동하는 보조 시그니처',
    rationale:
      '높고 좁은 비례가 클리닉의 건축적 질서와 프라이빗한 출입 경험을 연상시킵니다. 세로형 디지털 화면, 엘리베이터 사인, 어메니티 라벨처럼 폭이 제한된 접점에 적합합니다.',
    signals: ['Architectural', 'Space efficient', 'Directional'],
    className: 'candidate-condensed',
  },
];

export const logoUsageRules = [
  { label: 'Master color', value: 'Espresso / Ivory' },
  { label: 'Accent finish', value: 'Champagne foil only' },
  { label: 'Protection zone', value: 'Keep the marked × clear' },
  { label: 'Small-use rule', value: 'Use symbol and wordmark separately' },
];

export const colors = [
  { name: 'Atelier Orange', hex: '#D85C35', className: 'swatch-orange' },
  { name: 'Champagne Gold', hex: '#C6A86B', className: 'swatch-champagne' },
  { name: 'Espresso', hex: '#241A16', className: 'swatch-espresso' },
  { name: 'Ivory Veil', hex: '#F3EEE5', className: 'swatch-ivory' },
];

export const voicePairs = [
  { instead: '최고의 시술을 제공합니다.', use: '지금 피부에 필요한 선택부터 안내합니다.' },
  { instead: '고객 맞춤형 서비스를 제공합니다.', use: '당신의 피부 이력을 기억하고 다음 관리를 준비합니다.' },
  { instead: '프리미엄 공간에서 모십니다.', use: '머무는 모든 순간이 조용하고 세심하게 이어집니다.' },
];

export const archiveSlots = [
  { number: 'D01', title: 'Brand definition', status: 'Aligned', note: '프라이빗 스킨 컨시어지 / 프리미엄' },
  { number: 'D02', title: 'Logo exploration', status: 'In progress', note: '워드마크·심벌 방향 탐색과 평가' },
  { number: 'D03', title: 'Identity system', status: 'Next', note: '타입·컬러·그래픽 규칙 검증' },
  { number: 'D04', title: 'Experience rollout', status: 'Next', note: '공간·서비스·디지털 접점 적용' },
];
