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
  { label: 'Project 01', href: '#project-01' },
  { label: 'Project 02', href: '#project-02' },
  { label: 'Project 03', href: '#project-03' },
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

export const brandProjects = [
  {
    id: 'project-01',
    number: '01',
    name: 'The Continuum',
    korean: '이어지는 피부의 시간',
    label: 'Concierge as continuity',
    asset: '/identity/project-01-continuum.svg',
    motifAsset: '/identity/ribbon-monogram.svg',
    assetAlt: '리본 모노그램과 세리프 워드마크를 결합한 AP865 Continuum Signature 로고',
    inspiration: [
      { title: 'Silk ribbon', note: '부드럽지만 끊기지 않는 케어의 흐름' },
      { title: 'Personal archive', note: '축적되는 피부 기록과 기억' },
      { title: 'Private seal', note: '한 사람만을 위해 준비된 인장' },
    ],
    intent: '한 번의 시술이 아니라 피부의 시간 전체를 연결하는 브랜드. 리본 한 줄이 세 개의 층을 오가며 상담, 시술, 사후 관리가 하나의 경험으로 이어지는 모습을 만듭니다.',
    values: [
      { name: 'Private', expression: '개인을 위한 인장과 충분한 보호 공간' },
      { name: 'Skin Concierge', expression: '끊기지 않고 순환하는 하나의 선' },
      { name: 'Premium', expression: '샴페인 골드의 절제된 마감' },
    ],
    keywords: ['Continuity', 'Memory', 'Care', 'Signature'],
    visualCaption: '겹쳐진 선과 따뜻한 재료가 만드는 지속적인 케어의 장면.',
    className: 'project-continuum',
    ratio: '39 : 29',
    minimum: '32 px / 10 mm',
  },
  {
    id: 'project-02',
    number: '02',
    name: 'The Private Edition',
    korean: '정교하게 편집된 단 한 사람',
    label: 'Concierge as curation',
    asset: '/identity/project-02-private-edition.svg',
    motifAsset: '/identity/serif-wordmark.svg',
    assetAlt: '세리프 워드마크와 에디션 서명을 결합한 AP865 Private Edition 로고',
    inspiration: [
      { title: 'Editorial colophon', note: '정확하게 편집된 정보의 권위' },
      { title: 'Couture serif', note: '시간을 견디는 섬세한 대비' },
      { title: 'Numbered edition', note: '한정된 사람을 위한 희소성' },
    ],
    intent: '의료의 전문성을 패션 하우스의 정교한 큐레이션 방식으로 번역합니다. AP865를 하나의 고유한 에디션처럼 다루어, 진료 기록부터 공간 경험까지 선택된 정보만 정확하게 제시합니다.',
    values: [
      { name: 'Private', expression: '한 사람을 위한 넘버드 에디션' },
      { name: 'Skin Concierge', expression: '필요한 정보만 선별하는 큐레이션' },
      { name: 'Premium', expression: '세리프 대비와 넓은 여백의 권위' },
    ],
    keywords: ['Precision', 'Editorial', 'Authority', 'Rarity'],
    visualCaption: '의료적 정확성과 에디토리얼한 여백이 공존하는 프라이빗 에디션.',
    className: 'project-edition',
    ratio: '20 : 7',
    minimum: '72 px / 22 mm',
  },
  {
    id: 'project-03',
    number: '03',
    name: 'The Vertical Code',
    korean: '당신만을 위한 조용한 진입',
    label: 'Concierge as access',
    asset: '/identity/project-03-vertical-code.svg',
    motifAsset: '/identity/condensed-wordmark.svg',
    secondaryAsset: '/identity/numeral-sign.svg',
    assetAlt: '콘덴스드 워드마크와 숫자형 사인을 결합한 AP865 Vertical Code 로고',
    inspiration: [
      { title: 'Private passage', note: '노출을 줄인 조용한 진입 경험' },
      { title: 'Room numbering', note: '개인별 여정을 안내하는 코드' },
      { title: 'Architectural rhythm', note: '수직선이 만드는 공간의 질서' },
    ],
    intent: 'AP865를 목적지가 아니라 개인만 통과하는 접근 코드로 표현합니다. 높고 좁은 비례와 분절된 숫자는 예약 확인, 엘리베이터, 룸 사인으로 이어지는 프라이빗 동선을 하나의 시스템으로 묶습니다.',
    values: [
      { name: 'Private', expression: '필요한 사람에게만 보이는 접근 코드' },
      { name: 'Skin Concierge', expression: '다음 접점을 미리 안내하는 사인' },
      { name: 'Premium', expression: '건축적 비례와 정돈된 반복' },
    ],
    keywords: ['Access', 'Vertical', 'Rhythm', 'Direction'],
    visualCaption: '빛, 문, 번호가 수직으로 이어지는 프라이빗 동선의 그래픽 언어.',
    className: 'project-code',
    ratio: '39 : 31',
    minimum: '48 px / 14 mm',
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
