# HumanEval (Chen et al., 2021)

**논문**: "Evaluating Large Language Models Trained on Code"
**저자**: Mark Chen et al. (OpenAI)
**arXiv**: 2107.03374

---

## 핵심 수치

| 항목 | 수치 |
|------|------|
| 문제 수 | 164개 Python 함수 |
| 평균 유닛 테스트 수 | 7.7개/문제 |
| Codex (12B) pass@1 | **28.8%** |
| Codex-S (fine-tuned) pass@100 | **70.2%** (논문 abstract 기준) |
| Codex-S fine-tuned pass@1 | 37.7% |

> ⚠️ 72.3%는 일부 설정에서의 수치일 수 있으나 논문 abstract 주요 수치는 70.2%.

---

## 핵심 설계 원칙

1. **수작업 제작**: GitHub 코드를 그대로 가져온 것이 아니라 직접 작성 (훈련 데이터 오염 방지)
2. **pass@k 메트릭**: n번 샘플링 중 k개를 뽑았을 때 하나라도 정답일 확률의 불편 추정량
3. **functional correctness**: 텍스트 유사도(BLEU)가 아닌 실행 결과로 판별

## pass@k 공식

$$\text{pass@k} = 1 - \frac{\binom{n-c}{k}}{\binom{n}{k}}$$

- n: 총 샘플 수
- c: 통과한 샘플 수
- k: 제출 횟수

---

## 주요 발견

- pass@1 < pass@10 < pass@100: 더 많이 시도할수록 성공 확률 증가
- fine-tuning(Codex-S)이 pass@1에서 가장 효과적
- 문제 설명(docstring) 품질이 성능에 영향

---

## 한계

- Python 단일 언어
- 독립 함수 단위 → 실제 개발 환경과 괴리
- 2021년 이후 인터넷에 공개 → 모든 주요 LLM 훈련 데이터에 포함 가능
- 2024년 기준 96.3% 달성 (o1) → 사실상 포화
