# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LLM 코딩 벤치마크 진화를 다루는 1시간 분량 발표자료. Reveal.js 기반 정적 웹페이지로 GitHub Pages를 통해 배포.

## Tech Stack

- **Reveal.js 5.1.0** (CDN) — 슬라이드 프레임워크
- **Chart.js 4.4.7** (CDN) — 데이터 차트
- **빌드 도구 없음** — 순수 정적 HTML/CSS/JS, `index.html`을 열면 바로 동작

## File Structure

- `index.html` — 모든 슬라이드 콘텐츠 (Reveal.js 섹션들)
- `js/charts.js` — Chart.js 차트 정의. `initChartsOnSlide()`로 슬라이드 진입 시 lazy init
- `css/custom.css` — 커스텀 스타일 (다크 테마, CSS 변수는 `:root`에 정의)

## Architecture

차트는 lazy initialization 패턴을 사용: `chartInitializers` 객체에 canvas ID를 키로 등록하고, Reveal.js의 `slidechanged` 이벤트에서 현재 슬라이드의 캔버스만 초기화. 이미 생성된 차트는 `chartInstances`에 캐싱하여 중복 생성 방지.

## Local Development

```bash
# 로컬 서버 실행 (아무 정적 서버)
python3 -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 접속. 발표자 모드는 `S` 키.

## Conventions

- 슬라이드 추가: `index.html`에 `<section>` 추가
- 차트 추가: `js/charts.js`의 `chartInitializers`에 canvas ID로 등록
- CSS 변수: `css/custom.css`의 `:root`에서 색상 팔레트 관리
- 발표 언어: 한국어
