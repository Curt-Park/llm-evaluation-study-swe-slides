---
theme: default
colorSchema: dark
title: 'LLM 코딩 벤치마크: 진화의 궤적과 남은 과제'
info: Curt Park
transition: slide-left
fonts:
  sans: Pretendard
  mono: JetBrains Mono
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
---

# LLM 코딩 벤치마크
## 진화의 궤적과 남은 과제

<p class="title-meta">Curt Park</p>

<!--
1시간 발표. LLM 코딩 벤치마크가 어떻게 진화해왔고, 어떤 한계가 남아있는지 논문 데이터를 기반으로 살펴봅니다.
-->

---

# Agenda

<ol class="agenda-list">
  <li>SE 벤치마크 조감도</li>
  <li>출발점: HumanEval</li>
  <li>현실 세계로: SWE-bench</li>
  <li>Python을 넘어서: 다국어 확장</li>
  <li>불편한 진실: 오염 문제</li>
  <li>오염 대응 전략</li>
  <li>남은 과제와 전망</li>
</ol>

<!--
총 7개 섹션으로 구성. 벤치마크의 계보를 시간순으로 따라가며 각 단계의 동기와 한계를 분석합니다.
-->

---

# 왜 코딩 벤치마크인가?

- LLM의 가장 활발한 응용 분야 = **코딩**
- "측정할 수 없으면 개선할 수 없다"
- 벤치마크 점수가 모델 선택과 투자를 결정
- 그러나... 벤치마크 점수 = 실제 능력?

<!--
벤치마크가 단순한 학술 도구를 넘어 산업에 미치는 영향이 큽니다. 하지만 점수의 의미를 정확히 이해하려면 벤치마크의 설계와 한계를 알아야 합니다.
-->

---

# SE 벤치마크 전체 조감도

<p class="chart-note">소프트웨어 엔지니어링 벤치마크 291개 분석 (2025)</p>

<ChartSEDistribution />

<p class="source">Source: Hou et al., 2025</p>

<!--
SE 전체 291개 벤치마크 중 코딩이 43%로 가장 많습니다. 요구사항 공학, 설계, 프로젝트 관리 등은 10% 미만으로, 정량적 자동 평가가 어려운 영역입니다.
-->

---
layout: section
---

# 출발점: HumanEval

<p class="section-subtitle">체계적 코딩 벤치마크의 시작 (2021)</p>

---

# HumanEval이란?

<div class="grid grid-cols-2 gap-8">
<div>

### 구조
- **164**개 Python 문제
- 함수 시그니처 + 독스트링
- 문제당 평균 **7.7**개 유닛 테스트
- 자기완결적 함수 단위

</div>
<div>

### 평가 메트릭: pass@k
- k개 코드 생성 후
- 하나라도 모든 테스트 통과하면 성공
- pass@1: 실용적 지표
- pass@100: 잠재력 지표

</div>
</div>

<!--
OpenAI가 Codex 논문과 함께 공개. 처음으로 코드 생성 능력을 체계적으로 측정할 수 있는 프레임워크를 제시했습니다.
-->

---

# HumanEval 성능 추이

<p class="chart-note">pass@1 (%) — 4년간의 진화</p>

<ChartHumanEval />

<!--
2021년 Codex 28.8%에서 시작해 불과 4년 만에 96.3%까지 도달. 벤치마크가 사실상 포화 상태에 이르렀습니다.
-->

---

# 벤치마크 포화의 증거

<div class="highlight-box warning">

### 변형 태스크에서의 성능 하락
Top 모델들이 HumanEval 원본에서는 90%+ 달성하지만,
변형된 태스크에서는 **<span class="red">19.6 ~ 47.7%p</span>** 하락

</div>

- 구성적 일반화(compositional generalization) 부족
- 문제를 "풀었다" vs 문제를 "외웠다"의 차이
- 벤치마크 점수의 과대평가 가능성

<!--
단순히 높은 점수를 받는 것과 실제로 코딩 능력이 있는 것은 다릅니다. 변형 실험이 이를 잘 보여줍니다.
-->

---

# HumanEval의 한계

| 한계 | 설명 |
|------|------|
| 범위 | 자기완결적 함수 단위만 평가 |
| 언어 | Python 단일 언어 |
| 복잡도 | 코드베이스 전체 이해 불필요 |
| 현실성 | 실제 개발 환경과 괴리 |
| 오염 | 학습 데이터 오염 가능성 높음 |

