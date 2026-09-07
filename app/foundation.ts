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
  { name: 'Signature Orange', hex: '#D85C35', role: '기억에 남는 시그니처', note: '핵심 장면과 포인트에 사용해 브랜드의 존재감을 만듭니다.', className: 'orange' },
  { name: 'Champagne Gold', hex: '#D9BC7A', role: '가까이에서 느껴지는 품격', note: '금박과 금속, 작은 디테일에 깊이와 정교함을 더합니다.', className: 'gold' },
  { name: 'Soft Gold', hex: '#EBD9B0', role: '부드럽게 이어지는 온기', note: '샴페인 골드와 밝은 바탕을 연결하는 보조색입니다.', className: 'soft-gold' },
  { name: 'Warm Ivory', hex: '#F7F2E6', role: '여백과 편안함', note: '넓은 바탕과 충분한 여백을 위한 기본색입니다.', className: 'ivory' },
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
  inspiration: string | null;
  direction: string | null;
  values: string[];
  keywords: string[];
  keyVisual: string | null;
  logoPlay: string[];
  guidelines: string | null;
};

// 전달받은 로고를 public/identity/에 넣고 asset에 '/identity/파일명.svg'를 입력합니다.
// asset이 null인 동안은 빈 시안 영역으로 표시됩니다. 이전 제안은 불러오지 않습니다.
export const logoProposals: LogoProposal[] = ['01', '02', '03'].map((id) => ({
  id, name: null, asset: null, inspiration: null, direction: null,
  values: [], keywords: [], keyVisual: null, logoPlay: [], guidelines: null,
}));
