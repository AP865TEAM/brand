import ValueConvergence from './ValueConvergence';
import LogoProposalGallery from './LogoProposalGallery';
import ApplicationGallery from './ApplicationGallery';
import SectionNavigator from './SectionNavigator';
import { brandSlogan, brandDefinition, sourceValues, keywords, palette, logoProposals } from './foundation';
import { sectionNumber, type SectionId } from './section-menu';

function SectionLabel({ id }: { id: SectionId }) {
  return <div className="experience-section-label"><span>{sectionNumber(id)}</span><span>AP865 CLINIC</span></div>;
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
          </div>
          <a className="experience-hero-scroll" href="#positioning" aria-label="다음 섹션으로 이동"><span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="positioning" className="experience-overview" aria-labelledby="story-title">
        <div className="experience-overview-sources">
          <img className="overview-source-building" src={`${basePath}/overview/ap865-building.webp`} width="1672" height="941" alt="수직 파사드와 조명으로 표현한 AP865 건물 외관 이미지" loading="lazy" decoding="async" />
          <img className="overview-source-plan" src={`${basePath}/overview/space-planning.jpg`} width="1600" height="1066" alt="AP865 공간 설계 도면을 함께 검토하는 현장 스케치" loading="lazy" decoding="async" />
          <img className="overview-source-material" src={`${basePath}/overview/material-study.jpg`} width="1600" height="1066" alt="AP865 인테리어를 위한 석재와 목재 소재 선정 스케치" loading="lazy" decoding="async" />
          <img className="overview-source-reception" src={`${basePath}/overview/lemoir-reception.jpg`} width="1179" height="732" alt="이전 르모아의원의 리셉션 공간" loading="lazy" decoding="async" />
          <img className="overview-source-care" src={`${basePath}/overview/lemoir-private-room.jpg`} width="986" height="1440" alt="이전 르모아의원의 프라이빗 케어 룸" loading="lazy" decoding="async" />
          <img className="overview-source-facade" src={`${basePath}/overview/ap865-facade-study.jpg`} width="1400" height="788" alt="AP865 건물의 수직 파사드를 표현한 건축 모형 이미지" loading="lazy" decoding="async" />
          <img className="overview-source-finish" src={`${basePath}/overview/material-proposal.jpg`} width="1400" height="933" alt="인테리어 마감재와 가구 소재를 검토하는 디자인 과정" loading="lazy" decoding="async" />
          <img className="overview-source-consultation" src={`${basePath}/overview/lemoir-consultation.jpg`} width="972" height="1400" alt="빛이 드는 이전 르모아의원 상담 공간" loading="lazy" decoding="async" />
          <img className="overview-source-wash" src={`${basePath}/overview/lemoir-wash-detail.jpg`} width="968" height="1400" alt="이전 르모아의원의 세심한 세면 공간 디테일" loading="lazy" decoding="async" />
          <img className="overview-source-daylight" src={`${basePath}/overview/lemoir-daylight.jpg`} width="1300" height="960" alt="자연광으로 채운 이전 르모아의원 공간" loading="lazy" decoding="async" />
          <img className="overview-source-chair" src={`${basePath}/overview/lemoir-care-chair.jpg`} width="1300" height="960" alt="이전 르모아의원의 독립된 케어 체어" loading="lazy" decoding="async" />
          <img className="overview-source-symbol overview-source-drawing" src={`${basePath}/identity/final/ap865-symbol-grid.png`} width="560" height="660" alt="건축적 비례를 담은 AP865 심볼 설계 그리드" loading="lazy" decoding="async" />
          <img className="overview-source-signature overview-source-drawing" src={`${basePath}/identity/final/ap865-lockup-grid.png`} width="710" height="705" alt="AP865 로고 조합과 여백을 연구한 설계 소스" loading="lazy" decoding="async" />
        </div>
        <SectionLabel id="positioning" />
        <div className="experience-overview-content">
          <h2 id="story-title">우리의 차이점은<br />공간에서부터 시작됩니다.</h2>
          <div className="experience-overview-copy">
            <p>공간을 마주하는 첫 순간의 중요성을 우리는 알고 있습니다.<br />세심한 배려를 담아 하나하나 쌓아올린 공간.</p>
            <p>철저한 프라이버시와 세심한 배려로 완성하는 프라이빗 케어,<br />이것이 AP865의 차이입니다.</p>
          </div>
        </div>
        <p className="experience-overview-signoff" lang="en">{brandSlogan.text}</p>
      </section>

      <section id="core-values" className="experience-values experience-section" aria-label="핵심 가치">
        <SectionLabel id="core-values" />
        <div className="experience-heading"><p>브랜드의 모든 접점에서<br />지켜야 할 세 가지 기준.</p></div>
        <ValueConvergence />
        <div id="keywords" className="experience-values-copy">
          {keywords.map((item, index) => <article key={item.keyword}><span>0{index + 1} / {item.keyword}</span><h3>{item.korean}</h3><p>{item.interpretation}</p></article>)}
        </div>
        <details className="experience-principles"><summary>아름다움에 대한 열 가지 기준 <span aria-hidden="true">＋</span></summary><ol>{sourceValues.map(value => <li id={`value-${value.id}`} key={value.id}><span>{value.id}</span><div><h3>{value.title}</h3><p>{value.english}</p></div></li>)}</ol></details>
      </section>

      <section id="brand-definition" className="experience-definition experience-section" aria-labelledby="definition-title">
        <SectionLabel id="brand-definition" />
        <div className="experience-definition-stage">
          <p className="experience-definition-eyebrow">AP865의 브랜드 정의</p>
          <h2 id="definition-title" lang="en" aria-label={brandDefinition.text}>{brandDefinition.lines.map(line => <span key={line}>{line}</span>)}</h2>
          <div className="experience-definition-copy">
            <p className="experience-definition-korean">{brandDefinition.korean}</p>
            <p>{brandDefinition.description}</p>
          </div>
        </div>
      </section>

      <section id="slogan" className="experience-slogan" aria-labelledby="slogan-title">
        <img className="experience-slogan-image" src={`${basePath}/images/ap865-slogan-space.jpg`} width="1672" height="941" alt="은은한 빛과 따뜻한 소재로 구성된 AP865 프라이빗 공간 컨셉" loading="lazy" decoding="async" />
        <SectionLabel id="slogan" />
        <div className="experience-slogan-stage">
          <h2 id="slogan-title" lang="en" aria-label={brandSlogan.text}>{brandSlogan.lines.map(line => <span key={line}>{line}</span>)}</h2>
          <div className="experience-slogan-story">
            <div className="experience-slogan-background">
              <h3>슬로건에 담은 생각</h3>
              {brandSlogan.background.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section id="color" className="experience-colors" aria-label="키 컬러">
        <div className="experience-section"><SectionLabel id="color" /><div className="experience-heading"><p>선명한 오렌지, 깊은 브라운.<br />차분한 두 가지 뉴트럴이 만드는 균형.</p></div></div>
        <div className="experience-palette">{palette.map(color => <article key={color.pantone} style={{ backgroundColor: color.hex, color: color.ink }}><div><span>PANTONE</span><h3>{color.pantone}</h3></div><div><p>HEX {color.hex}</p><p className="experience-cmyk">{color.cmyk}</p></div></article>)}</div>
        <p className="experience-color-note">화면 색상은 HEX 기준입니다. 인쇄 시 PANTONE·CMYK 표기값을 참고하고, 용지와 제작 방식에 따른 실제 색상은 교정지로 확인합니다.</p>
      </section>

      <section id="identity" className="experience-identity" aria-label="로고">
        <div className="experience-section"><SectionLabel id="identity" /><div className="experience-heading"><p>공간의 수직적 리듬과 정교한 비례.<br />AP865를 기억하게 하는 하나의 인장.</p></div></div>
        <div className="experience-logo-stage"><figure><img src={`${basePath}/identity/final/ap865-symbol.svg`} alt="AP865 심볼" width="1355" height="2409" loading="lazy" /><figcaption>01 / Symbol</figcaption></figure><figure><img src={`${basePath}/identity/final/ap865-horizontal.svg`} alt="AP865 CLINIC 가로형 로고" loading="lazy" /><figcaption>02 / Signature</figcaption></figure></div>
        <details className="experience-grid-details"><summary>비례와 사용 규정 <span aria-hidden="true">＋</span></summary><div className="experience-grid-pair"><figure><img src={`${basePath}/identity/final/ap865-symbol-grid.png`} width="560" height="660" alt="AP 심볼 9X × 16X 비례와 사방 2X 안전 여백" loading="lazy" /><figcaption>9X × 16X · X = 심볼 높이 ÷ 16</figcaption></figure><figure><img src={`${basePath}/identity/final/ap865-lockup-grid.png`} width="710" height="705" alt="AP865 가로형·세로형 조합과 2X 여백" loading="lazy" /><figcaption>원본 조합의 간격 유지 · 최소 2X 여백 권장</figcaption></figure></div><p>획·곡선·자간을 변경하지 않고 전체를 같은 비율로 확대·축소합니다.</p><div className="experience-text-links"><a href={`${basePath}/identity/final/AP865-brand-guide.pdf`} target="_blank" rel="noopener noreferrer">브랜드 가이드 PDF ↗</a><a href={`${basePath}/identity/final/ap865-grid-system.svg`} download>그리드 SVG ↓</a></div></details>
      </section>

      <section id="typography" className="experience-typography experience-section" aria-label="브랜드 서체">
        <SectionLabel id="typography" /><div className="experience-heading"><p>AP865 Text V02<br />Regular / Brand Typeface</p></div>
        <div className="experience-type-display" aria-label="AP865 CLINIC 브랜드 서체">AP865<br /><span>CLINIC</span></div>
        <div className="experience-type-details"><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 /.,“”:!@#$%&*()+</p><div><h3>AP865 Text V02 · Regular</h3><p>브랜드 영문 조판을 위한 전용 서체입니다. 글자의 비례를 유지하고 임의로 늘이거나 기울이지 않습니다.</p><small>영문·숫자·문장부호 지원 · 한글은 기본 한글 서체 사용<br />별도 Bold / Italic 없음</small></div></div>
      </section>

      <section id="key-visual" className="experience-keyvisual" aria-label="키 비주얼"><img src={`${basePath}/identity/final/ap865-stone-lobby-key-visual.jpg`} width="3840" height="2160" alt="스톤 질감과 투명 유리 연결부로 구현한 AP865 심볼 키비주얼" loading="lazy" decoding="async" /><div><span className="experience-kicker">{sectionNumber('key-visual')}</span></div></section>

      <section id="applications" className="experience-applications" aria-label="어플리케이션"><div className="experience-section"><SectionLabel id="applications" /><div className="experience-heading"><p>손에 닿는 종이부터 머무는 순간까지.<br />세심한 배려를 담은 AP865의 일상.</p></div></div><ApplicationGallery basePath={basePath} /></section>

      <section id="proposals" className="experience-archive experience-section" aria-label="디자인 아카이브"><SectionLabel id="proposals" /><div className="experience-heading"><p>하나의 아이덴티티에 이르기까지.<br />로고 제안과 적용 사례를 기록합니다.</p></div><LogoProposalGallery proposals={logoProposals} basePath={basePath} /></section>
      <footer className="experience-footer"><a href="#intro" className="experience-footer-wordmark">AP865 CLINIC</a><div><span>{brandDefinition.text}</span><a href="#intro">Back to top ↑</a></div></footer>
    </SectionNavigator>
  </main>;
}
