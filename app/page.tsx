import {
  archiveSlots,
  brand,
  colors,
  logoCandidates,
  logoCriteria,
  logoUsageRules,
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
        <SectionTitle index="03" title="Logo Lab" />
        <div className="logo-lead"><p>From open study to a system.</p><span>Illustrator 작업 보드의 그래픽을 실제 벡터로 분리해 비교합니다. 지금은 확정안이 아니라, 전략 적합성과 실사용 성능을 같은 화면에서 검증하는 의사결정 단계입니다.</span></div>
        <figure className="source-board">
          <img src={`${basePath}/identity/logo-exploration-board.png`} alt="AP865 로고 탐색 원본 아트보드 전체" loading="lazy" />
          <figcaption><span>Source board · logo_draft01.ai</span><p>원본 탐색의 결을 보존하면서, 아래 세 방향을 실제 운영 가능한 로고 시스템으로 좁혀갑니다.</p></figcaption>
        </figure>
        <div className="logo-criteria-grid">
          {logoCriteria.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>

        <div className="candidate-list">
          {logoCandidates.map((candidate) => (
            <article className={`logo-candidate ${candidate.className}`} id={candidate.number.toLowerCase()} key={candidate.number}>
              <header className="candidate-header"><span>{candidate.number}</span><h3>{candidate.name}</h3><em>{candidate.status}</em></header>
              <div className="candidate-stage">
                <img src={`${basePath}${candidate.asset}`} alt={candidate.assetLabel} loading="lazy" />
                <span className="candidate-axis" aria-hidden="true" />
                <p>{candidate.role}</p>
              </div>
              <div className="candidate-story">
                <p>{candidate.rationale}</p>
                <ul>{candidate.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
                <a href={`${basePath}${candidate.asset}`} download>Download working SVG ↓</a>
              </div>
              <div className="candidate-specs">
                <div><span>Proportion</span><strong>{candidate.ratio}</strong></div>
                <div><span>Clear space</span><strong>{candidate.clearSpace}</strong></div>
                <div><span>Minimum size</span><strong>{candidate.minimum}</strong></div>
              </div>
              <div className="guide-grid">
                <figure className="clear-space-guide">
                  <span className="guide-label">Clear space · ×</span>
                  <div><i>×</i><img src={`${basePath}${candidate.asset}`} alt="" /><i>×</i></div>
                  <figcaption>보호 공간 안에는 텍스트, 프레임, 이미지의 주요 피사체를 배치하지 않습니다.</figcaption>
                </figure>
                <figure className="minimum-guide">
                  <span className="guide-label">Minimum size check</span>
                  <div className="size-row"><img src={`${basePath}${candidate.asset}`} alt="" /><img src={`${basePath}${candidate.asset}`} alt="" /><img src={`${basePath}${candidate.asset}`} alt="" /></div>
                  <figcaption>세 번째 크기에서 획과 숫자 내부 공간이 무너지면 더 이상 축소하지 않습니다.</figcaption>
                </figure>
                <figure className="application-guide">
                  <span className="guide-label">Positive / reverse / accent</span>
                  <div><span><img src={`${basePath}${candidate.asset}`} alt="" /></span><span><img src={`${basePath}${candidate.asset}`} alt="" /></span><span><img src={`${basePath}${candidate.asset}`} alt="" /></span></div>
                  <figcaption>기본은 에스프레소와 아이보리. 샴페인 골드는 금속·박·엠보싱 같은 마감에 제한합니다.</figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>

        <div className="mark-rules">{logoUsageRules.map((rule) => <div key={rule.label}><span>{rule.label}</span><strong>{rule.value}</strong></div>)}</div>
      </section>

      <section className="key-visual-section" id="key-visual">
        <SectionTitle index="04" title="Key Visual" />
        <div className="key-visual-lead"><p>Private care, composed in layers.</p><span>리본 모노그램의 겹침, 샴페인 골드의 얇은 빛, 공간의 따뜻한 재료감을 하나의 장면으로 연결합니다. 아래 적용은 로고 방향을 판단하기 위한 프로토타입입니다.</span></div>
        <div className="key-visual-hero" id="key-visual-hero">
          <img src={`${basePath}/images/ap865-concierge-hero.png`} alt="AP865 프라이빗 스킨 컨시어지 공간 키비주얼" loading="lazy" />
          <div className="key-visual-lockup">
            <img src={`${basePath}/identity/ribbon-monogram-gold.svg`} alt="" />
            <img src={`${basePath}/identity/serif-wordmark-ivory.svg`} alt="AP865" />
            <span>Private Skin Concierge</span>
          </div>
          <p>Warm ivory · walnut · champagne metal · atelier orange</p>
        </div>
        <div className="key-visual-grid">
          <article className="kv-orange"><span>01 / Welcome signal</span><img src={`${basePath}/identity/ribbon-monogram.svg`} alt="리본 모노그램 오렌지 적용" /><p>예약 확인과 첫 안내에서만 강하게 사용하는 오렌지 시그널.</p></article>
          <article className="kv-espresso"><span>02 / Formal signature</span><img src={`${basePath}/identity/serif-wordmark-ivory.svg`} alt="세리프 워드마크 리버스 적용" /><p>공식 문서, 상담 카드, 디지털 헤더의 조용한 기본 서명.</p></article>
          <article className="kv-champagne"><span>03 / Spatial marker</span><img src={`${basePath}/identity/numeral-sign.svg`} alt="865 숫자형 공간 사인" /><p>룸 넘버와 동선 사인에서 사용하는 실험적 숫자 모티프.</p></article>
        </div>
      </section>

      <section className="color-section" id="color">
        <SectionTitle index="05" title="Color" />
        <div className="color-grid">{colors.map((color) => <article className={`color-card ${color.className}`} key={color.name}><span>{color.name}</span><code>{color.hex}</code></article>)}</div>
        <p className="section-footnote">오렌지는 브랜드의 자신감, 샴페인 골드는 절제된 환대, 아이보리와 에스프레소는 안정적인 전문성을 표현합니다.</p>
      </section>

      <section className="type-section" id="type">
        <SectionTitle index="06" title="Typography" />
        <div className="type-specimen"><div className="type-large"><span>Display / 96</span><p>Aa 가</p></div><div className="type-copy"><span>Sans family</span><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p><p>abcdefghijklmnopqrstuvwxyz 0123456789</p><p>가나다라마바사 아자차카타파하</p></div><div className="type-meta"><span>Primary</span><strong>System Sans</strong><span>Fallback</span><strong>Arial / sans-serif</strong></div></div>
      </section>

      <section className="voice-section" id="voice">
        <SectionTitle index="07" title="Voice" />
        <div className="voice-lead"><p>먼저 알고, 조용히 제안하는 언어.</p><span>AP865는 과장된 약속보다 세심한 관찰과 확신 있는 안내로 신뢰를 만듭니다.</span></div>
        <div className="voice-table"><div className="voice-row voice-head"><span>Instead of</span><span>Use</span></div>{voicePairs.map((pair) => <div className="voice-row" key={pair.instead}><p>{pair.instead}</p><p>{pair.use}</p></div>)}</div>
      </section>

      <section className="archive-section" id="archive">
        <SectionTitle index="08" title="Decision Log" />
        <div className="archive-heading"><p>A shared record of why.</p><span>논의한 기준, 선택한 방향, 다음 검증 항목을 한곳에 기록합니다. 팀은 같은 근거로 만들고 결정권자는 변화의 이유를 확인할 수 있습니다.</span></div>
        <div className="archive-list">{archiveSlots.map((slot) => <article key={slot.number}><span>{slot.number}</span><h3>{slot.title}</h3><p>{slot.note}</p><em>{slot.status}</em></article>)}</div>
      </section>

      <footer><p>AP865 BI Workroom</p><p>{brand.edition} · Last updated {brand.updated}</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