<p class="emphasis">→ 더 현실적인 벤치마크가 필요하다</p>

<!--
이러한 한계들이 SWE-bench의 탄생 배경이 됩니다.
-->

---

# HumanEval → SWE-bench

<p class="emphasis">패러다임 전환의 필요성</p>

| | HumanEval | SWE-bench |
|--|-----------|-----------|
| 단위 | 함수 | 코드베이스 전체 |
| 맥락 | 독스트링 | 실제 GitHub 이슈 |
| 규모 | 164 문제 | 2,294 이슈 |
| 현실성 | 알고리즘 퍼즐 | 실제 버그/기능 |
| 난이도 | Top 모델 96%+ | Top 모델 ~20% |

---
layout: section
---

# 현실 세계로: SWE-bench

<p class="section-subtitle">실제 GitHub 이슈 기반 평가 (2023)</p>

---

# SWE-bench 설계

<div class="grid grid-cols-2 gap-8">
<div>

### 데이터 소스
- **12**개 인기 Python 레포
- Django, scikit-learn, matplotlib, sympy 등
- **2,294**개 실제 GitHub 이슈
- 이슈 → PR → 테스트의 자연스러운 흐름

</div>
<div>

### 평가 방식
- 이슈 설명을 입력으로 제공
- 코드베이스 전체 접근 가능
- 기존 테스트 + 새 테스트로 검증
- 실제 PR과 동일한 결과 기대

</div>
</div>

<!--
SWE-bench의 핵심은 실제 오픈소스 프로젝트의 이슈를 그대로 사용한다는 것입니다. 모델이 코드베이스 전체를 이해하고 수정해야 합니다.
-->

---

# SWE-bench 초기 결과

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-number">12.47%</div>
    <div class="stat-label">SWE-agent + GPT-4<br>(최초 기준선)</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">~20%</div>
    <div class="stat-label">2025년 초<br>최고 성능</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">2,294</div>
    <div class="stat-label">전체 태스크 수</div>
  </div>
</div>

<p class="emphasis">Full SWE-bench에서 20%도 대단한 발전</p>

<!--
HumanEval에서 96%를 달성하는 모델도 SWE-bench에서는 고작 20% 수준. 실제 소프트웨어 엔지니어링의 어려움을 보여줍니다.
-->

---

# SWE-bench의 품질 문제

- 2,294개 중 상당수가 **모호**하거나 **불명확**
- 테스트 사양이 불충분한 경우 존재
- 올바른 솔루션도 테스트 실패 가능
- 벤치마크 자체의 신뢰성 의문 제기

<p class="emphasis">→ 품질 검증된 부분집합이 필요하다</p>

---

# SWE-bench Verified

<div class="highlight-box info">

### 전문가 검증 프로세스
- **93**명의 전문 개발자 참여
- **1,699**개 샘플에 대해 3중 교차 검증
- 난이도/품질 가이드라인에 따른 평가
- 최종 **500**개 고품질 인스턴스 선정

</div>

<!--
OpenAI와 협력하여 만든 검증된 하위 집합. 벤치마크 자체의 품질을 보장하는 중요한 시도입니다.
-->

---

# SWE-bench Verified 리더보드

<p class="chart-note">해결률 (%) — 2026년 2월 기준</p>

<ChartSWEVerified />

<!--
Verified에서는 상위 모델이 80%를 돌파. Full에서 20%였던 것과 극적인 대비. Verified 기준으로 모델 간 차이가 더 잘 드러납니다.
-->

---

# Verified vs Full의 의미

| | SWE-bench Full | SWE-bench Verified |
|--|----------------|-------------------|
| 크기 | 2,294 | 500 |
| Top 성능 | ~20% | ~81% |
| 품질 보장 | 자동화 | 전문가 3중 검증 |
| 주요 용도 | 도전적 평가 | 모델 비교 |

<div class="highlight-box warning">

같은 "SWE-bench"라도 어떤 버전인지에 따라<br>점수의 의미가 완전히 다르다

</div>

---

# SWE-bench의 남은 한계

<div class="highlight-box warning">

### Python Only
12개 레포 모두 Python<br>
실제 소프트웨어 세계는 다양한 언어로 구성

</div>

<p class="emphasis">→ 다국어 벤치마크의 필요성</p>

---
layout: section
---

# Python을 넘어서

<p class="section-subtitle">다국어 벤치마크의 등장</p>

---

# Multi-SWE-bench

<p class="source">ByteDance, 2025</p>

