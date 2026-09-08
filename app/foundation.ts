// 브랜드 문구와 시안 자료는 이 파일에서 관리합니다.
// 10가지 코어밸류와 도입문은 2026-09-07 전달받은 이미지의 원문입니다.
// 세 키워드와 시각 방향의 연결은 해당 원문을 바탕으로 정리한 해석입니다.
export const foundation = {
  title: 'Private Skin &\nAging Care Concierge',
  introduction: 'AP865가 지향하는 아름다움은 순간적인 변화가 아니다. 나이 들어가는 방식, 중요한 날의 인상, 매일의 피부 컨디션, 회복의 리듬까지 함께 관리하는 것이다. 다음 열 가지는 브랜드의 모든 접점에서 지켜야 할 기준이다.',
  position: '피부를 관리하는 곳을 넘어, 나의 피부를 이해하는 파트너.',
  status: '브랜드 방향성 검토안',
};

export const sourceValues = [
  { id: '01', title: '의학적으로 정확하게 설계하는 아름다움', english: 'Medical Precision' },
  { id: '02', title: '노출되지 않는 프라이빗한 관리', english: 'Private Care' },
  { id: '03', title: '과하지 않고 오래가는 자연스러운 변화', english: 'Natural & Lasting' },
  { id: '04', title: '피부·얼굴선·회복까지 이어지는 통합 케어', english: 'Integrated Condition' },
  { id: '05', title: '병원 같지 않지만, 의사가 책임지는 신뢰', english: 'Doctor-led Trust' },
  { id: '06', title: '조용하지만 분명하게 느껴지는 고급감', english: 'Quiet Luxury' },
  { id: '07', title: '한 번의 시술보다 장기적인 관리 루틴', english: 'Long-term Ritual' },
  { id: '08', title: '고객을 기억하고, 고객에게 맞춰지는 공간', english: 'Personal Memory' },
  { id: '09', title: '시술의 결과뿐 아니라 머무는 경험까지 관리', english: 'Experience-led Care' },
  { id: '10', title: '나를 함부로 다루지 않는다는 안정감', english: 'Respectful Safety' },
];

export const keywords = [
  { keyword: 'Private', korean: '오직 당신에게 집중하는 시간.', sources: ['02', '10'], interpretation: 'AP865의 프라이빗은 한 사람을 온전히 존중하는 태도에서 시작됩니다. 타인의 시선에서 벗어나, 나만의 속도로 자신을 돌볼 수 있는 시간을 지킵니다.', expression: '충분한 여백 · 조용한 정보 위계' },
  { keyword: 'Concierge', korean: '당신을 기억하고, 내일을 함께 설계합니다.', sources: ['04', '07', '08'], interpretation: 'AP865의 케어는 한 번의 방문이 아닌, 오래 이어지는 관계를 지향합니다. 오늘의 피부와 삶의 리듬을 이해하고, 나이 들어가는 여정에 맞춰 다음 케어를 함께 설계합니다.', expression: '이어지는 리듬 · 세심한 안내' },
  { keyword: 'Premium', korean: '드러내지 않아도 느껴지는 품격.', sources: ['01', '03', '05', '06', '09'], interpretation: 'AP865의 품격은 보이지 않는 기준에서 완성됩니다. 정교한 의학적 판단과 세심한 경험 설계로, 시간이 지나도 신뢰할 수 있는 가치를 추구합니다.', expression: '명료한 형태 · 절제된 대비 · 정교한 마감' },
];

export const palette = [
  { name: 'AP865 ORANGE', hex: '#D85C35', role: '기억에 남는 시그니처', note: '핵심 장면과 포인트에 사용해 브랜드의 존재감을 만듭니다.', className: 'orange' },
  { name: 'AP865 CHAMPAGNE GOLD', hex: '#D9BC7A', role: '가까이에서 느껴지는 품격', note: '금박과 금속, 작은 디테일에 깊이와 정교함을 더합니다.', className: 'gold' },
  { name: 'AP865 SOFT GOLD', hex: '#EBD9B0', role: '부드럽게 이어지는 온기', note: '샴페인 골드와 밝은 바탕을 연결하는 보조색입니다.', className: 'soft-gold' },
  { name: 'AP865 WARM IVORY', hex: '#F7F2E6', role: '여백과 편안함', note: '넓은 바탕과 충분한 여백을 위한 기본색입니다.', className: 'ivory' },
];

