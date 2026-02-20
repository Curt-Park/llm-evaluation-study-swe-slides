# SWE-rebench (Badertdinov et al., 2025)

**논문**: "SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation"
**저자**: Badertdinov et al.
**발표**: NeurIPS 2025 Datasets & Benchmarks
**arXiv**: 2505.20411

---

## 핵심 수치

| 항목 | 수치 |
|------|------|
| 수집 레포 수 | 30,000+ |
| 수집 PR 수 | ~450,000개 |
| 필터링 후 후보 | ~153,400개 |
| 최종 인스턴스 | **21,336개** |
| 다양한 레포 수 | **3,468개** (vs Verified 12개) |
| LLM 자동 설치 성공률 | **31%** |
| 이슈 명확도 자동 평가 정확도 | **79%** (인간 대비) |
| 복잡도 자동 평가 정확도 | **81%** (인간 대비) |

---

## 4단계 파이프라인

1. **Preliminary Task Collection**: 30,000+ 레포에서 ~450,000 PR 수집, 조건 필터링으로 153,400개 후보
2. **Automated Installation Config**: LLM(Qwen2.5-72B)이 최대 3개 Docker 설치 레시피 생성, 반복 개선
3. **Execution-Based Verification**: fail-to-pass 검증, 분산 컨테이너로 실행
4. **Automated Quality Assessment**: 파인튜닝된 LLM이 이슈 명확도·복잡도 점수 예측

---

## 핵심 발견: 점수 인플레이션 실증

- GPT-4.1이 **신규 태스크** (2025년 3~4월)에서 기존 SWE-bench Verified보다 성능 하락
- → 높은 Verified 점수의 상당 부분이 오염/과적합에 기인할 가능성

---

## 장단점

| 측면 | 내용 |
|------|------|
| 장점 | 3,468개 레포로 다양성 확보, 자동화로 대규모, 최신 이슈 반영 |
| 단점 | 설치 성공률 31% (낮음), Python-only, 표준화된 ReAct 스캐폴드 사용 |

---

## 트레이드오프

대규모 자동화 ↑ → 개별 샘플 품질 ↓
이 트레이드오프가 주기적 갱신 전략의 핵심 과제
