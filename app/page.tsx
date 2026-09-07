import ValueConvergence from './ValueConvergence';
import { foundation, sourceValues, keywords, palette, designCriteria, logoProposals } from './foundation';

function PageLabel({ number, title }: { number: string; title: string }) {
  return <div className="page-label"><span>{number}</span><p>{title}</p><span>AP865 / Brand Foundation</span></div>;
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <main id="top" className="fullpage-story">
      <a className="skip-link" href="#core-values">본문으로 건너뛰기</a>
      <section className="full-page cover-page" aria-labelledby="cover-title">
        <figure className="opening-visual">
          <img src={`${basePath}/images/ap865-concierge-hero.png`} alt="따뜻한 석재와 브론즈, 오렌지 좌석으로 표현한 AP865의 프라이빗 공간 무드" fetchPriority="high" />
          <figcaption><span>AP865 Brand Direction</span><h1 id="cover-title">{foundation.title}</h1><div aria-hidden="true" /></figcaption>
        </figure>
      </section>

      <section className="full-page values-scene" id="core-values" aria-label="코어밸류 모션 · 열 가지 기준에서 세 가지 핵심 가치로">
        <ValueConvergence />
      </section>

      <section className="full-page definitions-scene" id="keywords" aria-labelledby="keywords-title">
        <PageLabel number="02" title="Our Three Core Values" />
        <div className="core-conclusion"><span className="eyebrow">Our three core values</span><h2 id="keywords-title">우리가 지킬 약속,<br />브랜드를 이끄는 세 가지.</h2><p>Private · Concierge · Premium</p></div>
        <div className="core-definitions">
          {keywords.map(item => <article key={item.keyword}><h3>{item.keyword}</h3><strong>{item.korean}</strong><p>{item.interpretation}</p><span>도출 기준 {item.sources.join(' · ')}</span></article>)}
        </div>
        <details className="source-principles"><summary>아름다움에 대한 열 가지 기준 · 원문과 연결 보기 <span>＋</span></summary><p className="grouping-note">모션은 각 기준의 중심 의미를 따라 한 그룹에 연결합니다. 세 코어밸류는 실제 브랜드 경험에서 서로 맞물려 작동합니다. 의학적 정확성·자연스러운 변화·의사의 책임과 신뢰는 Premium의 기반입니다.</p><ol className="value-list">
          {sourceValues.map(value => <li id={`value-${value.id}`} key={value.id}><span className="value-number">{value.id}</span><div><h3>{value.title}</h3><p>{value.english}</p><span className="value-destination">→ {keywords.find(item => item.sources.includes(value.id))?.keyword}</span></div></li>)}
        </ol></details>
      </section>

      <section className="full-page positioning-scene" aria-label="Brand positioning">
        <PageLabel number="03" title="Brand Positioning" />
        <div className="positioning"><span>Brand positioning</span><p className="positioning-statement">Private Skin &amp;<br />Aging Care Concierge<span>with a Premium experience.</span></p><p className="positioning-korean">의학적 신뢰를 바탕으로, 한 사람의 피부와 나이 들어가는 과정까지 함께 돌보는 프리미엄 케어 컨시어지.</p></div>
        <div className="page-end"><span>세 가지 핵심 가치에서 브랜드의 시각 언어로.</span><a href="#color">키 컬러와 방향성 ↓</a></div>
      </section>

      <section className="full-page color-scene" id="color" aria-labelledby="color-title">
        <PageLabel number="04" title="Key Color & Direction" />
        <div className="page-intro">
          <div><span className="eyebrow">Our visual language</span><h2 id="color-title">기억되는 색.<br />절제된 품격.</h2></div>
          <p>오렌지는 AP865의 존재감을, 샴페인 골드는 가까이에서 느껴지는 완성도를 표현합니다. 소프트 골드의 온기와 웜 아이보리의 여백으로 연결해, 네 가지 색 안에서 일관된 프리미엄 무드를 만듭니다.</p>
        </div>
        <div className="palette">
          {palette.map(color => <article className={`color-swatch ${color.className}`} key={color.name}><div><h3>{color.name}</h3><span>{color.hex}</span></div><div><strong>{color.role}</strong><p>{color.note}</p></div></article>)}
        </div>
        <p className="color-note">첨부 레퍼런스의 세 가지 색상 코드와 AP865 오렌지를 조합한 네 가지 브랜드 컬러입니다. 샴페인 골드의 금박·금속 표현은 실제 제작 샘플로 확인합니다. 가독성을 위한 짙은 본문색은 별도의 기본 문자색으로 사용합니다.</p>
      </section>

      <section className="full-page direction-scene" aria-labelledby="direction-title">
        <PageLabel number="05" title="Direction for Identity" />
        <div className="visual-directions">{keywords.map(item => <div key={item.keyword}><span>{item.keyword}</span><p>{item.expression}</p></div>)}</div>
        <div className="selection-criteria"><div><span className="eyebrow">Criteria for identity</span><h2 id="direction-title">로고는 이 방향을<br />어떻게 증명하는가.</h2></div><ol>{designCriteria.map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></li>)}</ol></div>
        <div className="page-end"><span>코어밸류 → 키워드 → 시각 방향 → 로고 시안</span><a href="#proposals">로고 시안 영역 ↓</a></div>
      </section>

      <section className="proposal-section" id="proposals" aria-label="Logo Proposals">
        <div className="proposal-slots">
          {logoProposals.map((proposal, index) => <article className={`full-page proposal-slot${proposal.asset ? ' is-ready' : ''}`} key={proposal.id} aria-labelledby={`proposal-title-${proposal.id}`}>
            <PageLabel number={String(index + 6).padStart(2, '0')} title={`Brand Identity / ${proposal.id}`} />
            <div className="proposal-heading"><span className="eyebrow">Next / Brand Identity</span><h2 id={`proposal-title-${proposal.id}`}>Logo Proposal {proposal.id}</h2><p>브랜드 방향성을 형태로 제안하는 단계.<br />시안 전달 후, 각 제안의 의도와 근거를 이곳에 담습니다.</p></div>
            <div className="slot-heading"><h3>{proposal.name ?? `시안 ${proposal.id}`}</h3><span>{proposal.asset ? '검토안' : '자료 대기'}</span></div>
            {proposal.asset ? <div className="submitted-proposal">
              <img src={`${basePath}${proposal.asset}`} alt={`${proposal.name ?? proposal.id} 로고 시안`} />
              {proposal.inspiration && <div><h4>영감</h4><p>{proposal.inspiration}</p></div>}
              {proposal.direction && <div><h4>의도하는 방향성</h4><p>{proposal.direction}</p></div>}
              {proposal.values.length > 0 && <div><h4>코어밸류</h4><p>{proposal.values.join(' · ')}</p></div>}
              {proposal.keywords.length > 0 && <div><h4>메인 키워드</h4><p>{proposal.keywords.join(' · ')}</p></div>}
              {proposal.keyVisual && <figure><img src={`${basePath}${proposal.keyVisual}`} alt={`${proposal.name} 키비주얼`} /><figcaption>Key visual</figcaption></figure>}
              {proposal.logoPlay.map((asset, index) => <img key={asset} src={`${basePath}${asset}`} alt={`${proposal.name} 로고 플레이 ${index + 1}`} />)}
              {proposal.guidelines && <div><h4>규격 가이드</h4><p>{proposal.guidelines}</p></div>}
            </div> : <div className="empty-canvas" aria-label={`시안 ${proposal.id} 빈 영역`}><span>Reserved for your identity</span></div>}
          </article>)}
        </div>
      </section>
      <footer><span>AP865 / Brand Foundation</span><span>Core values · Direction · Identity</span><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
