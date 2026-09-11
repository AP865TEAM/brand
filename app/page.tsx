import ValueConvergence from './ValueConvergence';
import LogoProposalGallery from './LogoProposalGallery';
import SectionNavigator from './SectionNavigator';
import { foundation, sourceValues, keywords, palette, logoProposals } from './foundation';

function PageLabel({ number, title }: { number: string; title: string }) {
  return <div className="page-label"><span>{number}</span><p>{title}</p><span>AP865 / Brand Foundation</span></div>;
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <main id="top" className="fullpage-story">
      <a className="skip-link" href="#core-values">본문으로 건너뛰기</a>
      <SectionNavigator>
      <section className="full-page cover-page" id="intro" aria-labelledby="cover-title">
        <figure className="opening-visual">
          <img src={`${basePath}/images/ap865-concierge-hero.png`} alt="따뜻한 석재와 브론즈, 오렌지 좌석으로 표현한 AP865의 프라이빗 공간 무드" fetchPriority="high" />
          <figcaption><span>AP865 Brand Direction</span><h1 id="cover-title">{foundation.title}</h1><div aria-hidden="true" /></figcaption>
        </figure>
      </section>

      <section className="full-page values-scene" id="core-values" aria-label="AP865 코어밸류 모션과 세 가지 가치의 정의">
        <ValueConvergence />
        <div className="definitions-scene" id="keywords" role="region" aria-label="AP865 코어밸류 정의">
          <div className="core-definitions">
            {keywords.map(item => <article key={item.keyword}><h2>{item.keyword}</h2><strong>{item.korean}</strong><p>{item.interpretation}</p></article>)}
          </div>
          <details className="source-principles"><summary>아름다움에 대한 열 가지 기준 · 원문과 연결 보기 <span>＋</span></summary><p className="grouping-note">모션은 각 기준의 중심 의미를 따라 한 그룹에 연결합니다. 세 코어밸류는 실제 브랜드 경험에서 서로 맞물려 작동합니다. 의학적 정확성·자연스러운 변화·의사의 책임과 신뢰는 High-end의 기반입니다.</p><ol className="value-list">
            {sourceValues.map(value => <li id={`value-${value.id}`} key={value.id}><span className="value-number">{value.id}</span><div><h3>{value.title}</h3><p>{value.english}</p><span className="value-destination">→ {keywords.find(item => item.sources.includes(value.id))?.keyword}</span></div></li>)}
          </ol></details>
        </div>
      </section>

      <section className="full-page positioning-scene" id="positioning" aria-label="Brand positioning">
        <img className="positioning-pattern" src={`${basePath}/images/silluette.svg`} alt="" aria-hidden="true" width="1920" height="1080" loading="lazy" decoding="async" />
        <PageLabel number="03" title="Brand Positioning" />
        <div className="positioning"><span>Brand positioning</span><p className="positioning-statement">Private Skin &amp;<br />Aging Care Concierge<span>with a High-end experience.</span></p><p className="positioning-korean">의학적 신뢰를 바탕으로, 한 사람의 피부와 나이 들어가는 과정까지 함께 돌보는 하이엔드 케어 컨시어지.</p></div>
        <div className="page-end"><span>세 가지 핵심 가치에서 브랜드의 시각 언어로.</span><a href="#color">키 컬러와 방향성 ↓</a></div>
      </section>

      <section className="full-page color-scene" id="color" aria-label="AP865 브랜드 컬러">
        <PageLabel number="04" title="Key Color & Direction" />
        <div className="palette">
          {palette.map(color => <article className={`color-swatch ${color.className}`} key={color.name}><div><h3>{color.name}</h3><span>{color.hex}</span></div><div><strong>{color.role}</strong><p>{color.note}</p></div></article>)}
        </div>
        <p className="color-note">AP865 오렌지, 샴페인 골드, 소프트 골드, 웜 아이보리와 딥 브라운으로 구성한 다섯 가지 브랜드 컬러입니다. 샴페인 골드의 금박·금속 표현은 실제 제작 샘플로 확인합니다.</p>
      </section>

      <section className="full-page typography-scene" id="typography" aria-labelledby="typography-title">
        <header className="page-label typography-heading">
          <span>05</span><h2 id="typography-title">Typography</h2><span>AP865 / Brand Guide</span>
        </header>
        <div className="type-specimen">
          <p className="type-specimen-label">AP865 Text V02 · Regular</p>
          <h3 className="type-specimen-name">AP865 CLINIC</h3>
          <p className="type-specimen-capitals" aria-label="영문 대문자 A부터 Z">ABCDEFGHIJKLMN<br />OPQRSTUVWXYZ</p>
          <p className="type-specimen-lowercase" aria-label="영문 소문자 a부터 z">abcdefghijklmno<br />pqrstuvwxyz</p>
          <p className="type-specimen-characters" aria-label="숫자와 기본 문장부호">0123456789 <span>/.,“”:!@#$%&amp;*()_+</span></p>
        </div>
        <div className="typography-footer">
          <div><h3>AP865 Text V02 Regular</h3><p>브랜드 영문 조판을 위한 서체입니다. 원래의 글자 비례를 유지하고 임의로 늘이거나 기울이지 않습니다.</p><p>영문·숫자·문장부호 지원 · 한글은 기본 한글 서체 사용 · 별도 Bold / Italic 없음</p></div>
          <div className="typography-download">
            <a className="brand-download-button" href={`${basePath}/downloads/AP865-Text-V02.zip`} download="AP865-Text-V02.zip">AP865 Text V02 다운로드 ↓</a><span>Regular · 설치용 TTF · 라이선스 포함</span>
          </div>
        </div>
      </section>

      <section className="full-page final-identity" id="identity" aria-labelledby="identity-title">
        <header className="page-label final-identity-heading">
          <span>06</span><h2 id="identity-title">Logo</h2><span>AP865 / Brand Guide</span>
        </header>
        <div className="final-identity-intro"><p>로고</p><span>Grid System</span></div>
        <div className="final-identity-grid">
          <figure>
            <img src={`${basePath}/identity/final/ap865-symbol-grid.png`} width="560" height="660" alt="최종 AP 심볼의 9X × 16X 비례 그리드. 심볼 높이의 16분의 1을 X로 정의하고 사방에 2X 여백을 확보합니다." loading="lazy" decoding="async" />
            <figcaption><h3>심볼 비례</h3><p>9X × 16X · X = 심볼 높이 ÷ 16</p></figcaption>
          </figure>
          <figure>
            <img src={`${basePath}/identity/final/ap865-lockup-grid.png`} width="710" height="705" alt="최종 로고의 가로형·세로형 조합과 정렬선. 각 조합의 심볼 높이를 기준으로 로고 전체 바깥에 최소 2X 여백을 표시합니다." loading="lazy" decoding="async" />
            <figcaption><h3>정렬과 최소 여백</h3><p>원본 조합의 간격을 유지하고, 로고 전체의 사방에 2X 이상 여백을 둡니다.</p></figcaption>
          </figure>
        </div>
        <div className="final-identity-footer">
          <p>그리드는 원본 비례를 확인하는 기준입니다. 획·곡선·자간은 변경하지 않고 전체를 같은 비율로 확대·축소합니다. 최소 여백 2X는 이번 가이드의 권장 적용 기준입니다.</p>
          <div className="final-identity-downloads">
            <a className="brand-download-button" href={`${basePath}/downloads/logo.ai`} download="logo.ai">로고 AI 다운로드 ↓</a>
            <a href={`${basePath}/identity/final/AP865-brand-guide.pdf`} target="_blank" rel="noopener noreferrer">브랜드 가이드 PDF ↗</a>
            <a href={`${basePath}/identity/final/ap865-grid-system.svg`} download>그리드 벡터 SVG ↓</a>
          </div>
        </div>
      </section>

      <section className="full-page final-key-visual" id="key-visual" aria-labelledby="key-visual-title">
        <header className="page-label">
          <span>07</span><h2 id="key-visual-title">Key Visual</h2>
        </header>
        <figure>
          <img src={`${basePath}/identity/final/ap865-stone-lobby-key-visual.jpg`} width="3840" height="2160" alt="곡선 벽과 간접조명의 로비에 스톤 질감 AP865 심볼과 투명 유리 연결부를 구성한 키비주얼" loading="lazy" decoding="async" />
        </figure>
      </section>

      <section className="full-page proposal-section proposal-catalog" id="proposals" aria-labelledby="proposals-title">
        <header className="proposal-section-title page-label">
          <span>08</span><h2 id="proposals-title">Etc.</h2><span>AP865 / Brand Foundation</span>
        </header>
        <LogoProposalGallery proposals={logoProposals} basePath={basePath} />
      </section>
      </SectionNavigator>
    </main>
  );
}
