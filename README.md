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
- `colors`: 컬러 이름과 HEX 값
- `voicePairs`: 보이스 가이드 예시
- `archiveSlots`: 의사결정 단계와 진행 상태

레이아웃 구조는 `app/page.tsx`, 스타일과 반응형 규칙은 `app/globals.css`에 있습니다.

## 이미지 교체

첫 화면 이미지는 `public/images/ap865-concierge-hero.png`입니다. 같은 파일명으로 교체하면 별도 코드 수정 없이 반영됩니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

## 배포 전 확인

```bash
pnpm build
```

## GitHub Pages 공개

이 저장소는 `main` 브랜치에 변경사항이 올라오면 GitHub Pages로 자동 배포됩니다.

1. GitHub Desktop에서 이 폴더를 기존 로컬 저장소로 추가합니다.
2. **Publish repository**를 누릅니다.
3. 공개 저장소로 만들려면 **Keep this code private**를 해제합니다.
4. GitHub의 저장소 **Settings → Pages → Source**에서 **GitHub Actions**를 선택합니다.

첫 배포 후 사이트 주소는 `https://<계정명>.github.io/<저장소명>/` 형식입니다.