<div class="grid grid-cols-2 gap-8">
<div>

### 규모
- **8**개 언어
- **2,132**개 인스턴스
- **68**명 어노테이터
- 5단계 검증 파이프라인

</div>
<div>

### 지원 언어
- Python, Java, TypeScript
- JavaScript, Go, Rust
- C, C++

</div>
</div>

---

# SWE-bench Multilingual

<p class="source">SWE-bench 원저자팀</p>

<div class="grid grid-cols-2 gap-8">
<div>

### 규모
- **9**개 언어
- **42**개 레포지토리
- **300**개 큐레이션 태스크
- 반자동 + 수동 검증 결합

</div>
<div>

### 지원 언어
- C, C++, Go, Java
- JavaScript, TypeScript
- PHP, Ruby, Rust

</div>
</div>

---

# Python vs 다국어 성능 격차

<p class="chart-note">SWE-bench Verified (Python) vs Multilingual 해결률 (%)</p>

<ChartMultilingual />

<!--
Claude 3.7 Sonnet 기준으로 Python에서 63%, Multilingual에서 43%로 무려 20%p 격차. LLM이 Python에 치우쳐 학습되어 있음을 보여줍니다.
-->

---

# 다국어 벤치마크의 발견

- **Python 편향**: 대부분의 모델이 Python에서 월등히 높은 성능
- **크로스 파일 이슈**에서 성능 급락
- JS/TS 패치는 상대적으로 **지역적** (&lt;3 hunks, &lt;2 files)
- 난이도가 올라갈수록 해결률 급격히 하락

<div class="highlight-box info">

LLM의 코딩 능력은 **언어에 따라 크게 다르다**<br>
Python 기준 점수로 일반화하면 안 된다

</div>

---

# 다국어 벤치마크 비교

| | Multi-SWE-bench | SWE-bench Multilingual |
|--|-----------------|----------------------|
| 주체 | ByteDance | SWE-bench 원저자 |
| 언어 수 | 8 | 9 |
| 인스턴스 | 2,132 | 300 |
| 검증 | 68명, 5단계 | 반자동 + 수동 |
| 특징 | 대규모 | 빠른 평가 목적 |

---
layout: section
---

# 불편한 진실

<p class="section-subtitle">데이터 오염 문제</p>

---

# The SWE-Bench Illusion

<p class="source">Liang et al., Microsoft Research — NeurIPS 2025</p>

<div class="highlight-box danger">

### 핵심 질문
모델이 벤치마크를 정말 **"풀고"** 있는가,<br>
아니면 **"기억해내고"** 있는가?

</div>

<!--
Microsoft Research가 NeurIPS 2025에서 발표한 논문. SWE-bench 점수의 신뢰성에 근본적인 의문을 제기합니다.
-->

---

# 핵심 실험: 파일 경로 맞추기

- 모델에게 **이슈 설명만** 제공 (코드 접근 불가)
- 버그가 있는 파일의 경로를 예측하도록 요청
- 코드를 보지 않고도 경로를 맞출 수 있다면?

<div class="stat-grid">
  <div class="stat-card green">
    <div class="stat-number">76%</div>
    <div class="stat-label">SWE-bench Verified<br>파일 경로 정확도</div>
  </div>
  <div class="stat-card red">
    <div class="stat-number">53%</div>
    <div class="stat-label">외부 레포지토리<br>파일 경로 정확도</div>
  </div>
  <div class="stat-card yellow">
    <div class="stat-number">23%p</div>
    <div class="stat-label">성능 격차</div>
  </div>
</div>

<!--
코드를 보지도 않고 76% 정확도로 파일 경로를 맞춘다는 것은, 모델이 이미 이 벤치마크의 정답을 "알고 있다"는 강력한 증거입니다.
-->

---

# 오염도 그래디언트

<p class="chart-note">파일 경로 식별 정확도 (%) — 데이터 소스별</p>

<ChartContamination />

<!--
오염도가 가장 높은 Verified에서 가장 높은 정확도, 외부 레포에서 가장 낮은 정확도. 깨끗한 그래디언트가 오염을 증명합니다.
-->

---

# 두 가지 암기 패턴

<div class="grid grid-cols-2 gap-8">
<div>

<div class="highlight-box warning">

### 인스턴스별 암기
특정 이슈-솔루션 쌍을<br>학습 데이터에서 기억

<hr>

<p class="small">증거: Verified > Full > External<br>단계적 성능 하락</p>

