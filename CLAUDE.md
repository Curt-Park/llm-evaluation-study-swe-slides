# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LLM 코딩 벤치마크 진화를 다루는 1시간 분량 발표자료. Slidev(마크다운 기반) 프레임워크로 GitHub Pages를 통해 배포.

## Tech Stack

- **Slidev** (`@slidev/cli`) — 마크다운 기반 슬라이드 프레임워크
- **Chart.js 4.4.7** — 데이터 차트 (Vue 컴포넌트로 래핑)
- **Vue 3** — 컴포넌트 시스템

## File Structure

- `slides.md` — 모든 슬라이드 콘텐츠 (`---`로 슬라이드 구분, frontmatter로 설정)
- `components/` — Chart.js를 래핑한 Vue 컴포넌트 (auto-register됨)
  - `ChartSEDistribution.vue` — SE 벤치마크 분포 (Doughnut)
  - `ChartHumanEval.vue` — HumanEval 성능 추이 (Line)
  - `ChartSWEVerified.vue` — SWE-bench Verified 리더보드 (Bar horizontal)
  - `ChartMultilingual.vue` — Python vs Multilingual (Bar grouped)
  - `ChartContamination.vue` — 오염도 그래디언트 (Bar grouped)
  - `ChartSWEPro.vue` — Public vs Private (Bar grouped)
- `styles/index.css` — 커스텀 스타일 (다크 테마, CSS 변수, 컴포넌트 스타일)
- `.github/workflows/deploy.yml` — GitHub Pages 배포 워크플로우

## Architecture

차트 컴포넌트는 `components/` 디렉토리에 두면 Slidev가 자동으로 등록. `slides.md`에서 `<ChartHumanEval />` 형태로 사용. 각 컴포넌트는 Vue의 `onMounted()`에서 Chart.js 인스턴스를 생성.

## Local Development

```bash
npm install
npm run dev   # localhost:3030에서 실행
```

브라우저에서 `http://localhost:3030` 접속.

### 내장 단축키
- `O` — Overview 모드 (슬라이드 그리드)
- `G` — Go-to (페이지 번호 입력)
- `S` — 발표자 모드
- `F` — 전체화면

## Conventions

- 슬라이드 추가: `slides.md`에 `---` 구분자로 새 슬라이드 추가
- 차트 추가: `components/`에 새 Vue 컴포넌트 생성 후 `slides.md`에서 사용
- CSS 변수: `styles/index.css`의 `:root`에서 색상 팔레트 관리
- 발표 언어: 한국어
- 섹션 구분 슬라이드: `layout: section` frontmatter 사용
