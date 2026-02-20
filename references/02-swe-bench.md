# SWE-bench (Jimenez et al., 2023)

**논문**: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
**저자**: Carlos E. Jimenez et al. (Princeton NLP)
**발표**: ICLR 2024 Oral
**arXiv**: 2310.06770

---

## 핵심 수치

| 항목 | 수치 |
|------|------|
| 출처 레포 수 | 12개 인기 Python 오픈소스 |
| 수집 PR 수 | ~90,000개 |
| 최종 인스턴스 | **2,294개** |
| 평균 수정 파일 수 | **1.7개** |
| 평균 수정 함수 수 | 3.0개 |
| 평균 패치 줄수 | **32.8줄** |
| 평균 이슈 설명 길이 | 195단어 |
| pass-to-pass 테스트 중간값 | 51개 |
| Claude 2 + BM25 13k 성능 | **1.96%** |
| Oracle-collapsed Claude 2 성능 | 4.8% → **5.9%** |
| Oracle-collapsed GPT-4 성능 | 1.3% → **3.4%** |

---

## 레포별 인스턴스 수

- Django: 850
- sympy: 386
- scikit-learn: 229
- sphinx: 187
- matplotlib: 184
- (기타 7개 레포)

---

## 구축 파이프라인

1. **PR 수집**: 12개 레포에서 ~90,000 PR 수집
2. **조건 기반 필터링**: GitHub 이슈 연결 + 테스트 파일 수정 포함 여부
3. **실행 기반 필터링**: 패치 전 테스트 실패, 패치 후 통과 확인

---

## 평가 방법

- **Input**: 이슈 텍스트 + 코드베이스 (BM25로 관련 파일 선별)
- **Output**: 패치 파일 (diff 형식)
- **성공 조건**: fail-to-pass + pass-to-pass 동시 충족

$$\text{resolve rate} = \frac{\text{해결된 인스턴스}}{\text{전체 인스턴스}}$$

---

## 주요 발견

- HumanEval 84% 달성 모델이 SWE-bench에서 1.96%
- BM25 컨텍스트 길이 증가 시 성능 하락 (컨텍스트 처리 능력이 핵심 병목)
- Oracle-collapsed(정답 줄 ±15줄만 제공) 시 성능 소폭 상승 → 결함 위치 찾기가 핵심 병목

---

## 한계

- Python 전용 (12개 레포 모두 Python)
- 정적 스냅샷 — 한 번 수집 후 업데이트 없음
- 품질 문제: 68.3%가 어떤 형태로든 품질 이슈 (→ Verified에서 걸러냄)