</div>

</div>
<div>

<div class="highlight-box warning">

### 레포 편향 암기
특정 레포의 구조와<br>패턴을 과적합

<hr>

<p class="small">증거: SWE-bench 레포 vs 외부 레포<br>최대 <strong>47%p</strong> 격차</p>

</div>

</div>
</div>

---

# 리더보드 경쟁의 함의

- 높은 SWE-bench 점수 ≠ 높은 범용 코딩 능력
- 모델 학습 시 벤치마크 레포 데이터가 포함될 수밖에 없음
- 신규 모델일수록 더 많은 데이터에 노출 → **점수 인플레이션**
- 공정한 비교를 위한 새로운 접근 필요

<div class="highlight-box danger">

벤치마크의 가치는 **오염으로부터의 자유도**에 비례한다

</div>

---
layout: section
---

# 오염 대응 전략

<p class="section-subtitle">주기적 갱신 vs 접근 제한</p>

---

# 두 가지 접근법

<div class="grid grid-cols-2 gap-8">
<div>

<div class="highlight-box info">

### 전략 A: 주기적 갱신
지속적으로 새 태스크 생성하여<br>오염 창을 최소화

<hr>

- SWE-rebench
- SWE-bench Live

</div>

</div>
<div>

<div class="highlight-box info">

### 전략 B: 접근 제한
학습 데이터에 포함될 수 없는<br>코드를 사용

<hr>

- SWE-bench Pro

</div>

</div>
</div>

---

# SWE-rebench

<p class="source">자동화된 대규모 갱신</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-number">3,400+</div>
    <div class="stat-label">레포지토리</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">21,000+</div>
    <div class="stat-label">태스크</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">$0.03</div>
    <div class="stat-label">최저 비용/문제</div>
  </div>
</div>

- 자동화 파이프라인으로 지속적 태스크 수집
- 오염 추적 메커니즘 내장
- 비용/토큰 추적으로 효율성까지 평가

---

# SWE-bench Live

<p class="source">월간 갱신 방식</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-number">~50</div>
    <div class="stat-label">월간 신규 태스크</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">1,565+</div>
    <div class="stat-label">누적 인스턴스</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">164</div>
    <div class="stat-label">레포지토리</div>
  </div>
</div>

- 모델 학습 컷오프 **이후** 생성된 이슈만 사용
- 자동화된 월간 큐레이션 파이프라인
- 시간 경과에 따른 모델 능력 추이 관찰 가능

---

# SWE-bench Pro

<p class="source">접근 제한 모델</p>

<div class="grid grid-cols-2 gap-8">
<div>

<div class="highlight-box info">

### Public Split
- **731**개 인스턴스
- GPL Copyleft 라이선스
- 학습 시 법적 위험 → 억제 효과

</div>

</div>
<div>

<div class="highlight-box danger">

### Private Split
- **276**개 인스턴스
- 18개 비공개 스타트업 코드
- 학습 데이터에 포함 **불가능**

</div>

</div>
</div>

---

# Public vs Private: 현실 격차

<p class="chart-note">SWE-bench Pro 해결률 (%) — Public vs Private</p>

<ChartSWEPro />

<!--
Private 코드에서의 성능 하락이 모델의 "진짜 실력"에 더 가까울 수 있습니다. GPT-5의 경우 8.2%p 하락.
-->

---

# 대응 전략 트레이드오프

| | 주기적 갱신 | 접근 제한 |
|--|------------|----------|
| 대표 | SWE-rebench, Live | SWE-bench Pro |
| 장점 | 대규모, 자동화 | 오염 근본 차단 |
| 단점 | <span class="red">개별 샘플 품질 저하</span> | <span class="red">라이선스 일관성 문제</span> |
| 한계 | 갱신 주기 내 오염 가능 | 새 기술 패러다임 반영 어려움 |

<p class="emphasis">두 전략 모두 완벽하지 않다 — 상호보완적 접근 필요</p>

---
layout: section
---

# 남은 과제와 전망

<p class="section-subtitle">벤치마크 너머의 소프트웨어 엔지니어링</p>

---

# SWEBOK V4와 현실의 괴리

<p class="chart-note">SWEBOK V4: 18개 지식 영역 — 벤치마크 커버리지</p>

