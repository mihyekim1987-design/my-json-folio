# 배포 가이드

이 문서는 My JSON Portfolio 프로젝트의 Github Actions를 통한 자동 배포 설정에 대한 가이드입니다.

## 🚀 배포 설정 완료 사항

### 1. Github Actions 워크플로우 설정
- **파일 위치**: `.github/workflows/deploy.yml`
- **배포 조건**: main 브랜치에 push 시 자동 실행
- **빌드 환경**: Ubuntu Latest, Node.js 18

### 2. Vite 설정 최적화
- **파일 위치**: `vite.config.ts`
- **Base 경로**: 프로덕션 모드에서 `/my-json-folio/`로 설정
- **빌드 최적화**: esbuild 사용, 코드 스플리팅 적용

### 3. 프로젝트 설정 업데이트
- **package.json**: 프로젝트명 및 홈페이지 URL 설정
- **README.md**: 배포 정보 및 사용법 문서화
- **.gitignore**: 배포에 불필요한 파일 제외 설정

## 📋 배포 전 체크리스트

### Github 저장소 설정
1. **Github Pages 활성화**
   - 저장소 Settings → Pages
   - Source: GitHub Actions 선택
   - Save 버튼 클릭

2. **Actions 권한 확인**
   - 저장소 Settings → Actions → General
   - "Allow GitHub Actions to create and approve pull requests" 체크

### 배포 URL 설정
1. **vite.config.ts**에서 base 경로 확인:
   ```typescript
   base: mode === 'production' ? '/my-json-folio/' : '/',
   ```

2. **package.json**에서 homepage URL 업데이트:
   ```json
   "homepage": "https://[your-username].github.io/my-json-folio"
   ```

## 🔧 배포 과정

### 자동 배포 (권장)
1. 코드 변경 후 main 브랜치에 push
2. Github Actions가 자동으로 실행됨
3. 빌드 성공 시 Github Pages에 자동 배포

### 수동 배포
1. 로컬에서 빌드 테스트:
   ```bash
   npm run build
   ```

2. 빌드 결과 확인:
   ```bash
   npm run preview
   ```

3. main 브랜치에 push하여 자동 배포 실행

## 🐛 문제 해결

### 빌드 실패 시
1. **의존성 문제**: `npm ci` 실행
2. **Node.js 버전**: Node.js 18 이상 사용
3. **메모리 부족**: Github Actions에서 더 큰 runner 사용 고려

### 배포 후 페이지가 로드되지 않는 경우
1. **Base 경로 확인**: vite.config.ts의 base 설정
2. **홈페이지 URL 확인**: package.json의 homepage 설정
3. **Github Pages 설정 확인**: 저장소 Settings → Pages

### 404 에러 발생 시
- React Router의 History API 문제일 수 있음
- Github Pages에서 SPA 라우팅을 위해 추가 설정 필요할 수 있음

## 📊 배포 모니터링

### Github Actions 확인
- 저장소의 Actions 탭에서 워크플로우 실행 상태 확인
- 빌드 로그를 통해 오류 디버깅 가능

### 배포 상태 확인
- 배포 완료 후 설정된 URL로 접속하여 정상 작동 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인

## 🔄 배포 업데이트

### 정기 업데이트
- 코드 변경 시마다 자동 배포됨
- 특별한 배포 스크립트 실행 불필요

### 긴급 배포
- main 브랜치에 직접 push하여 즉시 배포
- 또는 Pull Request를 통한 코드 리뷰 후 배포

## 📝 참고사항

- 배포 시간: 일반적으로 2-5분 소요
- 배포 URL: `https://[your-username].github.io/my-json-folio/`
- 커스텀 도메인 연결 가능 (Github Pages 설정에서)
