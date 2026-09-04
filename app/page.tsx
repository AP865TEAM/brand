import {
  archiveSlots,
  brand,
  colors,
  logoCriteria,
  navigation,
  principles,
  strategy,
  valueTranslations,
  voicePairs,
} from './content';

function SectionTitle({ index, title }: { index: string; title: string }) {
  return <div className="section-title"><span>{index}</span><h2>{title}</h2></div>;
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="AP865 맨 위로 이동">AP<span>865</span></a>
        <nav aria-label="브랜드 가이드 섹션">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <span className="header-edition">{brand.edition}</span>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src={`${basePath}/images/ap865-concierge-hero.png`} alt="아이보리 스톤, 월넛 우드, 샴페인 골드와 오렌지 가구가 어우러진 AP865 프라이빗 라운지" />
        <div className="hero-shade" />
        <div className="hero-meta"><span>{brand.category}</span><span>{brand.updated}</span></div>
        <div className="hero-content"><p>Private care, composed around you.</p><h1 aria-label="AP865">AP<span>865</span></h1></div>
        <a className="scroll-cue" href="#overview">Explore archive <span aria-hidden="true">↓</span></a>
      </section>

      <section className="intro" id="overview">
        <SectionTitle index="00" title="Overview" />
        <div className="intro-copy"><p className="statement">{brand.statement}</p><p className="description">{brand.introduction}</p></div>
        <div className="intro-note"><span>POSITION</span><p>정확한 메디컬 케어와 호텔 컨시어지의 세심함이 만나는 곳. AP865는 피부를 치료하는 시간을 온전히 나를 돌보는 경험으로 바꿉니다.</p></div>
      </section>

      <section className="direction-section" id="direction">
        <SectionTitle index="01" title="Brand Direction" />
        <div className="direction-lead"><p>From clinic to personal skin partner.</p><span>로고와 모든 브랜드 접점은 아래 네 가지 전략 문장에서 출발합니다. 이 페이지는 시안의 취향을 고르는 곳이 아니라, AP865다운 선택을 함께 증명하는 기준입니다.</span></div>
        <div className="strategy-grid">
          {strategy.map((item) => <article className="strategy-card" key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </section>

      <section className="principles" id="principles">
        <SectionTitle index="02" title="Core Values" />
        <div className="principle-list">
          {principles.map((item) => <article key={item.index} className="principle-card"><span className="card-index">{item.index}</span><div><h3>{item.title}</h3><p className="korean">{item.korean}</p></div><p>{item.description}</p></article>)}
        </div>
        <div className="translation-table">
          <div className="translation-row translation-head"><span>Value</span><span>Experience</span><span>Visual translation</span></div>
          {valueTranslations.map((item) => <div className="translation-row" key={item.value}><strong>{item.value}</strong><p>{item.experience}</p><p>{item.design}</p></div>)}
        </div>
      </section>

      <section className="mark" id="mark">
        <SectionTitle index="03" title="Logo Direction" />
        <div className="logo-lead"><p>A mark with quiet authority.</p><span>현재 워드마크는 방향을 확인하기 위한 워킹 프리뷰입니다. 최종안은 개인화된 정밀함, 절제된 차별성, 다양한 접점에서의 확장성을 함께 충족해야 합니다.</span></div>
        <div className="mark-stage"><p className="mark-word" aria-label="AP865 워킹 워드마크">AP<span>865</span></p><p className="stage-caption">Working wordmark preview · Replace with approved master artwork</p></div>
        <div className="logo-criteria-grid">
          {logoCriteria.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
        <div className="mark-rules"><div><span>Clear space</span><strong>1× A-height</strong></div><div><span>Minimum size</span><strong>24 px / 8 mm</strong></div><p>공식 마스터 에셋 확정 후 보호 공간, 최소 크기, 금지 규정을 이 영역에 추가합니다.</p></div>
      </section>

      <section className="color-section" id="color">
        <SectionTitle index="04" title="Color" />
        <div className="color-grid">{colors.map((color) => <article className={`color-card ${color.className}`} key={color.name}><span>{color.name}</span><code>{color.hex}</code></article>)}</div>
        <p className="section-footnote">오렌지는 브랜드의 자신감, 샴페인 골드는 절제된 환대, 아이보리와 에스프레소는 안정적인 전문성을 표현합니다.</p>
      </section>

      <section className="type-section" id="type">
        <SectionTitle index="05" title="Typography" />
        <div className="type-specimen"><div className="type-large"><span>Display / 96</span><p>Aa 가</p></div><div className="type-copy"><span>Sans family</span><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p><p>abcdefghijklmnopqrstuvwxyz 0123456789</p><p>가나다라마바사 아자차카타파하</p></div><div className="type-meta"><span>Primary</span><strong>System Sans</strong><span>Fallback</span><strong>Arial / sans-serif</strong></div></div>
      </section>

      <section className="voice-section" id="voice">
        <SectionTitle index="06" title="Voice" />
        <div className="voice-lead"><p>먼저 알고, 조용히 제안하는 언어.</p><span>AP865는 과장된 약속보다 세심한 관찰과 확신 있는 안내로 신뢰를 만듭니다.</span></div>
        <div className="voice-table"><div className="voice-row voice-head"><span>Instead of</span><span>Use</span></div>{voicePairs.map((pair) => <div className="voice-row" key={pair.instead}><p>{pair.instead}</p><p>{pair.use}</p></div>)}</div>
      </section>

      <section className="archive-section" id="archive">
        <SectionTitle index="07" title="Decision Log" />
        <div className="archive-heading"><p>A shared record of why.</p><span>논의한 기준, 선택한 방향, 다음 검증 항목을 한곳에 기록합니다. 팀은 같은 근거로 만들고 결정권자는 변화의 이유를 확인할 수 있습니다.</span></div>
        <div className="archive-list">{archiveSlots.map((slot) => <article key={slot.number}><span>{slot.number}</span><h3>{slot.title}</h3><p>{slot.note}</p><em>{slot.status}</em></article>)}</div>
      </section>

      <footer><p>AP865 BI Workroom</p><p>{brand.edition} · Last updated {brand.updated}</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
