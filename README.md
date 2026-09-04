# AP865 Brand Archive

AP865의 브랜드 방향을 공유하고, BI 제작 과정과 의사결정 근거를 축적하는 단일 페이지 워크룸입니다.

## 콘텐츠 수정

대부분의 문구와 반복 항목은 `app/content.ts`에서 수정합니다.

- `brand`: 페이지 제목, 버전, 소개 문구
- `navigation`: 상단 섹션 메뉴
- `strategy`: 브랜드 역할, 대상, 약속, 지향 감정
- `principles`: 브랜드 원칙
- `valueTranslations`: 코어 밸류의 경험·디자인 번역 기준
- `logoCriteria`: 로고 시안 평가 기준
- `logoCandidates`: 로고 후보명, 설명, 규격, SVG 경로
- `logoUsageRules`: 로고 시스템 공통 사용 규칙
- `colors`: 컬러 이름과 HEX 값
- `voicePairs`: 보이스 가이드 예시
- `archiveSlots`: 의사결정 단계와 진행 상태

레이아웃 구조는 `app/page.tsx`, 스타일과 반응형 규칙은 `app/globals.css`에 있습니다.

## 이미지 교체

첫 화면 이미지는 `public/images/ap865-concierge-hero.png`입니다. 같은 파일명으로 교체하면 별도 코드 수정 없이 반영됩니다.

로고 작업 파일은 `public/identity`에 있습니다.

- `ribbon-monogram.svg`: 리본 모노그램
- `serif-wordmark.svg`: 세리프 워드마크
- `condensed-wordmark.svg`: 세로형 보조 워드마크
- `numeral-sign.svg`: 공간용 숫자 모티프
- `logo-exploration-board.png`: Illustrator 탐색 보드 미리보기

새 로고를 추가할 때는 SVG를 이 폴더에 넣고 `app/content.ts`의 `logoCandidates`에 항목 하나만 추가하면 같은 규격 가이드 구조로 표시됩니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

## 배포 전 확인

```bash
pnpm build
```

## 공개 주소

현재 공유용 공개 사이트는 아래 주소입니다.

`https://ap865-brand-archive.design785378.chatgpt.site/`

## GitHub Pages 선택 사항

저장소에는 GitHub Pages용 워크플로도 포함되어 있습니다. GitHub Pages를 별도로 사용할 경우 아래 설정이 필요합니다.

1. GitHub Desktop에서 이 폴더를 기존 로컬 저장소로 추가합니다.
2. **Publish repository**를 누릅니다.
3. 공개 저장소로 만들려면 **Keep this code private**를 해제합니다.
4. GitHub의 저장소 **Settings → Pages → Source**에서 **GitHub Actions**를 선택합니다.

첫 배포 후 사이트 주소는 `https://<계정명>.github.io/<저장소명>/` 형식입니다.
