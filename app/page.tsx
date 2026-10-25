import ValueConvergence from './ValueConvergence';
import LogoProposalGallery from './LogoProposalGallery';
import ApplicationGallery from './ApplicationGallery';
import SectionNavigator from './SectionNavigator';
import { sourceValues, keywords, palette, logoProposals } from './foundation';

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <div className="experience-section-label"><span>{number} / {title}</span><span>AP865 CLINIC</span></div>;
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return <main id="top" className="experience-page">
    <a className="skip-link" href="#positioning">본문으로 건너뛰기</a>
    <SectionNavigator>
      <section id="intro" className="experience-hero" aria-labelledby="cover-title">
        <img className="experience-hero-image" src={`${basePath}/identity/final/ap865-stone-lobby-key-visual.jpg`} width="3840" height="2160" alt="석재와 빛으로 표현한 AP865 심볼과 프라이빗 로비" fetchPriority="high" />
        <div className="experience-hero-content">
          <div className="experience-hero-signature">
            <h1 id="cover-title"><img className="experience-hero-logo" src={`${basePath}/identity/final/ap865-vertical.svg`} width="360.198486328125" height="582.6661376953125" alt="AP865 CLINIC" /></h1>
            <p className="experience-hero-subtitle">브랜딩웍스</p>
          </div>
          <a className="experience-hero-scroll" href="#positioning">Overview <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="positioning" className="experience-overview" aria-labelledby="story-title">
        <img className="experience-overview-image" src={`${basePath}/images/ap865-concierge-hero.png`} width="1672" height="941" alt="따뜻한 석재와 오렌지 좌석으로 구성한 AP865의 공간 무드" loading="lazy" decoding="async" />
        <SectionLabel number="01" title="Overview" />
        <div className="experience-overview-content">
          <h2 id="story-title">프라이빗 케어는,<br />공간에서 시작됩니다.</h2>
          <div className="experience-overview-copy">
            <p>AP865의 로고 심볼은 건물의 형태와 수직적 리듬을 모티프로 구성되었습니다. 그 안에는 한 사람을 위한 배려가 공간에서부터 시작된다는 우리의 믿음이 담겨 있습니다.</p>
            <p>공간을 마주하는 첫 순간부터 머무는 모든 시간까지. 철저한 프라이버시와 세심한 배려로 완성하는 프라이빗 케어, 이것이 AP865의 차이입니다.</p>
          </div>
        </div>
        <p className="experience-overview-signoff">Considered space. Private care.</p>
      </section>

      <section id="core-values" className="experience-values experience-section" aria-labelledby="values-title">
        <SectionLabel number="02" title="Core Values" />
        <div className="experience-heading"><h2 id="values-title">The way<br />we care.</h2><p>브랜드의 모든 접점에서<br />지켜야 할 세 가지 기준.</p></div>
        <ValueConvergence />
        <div id="keywords" className="experience-values-copy">
          {keywords.map((item, index) => <article key={item.keyword}><span>0{index + 1} / {item.keyword}</span><h3>{item.korean}</h3><p>{item.interpretation}</p></article>)}
        </div>
        <details className="experience-principles"><summary>아름다움에 대한 열 가지 기준 <span aria-hidden="true">＋</span></summary><ol>{sourceValues.map(value => <li id={`value-${value.id}`} key={value.id}><span>{value.id}</span><div><h3>{value.title}</h3><p>{value.english}</p></div></li>)}</ol></details>
      </section>

      <section id="identity" className="experience-identity" aria-labelledby="identity-title">
        <div className="experience-section"><SectionLabel number="03" title="Visual Identity" /><div className="experience-heading"><h2 id="identity-title">Distinctly<br /><i>AP865.</i></h2><p>공간의 수직적 리듬과 정교한 비례.<br />AP865를 기억하게 하는 하나의 인장.</p></div></div>
        <div className="experience-logo-stage"><figure><img src={`${basePath}/identity/final/ap865-symbol.svg`} alt="AP865 심볼" width="1355" height="2409" loading="lazy" /><figcaption>01 / Symbol</figcaption></figure><figure><img src={`${basePath}/identity/final/ap865-horizontal.svg`} alt="AP865 CLINIC 가로형 로고" loading="lazy" /><figcaption>02 / Signature</figcaption></figure></div>
        <details className="experience-grid-details"><summary>비례와 사용 규정 <span aria-hidden="true">＋</span></summary><div className="experience-grid-pair"><figure><img src={`${basePath}/identity/final/ap865-symbol-grid.png`} width="560" height="660" alt="AP 심볼 9X × 16X 비례와 사방 2X 안전 여백" loading="lazy" /><figcaption>9X × 16X · X = 심볼 높이 ÷ 16</figcaption></figure><figure><img src={`${basePath}/identity/final/ap865-lockup-grid.png`} width="710" height="705" alt="AP865 가로형·세로형 조합과 2X 여백" loading="lazy" /><figcaption>원본 조합의 간격 유지 · 최소 2X 여백 권장</figcaption></figure></div><p>획·곡선·자간을 변경하지 않고 전체를 같은 비율로 확대·축소합니다.</p><div className="experience-text-links"><a href={`${basePath}/identity/final/AP865-brand-guide.pdf`} target="_blank" rel="noopener noreferrer">브랜드 가이드 PDF ↗</a><a href={`${basePath}/identity/final/ap865-grid-system.svg`} download>그리드 SVG ↓</a></div></details>
      </section>

      <section id="color" className="experience-colors" aria-labelledby="colors-title">
        <div className="experience-section"><SectionLabel number="04" title="Key Colors" /><div className="experience-heading"><h2 id="colors-title">Warmth,<br />with depth.</h2><p>선명한 오렌지, 깊은 브라운.<br />차분한 두 가지 뉴트럴이 만드는 균형.</p></div></div>
        <div className="experience-palette">{palette.map(color => <article key={color.pantone} style={{ backgroundColor: color.hex, color: color.ink }}><div><span>PANTONE</span><h3>{color.pantone}</h3></div><div><p>HEX {color.hex}</p><p className="experience-cmyk">{color.cmyk}</p></div></article>)}</div>
        <p className="experience-color-note">화면 색상은 HEX 기준입니다. 인쇄 시 PANTONE·CMYK 표기값을 참고하고, 용지와 제작 방식에 따른 실제 색상은 교정지로 확인합니다.</p>
      </section>

      <section id="typography" className="experience-typography experience-section" aria-labelledby="type-title">
        <SectionLabel number="05" title="Typography" /><div className="experience-heading"><h2 id="type-title">Our voice,<br /><i>in every letter.</i></h2><p>AP865 Text V02<br />Regular / Brand Typeface</p></div>
        <div className="experience-type-display" aria-label="AP865 CLINIC 브랜드 서체">AP865<br /><span>CLINIC</span></div>
        <div className="experience-type-details"><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 /.,“”:!@#$%&*()+</p><div><h3>AP865 Text V02 · Regular</h3><p>브랜드 영문 조판을 위한 전용 서체입니다. 글자의 비례를 유지하고 임의로 늘이거나 기울이지 않습니다.</p><small>영문·숫자·문장부호 지원 · 한글은 기본 한글 서체 사용<br />별도 Bold / Italic 없음</small></div></div>
      </section>

      <section id="key-visual" className="experience-keyvisual" aria-labelledby="visual-title"><img src={`${basePath}/identity/final/ap865-stone-lobby-key-visual.jpg`} width="3840" height="2160" alt="스톤 질감과 투명 유리 연결부로 구현한 AP865 심볼 키비주얼" loading="lazy" decoding="async" /><div><span className="experience-kicker">06 / Key Visual</span><h2 id="visual-title">An identity<br />you can feel.</h2></div></section>

      <section id="applications" className="experience-applications experience-section" aria-labelledby="applications-title"><SectionLabel number="07" title="Applications" /><div className="experience-heading"><h2 id="applications-title">In every<br /><i>little detail.</i></h2><p>손에 닿는 종이부터 머무는 순간까지.<br />이미지를 선택해 시안과 아카이브를 살펴보세요.</p></div><ApplicationGallery basePath={basePath} /></section>

      <section id="proposals" className="experience-archive experience-section" aria-labelledby="archive-title"><SectionLabel number="08" title="Design Archive" /><div className="experience-heading"><h2 id="archive-title">The explorations.</h2><p>하나의 아이덴티티에 이르기까지.<br />로고 제안과 적용 사례를 기록합니다.</p></div><LogoProposalGallery proposals={logoProposals} basePath={basePath} /></section>
      <footer className="experience-footer"><a href="#intro" className="experience-footer-wordmark">AP865 CLINIC</a><div><span>Private Skin & Aging Care Concierge</span><a href="#intro">Back to top ↑</a></div></footer>
    </SectionNavigator>
  </main>;
}
