# Multi-SWE-bench (Zan et al., 2025)

**논문**: "Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving"
**저자**: Daoguang Zan et al. (ByteDance Seed)
**발표**: NeurIPS 2025 Datasets & Benchmarks
**arXiv**: 2504.02605

---

## 핵심 수치

| 항목 | 수치 |
|------|------|
| 지원 언어 | **7개** (Java, TypeScript, JavaScript, Go, Rust, C, C++) |
| 레포지토리 수 | **39개** |
| 후보 인스턴스 | 2,456개 |
| 최종 인스턴스 | **1,632개** |
| 어노테이터 수 | **68명** 전문가 |
| 어노테이터 정확도 | 언어별 80%+ |
| Multi-SWE-RL 레포 수 | 76개 |
| Multi-SWE-RL 인스턴스 수 | **4,723개** |

---

## 평가 모델 (9개 LLM)

| 회사 | 모델 |
|------|------|
| OpenAI | GPT-4o, o1, o3-mini |
| Anthropic | Claude 3.5 Sonnet, 3.7 Sonnet |
| DeepSeek | DeepSeek-V3, DeepSeek-R1 |
| Alibaba | Qwen2.5-72B |
| ByteDance | Doubao-1.5-pro |

---

## 평가 방법론 (3가지)

| 방법 | 특징 |
|------|------|
| MAgentLess | Agentless 다언어 확장판, 결함 위치 추정 강점 |
| MSWE-agent | SWE-agent 확장판, 대화형 탐색 |
| MopenHands | OpenHands 확장판, 7개 언어 중 5개에서 최고 성능 |

---

## 주요 성능 결과

- o1: Python **48.2%** → 타 언어 평균 크게 하락
- Claude 3.7: Python **52.2%** → 타 언어 하락
- Hard 난이도: 대부분 모델 **0% 근접**
- Python > Java >> Go/Rust >> C/C++ >> TypeScript/JavaScript

---

## 언어별 특성

| 언어 | 이슈 스타일 | 패치 복잡도 |
|------|-----------|-----------|
| Java, Rust | 길고 상세 | 중간 |
| JS, Go, C | 짧고 핵심적 | 원자적 |
| Rust, C++ | - | 대규모 리팩토링 |

---

## 데이터 다양성

- 레포 파일 수: 24 ~ 27,632개
- 코드 규모: 6.7k ~ 698.6k LoC

---

## 한계

- Python 편향 에이전트를 다언어로 확장 시 단순 적용으로는 성능 급락
- Hard 난이도에서 실질적으로 0% 수준
