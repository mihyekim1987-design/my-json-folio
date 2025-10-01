# My JSON Portfolio

개인 웹 포트폴리오 프로젝트입니다. React, TypeScript, Vite를 기반으로 제작되었으며, Github Actions를 통해 자동 배포됩니다.

## 🚀 배포 정보

- **배포 URL**: https://[your-username].github.io/my-json-folio/
- **배포 방식**: Github Actions + Github Pages
- **자동 배포**: main 브랜치에 push 시 자동으로 배포됩니다.

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Query
- **Animation**: Framer Motion

## 📦 설치 및 실행

### 로컬 개발 환경 설정

```bash
# 1. 저장소 클론
git clone https://github.com/[your-username]/my-json-folio.git

# 2. 프로젝트 디렉토리로 이동
cd my-json-folio

# 3. 의존성 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

### 사용 가능한 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run preview      # 빌드된 앱 미리보기
npm run lint         # ESLint 실행
```

## 🔧 배포 설정

이 프로젝트는 Github Actions를 통해 자동 배포됩니다:

1. **워크플로우 파일**: `.github/workflows/deploy.yml`
2. **배포 조건**: main 브랜치에 push 시 자동 실행
3. **빌드 과정**: 
   - Node.js 18 환경에서 빌드
   - npm ci로 의존성 설치
   - npm run build로 프로덕션 빌드
   - Github Pages에 자동 배포

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── admin/          # 관리자 페이지 컴포넌트
│   ├── sections/       # 섹션별 컴포넌트
│   └── ui/             # shadcn/ui 컴포넌트
├── hooks/              # 커스텀 훅
├── lib/                # 유틸리티 함수
├── pages/              # 페이지 컴포넌트
└── main.tsx            # 애플리케이션 진입점

public/
└── data/               # JSON 데이터 파일
    ├── about.json      # 자기소개 정보
    ├── awards.json     # 수상 내역
    ├── experience.json # 경력 정보
    ├── projects.json   # 프로젝트 정보
    └── skills.json     # 기술 스택 정보
```

## 🎯 주요 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **다크/라이트 모드**: 테마 전환 기능
- **관리자 페이지**: JSON 데이터 직접 편집 가능
- **SEO 최적화**: 메타 태그 및 구조화된 데이터
- **성능 최적화**: 코드 스플리팅 및 지연 로딩

## 📝 커밋 규칙

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `chore`: 빌드 프로세스 또는 보조 도구 변경

커밋 메시지는 50자 이내의 한글 요약으로 작성합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: 새로운 기능 추가'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