<div class="swebok-grid">
  <div class="swebok-item covered">소프트웨어 구현(Construction)</div>
  <div class="swebok-item covered">소프트웨어 테스팅</div>
  <div class="swebok-item partial">소프트웨어 유지보수</div>
  <div class="swebok-item partial">소프트웨어 보안</div>
  <div class="swebok-item uncovered">요구사항 공학</div>
  <div class="swebok-item uncovered">소프트웨어 설계</div>
  <div class="swebok-item uncovered">소프트웨어 아키텍처</div>
  <div class="swebok-item uncovered">형상 관리</div>
  <div class="swebok-item uncovered">소프트웨어 품질</div>
  <div class="swebok-item uncovered">소프트웨어 공학 운영</div>
  <div class="swebok-item uncovered">소프트웨어 공학 관리</div>
  <div class="swebok-item uncovered">소프트웨어 공학 프로세스</div>
  <div class="swebok-item uncovered">소프트웨어 공학 모델/방법론</div>
  <div class="swebok-item uncovered">소프트웨어 공학 전문실무</div>
  <div class="swebok-item uncovered">소프트웨어 공학 경제학</div>
  <div class="swebok-item uncovered">컴퓨팅 기초</div>
  <div class="swebok-item uncovered">수학 기초</div>
  <div class="swebok-item uncovered">공학 기초</div>
</div>

<div class="swebok-legend">
  <span class="legend-item covered">벤치마크 존재</span>
  <span class="legend-item partial">부분적 평가</span>
  <span class="legend-item uncovered">벤치마크 부재</span>
</div>

<!--
SWEBOK V4 기준 18개 지식 영역 중 벤치마크가 존재하는 것은 극소수. 현재 벤치마크는 소프트웨어 엔지니어링의 극히 일부만 평가하고 있습니다.
-->

---

# 벤치마크 진화의 교훈

<div class="timeline-vertical">
  <div class="timeline-item">
    <div class="timeline-year">2021</div>
    <div class="timeline-content">
      <strong>HumanEval</strong> — 함수 단위, Python<br>
      <span class="small">→ 한계: 포화, 비현실적</span>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-year">2023</div>
    <div class="timeline-content">
      <strong>SWE-bench</strong> — 실제 이슈, 코드베이스<br>
      <span class="small">→ 한계: Python 단일 언어, 품질</span>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-year">2024</div>
    <div class="timeline-content">
      <strong>Verified / Multilingual</strong> — 품질, 다국어<br>
      <span class="small">→ 한계: 오염 문제 부각</span>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-year">2025</div>
    <div class="timeline-content">
      <strong>rebench / Live / Pro</strong> — 오염 대응<br>
      <span class="small">→ 한계: 자동화-품질 균형</span>
    </div>
  </div>
</div>

---

# 핵심 메시지

<div class="key-messages">
  <div class="key-message">
    <span class="msg-number">1</span>
    <p>벤치마크 점수는 <strong>종합적 SW 엔지니어링 역량</strong>을 대변하지 않는다</p>
  </div>
  <div class="key-message">
    <span class="msg-number">2</span>
    <p><strong>자동화와 품질</strong>의 균형은 벤치마크 설계의 근본적 딜레마다</p>
  </div>
  <div class="key-message">
    <span class="msg-number">3</span>
    <p><strong>에이전틱 코딩 시대</strong>의 평가 방식은 아직 정립되지 않았다</p>
  </div>
</div>

<!--
세 가지 핵심 메시지를 강조하며 마무리합니다.
-->

---

# 참고문헌

<div class="references">
<ol>
<li>Chen et al., "Evaluating Large Language Models Trained on Code" (HumanEval), 2021</li>
<li>Jimenez et al., "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", 2023</li>
<li>OpenAI, "Introducing SWE-bench Verified", 2024</li>
<li>Hou et al., "Large Language Models for Software Engineering: A Systematic Literature Review", 2025</li>
<li>Liu et al., "Multi-SWE-bench: A Multilingual Benchmark for Real-World Code Fixing", 2025</li>
<li>Zan et al., "SWE-bench Multilingual", 2025</li>
<li>Liang et al., "The SWE-Bench Illusion", NeurIPS 2025</li>
<li>Qi et al., "SWE-rebench: Automated Benchmark Construction for SWE", 2025</li>
<li>Fourrier et al., "SWE-bench Live: A Contamination-Free Dynamic Benchmark", 2025</li>
<li>Scale AI, "SWE-bench Pro", 2025</li>
<li>IEEE CS, "SWEBOK V4", 2024</li>
</ol>
</div>

---
layout: center
---

# Q&A

<p class="title-meta">감사합니다</p>
