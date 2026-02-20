# LLM 코딩 벤치마크: 진화의 궤적과 남은 과제

Slidev 기반 발표자료. HumanEval → SWE-bench → 다국어 확장 → 오염 문제까지 LLM 코딩 벤치마크의 계보를 다룹니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3030 접속.

## 단축키

| 키 | 기능 |
|----|------|
| `O` | Overview — 전체 슬라이드 그리드 |
| `G` | Go-to — 페이지 번호로 이동 |
| `S` | 발표자 모드 (노트 + 타이머) |
| `F` | 전체화면 |
| `←` / `→` | 이전 / 다음 슬라이드 |

## 빌드

```bash
npm run build   # dist/ 폴더에 정적 파일 생성
npm run export  # PDF 내보내기
```

## 파일 구조

```
slides.md          # 슬라이드 콘텐츠 (여기를 편집)
components/        # Chart.js Vue 컴포넌트
styles/index.css   # 커스텀 스타일
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.
