import {
  archiveSlots,
  brand,
  brandProjects,
  colors,
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
        <SectionTitle index="03" title="Identity Projects" />
        <div className="logo-lead"><p>Three complete points of view.</p><span>하나의 로고를 고르는 비교가 아니라, 서로 다른 영감과 전략에서 출발한 세 개의 완성형 브랜드 프로젝트를 제안합니다. 각 방향은 로고, 키비주얼, 언어와 실제 운영 방식까지 하나의 세트로 연결됩니다.</span></div>
        <figure className="source-board">
          <img src={`${basePath}/identity/logo-exploration-board.png`} alt="AP865 로고 탐색 원본 아트보드 전체" loading="lazy" />
          <figcaption><span>Source board · logo_draft01.ai</span><p>Illustrator에 축적된 리본, 세리프, 콘덴스드, 숫자 모티프를 해체하고 다시 조합해 세 개의 마스터 로고를 완성했습니다.</p></figcaption>
        </figure>
        <div className="project-index-grid">
          {brandProjects.map((project) => <a href={`#${project.id}`} key={project.id}><span>{project.number}</span><strong>{project.name}</strong><p>{project.korean}</p><em>Open project ↓</em></a>)}
        </div>
        <div className="logo-criteria-grid">
          {logoCriteria.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </section>

      {brandProjects.map((project) => (
        <section className={`identity-project ${project.className}`} id={project.id} key={project.id}>
          <div className="project-heading"><span>Project {project.number}</span><p>{project.label}</p><h2>{project.name}</h2><strong>{project.korean}</strong></div>

          <div className="project-cover">
            <span>Completed logo proposal · {project.number}</span>
            <img src={`${basePath}${project.asset}`} alt={project.assetAlt} loading="lazy" />
            <p>Built from the original Illustrator motifs.</p>
          </div>

          <div className="project-chapter project-inspiration">
            <div className="chapter-label"><span>01</span><strong>Inspiration</strong></div>
            <div className="inspiration-grid">{project.inspiration.map((item) => <article key={item.title}><span>{item.title}</span><p>{item.note}</p></article>)}</div>
          </div>

          <div className="project-chapter project-intention">
            <div className="chapter-label"><span>02</span><strong>Intended direction</strong></div>
            <p>{project.intent}</p>
          </div>

          <div className="project-chapter project-values">
            <div className="chapter-label"><span>03</span><strong>Core values</strong></div>
            <div>{project.values.map((value) => <article key={value.name}><h3>{value.name}</h3><p>{value.expression}</p></article>)}</div>
          </div>

          <div className="project-chapter project-keywords">
            <div className="chapter-label"><span>04</span><strong>Main keywords</strong></div>
            <div>{project.keywords.map((keyword, index) => <p key={keyword}><span>0{index + 1}</span>{keyword}</p>)}</div>
          </div>

          <div className="project-chapter project-visual">
            <div className="chapter-label"><span>05</span><strong>Key visual</strong></div>
            <figure>
              <img src={`${basePath}/images/ap865-concierge-hero.png`} alt={`${project.name} 방향의 AP865 공간 키비주얼`} loading="lazy" />
              <div className="project-visual-logo"><img src={`${basePath}${project.asset}`} alt="" /></div>
              <figcaption>{project.visualCaption}</figcaption>
            </figure>
          </div>

          <div className="project-chapter logo-play">
            <div className="chapter-label"><span>06</span><strong>Logo play</strong></div>
            <div className="logo-play-grid">
              <figure className="play-master"><span>Master signature</span><img src={`${basePath}${project.asset}`} alt={`${project.name} 마스터 로고`} /></figure>
              <figure className="play-motif"><span>Motif rhythm</span><div><img src={`${basePath}${project.motifAsset}`} alt="" /><img src={`${basePath}${project.motifAsset}`} alt="" /><img src={`${basePath}${project.motifAsset}`} alt="" /></div></figure>
              <figure className="play-reverse"><span>Reverse application</span><img src={`${basePath}${project.asset}`} alt="" /></figure>
              <figure className="play-crop"><span>Graphic crop</span><img src={`${basePath}${project.motifAsset}`} alt="" /></figure>
            </div>
            <div className="project-spec"><span>Master ratio <strong>{project.ratio}</strong></span><span>Minimum size <strong>{project.minimum}</strong></span><a href={`${basePath}${project.asset}`} download>Download completed SVG ↓</a></div>
          </div>
        </section>
      ))}

      <section className="system-rules">
        <SectionTitle index="06" title="Shared Usage Rules" />
        <div className="mark-rules">{logoUsageRules.map((rule) => <div key={rule.label}><span>{rule.label}</span><strong>{rule.value}</strong></div>)}</div>
      </section>

      <section className="color-section" id="color">
        <SectionTitle index="07" title="Color" />
        <div className="color-grid">{colors.map((color) => <article className={`color-card ${color.className}`} key={color.name}><span>{color.name}</span><code>{color.hex}</code></article>)}</div>
        <p className="section-footnote">오렌지는 브랜드의 자신감, 샴페인 골드는 절제된 환대, 아이보리와 에스프레소는 안정적인 전문성을 표현합니다.</p>
      </section>

      <section className="type-section" id="type">
        <SectionTitle index="08" title="Typography" />
        <div className="type-specimen"><div className="type-large"><span>Display / 96</span><p>Aa 가</p></div><div className="type-copy"><span>Sans family</span><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p><p>abcdefghijklmnopqrstuvwxyz 0123456789</p><p>가나다라마바사 아자차카타파하</p></div><div className="type-meta"><span>Primary</span><strong>System Sans</strong><span>Fallback</span><strong>Arial / sans-serif</strong></div></div>
      </section>

      <section className="voice-section" id="voice">
        <SectionTitle index="09" title="Voice" />
        <div className="voice-lead"><p>먼저 알고, 조용히 제안하는 언어.</p><span>AP865는 과장된 약속보다 세심한 관찰과 확신 있는 안내로 신뢰를 만듭니다.</span></div>
        <div className="voice-table"><div className="voice-row voice-head"><span>Instead of</span><span>Use</span></div>{voicePairs.map((pair) => <div className="voice-row" key={pair.instead}><p>{pair.instead}</p><p>{pair.use}</p></div>)}</div>
      </section>

      <section className="archive-section" id="archive">
        <SectionTitle index="10" title="Decision Log" />
        <div className="archive-heading"><p>A shared record of why.</p><span>논의한 기준, 선택한 방향, 다음 검증 항목을 한곳에 기록합니다. 팀은 같은 근거로 만들고 결정권자는 변화의 이유를 확인할 수 있습니다.</span></div>
        <div className="archive-list">{archiveSlots.map((slot) => <article key={slot.number}><span>{slot.number}</span><h3>{slot.title}</h3><p>{slot.note}</p><em>{slot.status}</em></article>)}</div>
      </section>

      <footer><p>AP865 BI Workroom</p><p>{brand.edition} · Last updated {brand.updated}</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