export const designCriteria = [
  { title: '절제된 존재감', description: '색과 장식을 더하기 전에, 단색의 형태만으로도 AP865의 인상이 남는가.' },
  { title: '전문성과 세심함의 균형', description: '피부과의 신뢰와 개인에게 집중하는 태도가 함께 느껴지는가.' },
  { title: '접점마다 이어지는 일관성', description: '공간 사인부터 작은 카드까지 같은 브랜드로 인식되는가.' },
];

export type LogoProposal = {
  id: string;
  name: string | null;
  asset: string | null;
  video?: string;
  videoPoster?: string;
  videoAlt?: string;
  additionalImage?: { src: string; alt: string; width: number; height: number };
  comment: [string, string];
  summary?: string;
  analysis?: string;
  applications?: string;
  reviewPoints?: string[];
  assetAlt?: string;
  inspiration: string | null;
  direction: string | null;
  values: string[];
  keywords: string[];
  keyVisual: string | null;
  logoPlay: string[];
  guidelines: string | null;
};

// 제공된 이미지의 시각적 특징을 바탕으로 한 검토용 해석입니다.
// 이름은 비교를 위한 가칭이며, 제작자의 확정 의도나 최종 제작 규격이 아닙니다.
// 이미지와 문구를 여기서 교체하면 각 시안 페이지에 함께 반영됩니다.
export const logoProposals: LogoProposal[] = [
  {
    id: '02', name: 'Architectural Signature', asset: '/identity/draft02.png',
    additionalImage: { src: '/identity/proposal01-applications.png', alt: '시안 01의 건물 외관, 금속 사인, 쇼핑백, 명함, 패브릭 등 브랜드 적용 이미지', width: 1536, height: 1024 },
    comment: ['공간의 질서를 닮은 수직의 리듬.', '정교한 비례로 완성하는 프리미엄.'],
    summary: '공간의 수직적 질서를 브랜드의 인장으로.',
    assetAlt: '길고 가는 수직 획의 심볼과 AP865 CLINIC 두 줄 워드마크를 건물 외관 위에 배치한 시안 02',
    analysis: '길게 뻗은 수직 획과 뾰족하게 좁아지는 내부 여백이 기둥이나 파사드의 루버를 연상시킵니다. 왼쪽의 압축된 심볼과 오른쪽의 두 줄 워드마크가 대비를 이룹니다.',
    inspiration: '제공된 건물 외관의 세로 리듬, 건축적 비례, 정교하게 새긴 인장의 밀도.',
    direction: 'AP865의 공간과 브랜드가 같은 형태 언어를 공유하는 방향입니다. 세로의 긴장감과 절제된 장식으로, 전문성과 프리미엄의 무게감을 함께 제안합니다.',
    values: ['Premium — 정제된 비례와 공간적 존재감', 'Private — 내부를 감싸는 스크린을 연상시키는 구조'],
    keywords: ['Architecture', 'Precision', 'Presence'],
    applications: '외벽 사인, 출입구 금속 플레이트, 엘리베이터 안내 등 건축과 만나는 접점에서 강점을 검토할 수 있습니다. 심볼의 수직 리듬을 인쇄물의 구획이나 배경 패턴으로 확장하는 방식도 가능합니다.',
    reviewPoints: ['좁고 긴 내부 여백이 축소·금박·금속 제작에서 뭉개지지 않는지 확인해야 합니다.', '심볼 단독일 때 AP865와의 연결이 충분한지, 심볼과 두 줄 워드마크의 시각적 무게가 균형을 이루는지 검토합니다.'],
    keyVisual: null, logoPlay: [], guidelines: null,
  },
  {
    id: '01', name: 'Personal Gesture', asset: '/identity/draft01.png',
    comment: ['한 사람을 위한 유려한 제스처.', '프라이빗 케어를 담은 부드러운 서명.'],
    summary: '한 사람에게 건네는, 유려한 환대의 제스처.',
    assetAlt: '곡선과 기울어진 획이 겹친 흰색 심볼, 하단 AP865 워드마크를 따뜻한 리셉션 공간에 배치한 시안 01',
    analysis: '크게 열린 곡선과 기울어진 획이 겹쳐 손으로 쓴 서명 같은 인상을 만듭니다. 아래의 AP865 워드마크가 자유로운 심볼을 받쳐 주는 세로형 구성입니다.',
    inspiration: '개인의 서명, 손글씨의 유연함, 공간의 둥근 모서리에서 연상되는 부드러운 환대.',
    direction: '기관의 권위보다 한 사람과의 관계를 먼저 드러내는 방향입니다. 정형화된 의료 이미지에서 벗어나, 개인을 섬세하게 대하는 프라이빗 브랜드의 인상을 제안합니다.',
    values: ['Private — 개인에게 집중하는 서명 같은 표정', 'Concierge — 곡선에서 읽히는 유연한 응대'],
    keywords: ['Personal', 'Gesture', 'Warmth'],
    applications: '심볼을 중심으로 한 리셉션 사인, 예약 카드, 개인별 케어 노트에 어울리는 방향입니다. 넓은 여백과 제한적인 샴페인 골드 포인트로 제스처 자체에 시선을 모을 수 있습니다.',
    reviewPoints: ['심볼이 AP보다 다른 문자나 숫자로 읽힐 여지가 있어, 첫인상에서의 문자 인지성을 확인해야 합니다.', '획이 만나는 부분과 열린 곡선의 간격을 정리하고, 워드마크와의 크기 비율을 소형 인쇄물에서도 검토합니다.'],
    keyVisual: null, logoPlay: [], guidelines: null,
  },
  {
    id: '05', name: 'Timeless Monogram', asset: '/identity/draft05.png',
    comment: ['유려한 이니셜에 담긴 클래식한 품격.', '오래 기억되는 프리미엄 모노그램.'],
    summary: '시간이 지나도 남는, 개인을 위한 클래식.',
    assetAlt: 'A를 중심으로 큰 루프와 곡선 획이 결합된 흰색 모노그램, 양옆의 AP865와 CLINIC을 보여 주는 시안 05',
    analysis: 'A로 읽히는 중심 획에 큰 루프와 길게 뻗는 곡선을 결합한 모노그램입니다. 굵고 가는 획의 대비, 둥근 끝맺음, 양옆의 세리프 워드마크가 클래식한 인상을 만듭니다.',
    inspiration: '캘리그래피의 획 대비, 개인의 이니셜, 오래 간직하는 인장의 형식.',
    direction: '유행의 속도보다 오래 지속되는 취향과 신뢰에 무게를 두는 방향입니다. 사적인 공간과 개인화된 서비스에 어울리는, 차분하지만 기억되는 프리미엄 이미지를 제안합니다.',
    values: ['Premium — 클래식한 획 대비와 완성도', 'Private — 개인의 이니셜을 연상시키는 상징성'],
    keywords: ['Timeless', 'Monogram', 'Elegance'],
    applications: '리셉션의 금속 사인, 멤버십 카드, 봉투와 케어 키트의 금박·음각 표현에 어울리는 방향입니다. 중앙 모노그램을 주인공으로 두고 주변 정보를 절제하는 구성이 적합합니다.',
    reviewPoints: ['가는 곡선과 굵은 끝부분의 대비가 작은 크기에서도 유지되는지 확인합니다.', 'A의 인지가 중심인 만큼 AP 전체와의 연결을 보완하고, 양옆으로 나뉜 워드마크의 정렬과 간격을 정교하게 조율합니다.'],
    keyVisual: null, logoPlay: [], guidelines: null,
  },
  {
    id: '03', name: 'Rhythm of Care', asset: '/identity/draft03.png',
    video: '/identity/AP865_natural_number_writing.mp4',
    additionalImage: { src: '/identity/usage04.png', alt: '시안 04의 리본형 심볼을 적용한 클리닉 외부 사인과 쇼핑백', width: 1920, height: 1080 },
    comment: ['반복되는 곡선, 오래 이어지는 케어.', '삶의 리듬을 함께하는 컨시어지.'],
    summary: '한 번의 방문을 넘어, 이어지는 케어의 리듬.',
    assetAlt: '세 층으로 반복되는 리본형 곡선 심볼 양옆에 AP865와 CLINIC을 배치한 시안 03',
    analysis: '리본처럼 이어지는 곡선이 세 층으로 반복되고, 중앙의 교차부가 형태를 연결합니다. AP865와 CLINIC을 양옆에 나눈 구성은 심볼을 하나의 문양처럼 강조합니다.',
    inspiration: '리본의 흐름, 반복되는 루프, 일상 속에서 차곡차곡 쌓이는 관리의 리듬.',
    direction: '연결과 지속성을 장식적인 문양으로 표현하는 방향입니다. 케어가 일회성 사건이 아니라 삶의 리듬에 맞춰 이어지는 관계라는 이야기를 담기에 적합합니다.',
    values: ['Concierge — 끊기지 않고 이어지는 관계와 관리', 'Premium — 균형 잡힌 곡선에서 읽히는 장식적 품격'],
    keywords: ['Continuity', 'Ritual', 'Balance'],
    applications: '예약 카드, 케어 프로그램 북, 패브릭과 패키지의 반복 패턴으로 확장할 수 있습니다. 제공 이미지의 차분한 라운지 무드와 함께, 머무는 경험을 중심으로 제안하기 좋습니다.',
    reviewPoints: ['중앙의 겹친 획이 작게 사용할 때 하나의 덩어리로 보이지 않는지 확인합니다.', '심볼만으로 브랜드를 구분할 수 있는지 검토하고, 넓은 가로형 조합을 좁은 모바일 화면과 세로 사인에 맞출 보조 구성이 필요합니다.'],
    keyVisual: null, logoPlay: [], guidelines: null,
  },
  {
    id: '04', name: 'Personal Modules', asset: '/identity/draft04.png',
    video: '/identity/AP865_keyvisual_photo_motion.mp4',
    videoPoster: '/identity/AP865_keyvisual_photo_poster.jpg',
    videoAlt: '흑백 인물 사진 위에서 오렌지색 AP865 모듈 로고가 움직이는 키비주얼 영상',
    comment: ['하나의 기준, 다채로운 조합.', '개인에 맞춰 확장되는 브랜드.'],
    summary: '같은 기준, 각자의 조합. 맞춤 케어를 위한 시스템.',
    assetAlt: 'A, P, 8, 6, 5를 사각 블록과 함께 서로 다르게 배열한 세 가지 변형을 보여 주는 시안 04',
    analysis: 'A·P·8·6·5를 사각형 단위와 결합해 재배열한 세 가지 변형입니다. 굵은 산세리프 문자와 하단의 세리프 CLINIC이 현대적인 조합 방식과 클래식한 인상을 대비시킵니다.',
    inspiration: '모듈, 그리드, 개인의 필요에 맞춰 달라지는 구성 방식.',
    direction: '고정된 하나의 표정보다 규칙 안에서 변화하는 아이덴티티를 제안합니다. 개인별로 달라지는 케어를 시스템의 유연함으로 설명할 수 있지만, 프리미엄의 절제감을 지키는 운영 규칙이 중요합니다.',
    values: ['Concierge — 개인에 따라 달라지는 맞춤형 조합', 'Private — 동일한 기준 안에서 존중되는 각자의 차이'],
    keywords: ['Modular', 'Personalized', 'Flexible'],
    applications: '디지털 콘텐츠, 케어 프로그램 구분, 안내 그래픽에 확장성이 있습니다. 이미지 속 세 배열은 하나의 시안에 속한 변형안으로 보고, 대표 로고 한 가지와 제한된 보조 배열을 구분하는 방향을 제안합니다.',
    reviewPoints: ['문자가 흩어져 있어 AP865의 읽는 순서가 즉시 전달되는지 확인해야 합니다.', '블록 조합이 놀이처럼 보이지 않도록 배열 수·간격·색의 규칙을 제한하고, CLINIC 서체와의 대비가 의도적으로 느껴지는지 검토합니다.'],
    keyVisual: null, logoPlay: [], guidelines: null,
  },
];
