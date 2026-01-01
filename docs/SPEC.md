# 가계부 앱 기능 명세서

## 1. 프로젝트 개요

### 1.1 목적
- 개인 재정 관리 (지출/수입 추적, 자산 현황 파악)
- 새로운 기술 스택 학습 (Next.js, TypeScript, Prisma, PostgreSQL)
- TDD 기반 개발 경험

### 1.2 사용자
- 단일 사용자 (본인 전용)
- 인증/권한 관리 없음 (MVP 범위)

### 1.3 기술 스택
| 구분 | 기술 |
|------|------|
| Frontend | Next.js 14+, TypeScript, React |
| Backend | Next.js API Routes |
| ORM | Prisma |
| Database | PostgreSQL 16 (Docker) |
| Testing | Vitest, React Testing Library |
| Charts | Recharts (후순위) |
| Styling | Tailwind CSS |

---

## 2. 핵심 기능

### 2.1 지출 관리

#### 2.1.1 지출 등록
- **입력 항목**
  - 금액 (필수, 양의 정수, 원 단위)
  - 카테고리 (필수, 선택식)
  - 지출 유형 (필수): 고정지출 / 변동지출
  - 날짜 (필수, 기본값: 오늘)
  - 메모 (선택)
- **기본 카테고리**
  - 식비, 교통, 주거, 통신, 의료, 여가, 쇼핑, 기타
  - 사용자가 추가/수정/삭제 가능

#### 2.1.2 지출 조회
- 월별 필터링
- 카테고리별 필터링
- 고정/변동 필터링
- 최신순 정렬 (기본)
- **월 고정지출 합계 표시**

#### 2.1.3 지출 수정/삭제
- 기존 항목 수정
- 삭제 시 확인 절차

---

### 2.2 수입 관리

#### 2.2.1 수입 등록
- **입력 항목**
  - 금액 (필수, 양의 정수)
  - 출처 (필수, 선택식)
  - 날짜 (필수, 기본값: 오늘)
  - 메모 (선택)
- **기본 출처**
  - 급여, 부수입, 이자, 투자수익, 기타
  - 사용자가 추가/수정/삭제 가능

#### 2.2.2 수입 조회
- 월별 필터링
- 출처별 필터링

#### 2.2.3 수입 수정/삭제
- 지출과 동일한 UX

---

### 2.3 자산 관리

#### 2.3.1 자산 등록
- **입력 항목**
  - 이름 (필수, 예: "신한은행", "키움증권", "업비트", "Coinbase")
  - 유형 (필수, 선택식)
  - 통화 (필수, 기본값: KRW)
  - 잔액 (필수, 해당 통화 기준)
  - 부채 여부 (체크박스, 기본값: false)
- **유형 목록**
  - 현금, 증권, 암호화폐, 부동산, 기타
- **지원 통화**
  - KRW, USD, USDT (확장 가능)

#### 2.3.2 자산 조회
- 전체 자산 목록
- 유형별 소계
- **총자산** (자산 합계)
- **순자산** (자산 - 부채)
- **외화 자산: 원화 환산 금액 표시**

#### 2.3.3 환율 관리
- 주요 통화 환율 수동 입력/수정
- 환율 기준일 표시
- (향후) 외부 API 연동 자동 업데이트

#### 2.3.4 자산 잔액 업데이트
- 잔액 직접 수정 (수동 입력)
- 최종 수정일 자동 기록

#### 2.3.5 자산 삭제
- 삭제 시 확인 절차

---

### 2.4 카테고리/출처 관리

#### 2.4.1 지출 카테고리 관리
- 기본 제공 카테고리 + 사용자 정의
- 카테고리 추가/수정/삭제
- 삭제 시 해당 카테고리 사용 중인 지출 존재하면 경고

#### 2.4.2 수입 출처 관리
- 기본 제공 출처 + 사용자 정의
- 출처 추가/수정/삭제
- 삭제 시 해당 출처 사용 중인 수입 존재하면 경고

---

### 2.5 대시보드

#### 2.5.1 요약 카드 (우선순위 높음)
- 이번 달 총 지출
- 이번 달 고정지출
- 이번 달 변동지출
- 이번 달 총 수입
- 이번 달 순수익 (수입 - 지출)
- 총자산
- 순자산 (자산 - 부채)

#### 2.5.2 데이터 시각화 (후순위)
- 지출 카테고리 비중 (파이/도넛 차트)
- 월별 수입/지출 추이 (막대 차트)
- 포트폴리오 비중 (도넛 차트)

---

## 3. 화면 구성

### 3.1 네비게이션
```
[대시보드] [지출] [수입] [자산] [설정]
```

### 3.2 페이지 목록

| 경로 | 페이지명 | 설명 |
|------|----------|------|
| `/` | 대시보드 | 요약 카드 + 차트 (후순위) |
| `/expenses` | 지출 관리 | 지출 목록 + 등록/수정 |
| `/income` | 수입 관리 | 수입 목록 + 등록/수정 |
| `/assets` | 자산 관리 | 자산 목록 + 등록/수정 + 환율 |
| `/settings` | 설정 | 카테고리/출처 관리, 환율 설정 |

---

## 4. API 명세

### 4.1 지출 (Expenses)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/expenses` | 지출 목록 조회 (쿼리: month, category, isFixed) |
| GET | `/api/expenses/:id` | 지출 단건 조회 |
| POST | `/api/expenses` | 지출 등록 |
| PUT | `/api/expenses/:id` | 지출 수정 |
| DELETE | `/api/expenses/:id` | 지출 삭제 |
| GET | `/api/expenses/summary` | 월별/카테고리별 집계 (고정/변동 구분 포함) |

### 4.2 수입 (Income)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/income` | 수입 목록 조회 (쿼리: month, source) |
| GET | `/api/income/:id` | 수입 단건 조회 |
| POST | `/api/income` | 수입 등록 |
| PUT | `/api/income/:id` | 수입 수정 |
| DELETE | `/api/income/:id` | 수입 삭제 |
| GET | `/api/income/summary` | 월별/출처별 집계 |

### 4.3 자산 (Assets)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/assets` | 자산 목록 조회 (원화 환산 포함) |
| GET | `/api/assets/:id` | 자산 단건 조회 |
| POST | `/api/assets` | 자산 등록 |
| PUT | `/api/assets/:id` | 자산 수정 (잔액 업데이트) |
| DELETE | `/api/assets/:id` | 자산 삭제 |
| GET | `/api/assets/summary` | 총자산, 순자산, 유형별 비중 |

### 4.4 환율 (Exchange Rates)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/exchange-rates` | 전체 환율 조회 |
| PUT | `/api/exchange-rates/:currency` | 환율 수정 |

### 4.5 카테고리 (Categories)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/categories` | 카테고리 목록 |
| POST | `/api/categories` | 카테고리 추가 |
| PUT | `/api/categories/:id` | 카테고리 수정 |
| DELETE | `/api/categories/:id` | 카테고리 삭제 |

### 4.6 수입 출처 (Income Sources)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/income-sources` | 출처 목록 |
| POST | `/api/income-sources` | 출처 추가 |
| PUT | `/api/income-sources/:id` | 출처 수정 |
| DELETE | `/api/income-sources/:id` | 출처 삭제 |

### 4.7 대시보드 (Dashboard)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/dashboard/summary` | 요약 데이터 (수입/지출/고정지출/순수익, 총자산/순자산) |
| GET | `/api/dashboard/monthly-trend` | 최근 6개월 수입/지출 추이 |

---

## 5. 데이터 모델

### 5.1 Expense (지출)
```
id: string (PK, CUID)
amount: int (원 단위)
categoryId: string (FK -> Category)
isFixed: boolean (고정지출 여부)
description: string (nullable)
date: datetime
createdAt: datetime
updatedAt: datetime
```

### 5.2 Income (수입)
```
id: string (PK, CUID)
amount: int (원 단위)
sourceId: string (FK -> IncomeSource)
description: string (nullable)
date: datetime
createdAt: datetime
updatedAt: datetime
```

### 5.3 Asset (자산)
```
id: string (PK, CUID)
name: string
type: string (현금/증권/암호화폐/부동산/기타)
currency: string (KRW/USD/USDT)
balance: decimal (해당 통화 기준, 소수점 허용)
isLiability: boolean (부채 여부)
createdAt: datetime
updatedAt: datetime
```

### 5.4 ExchangeRate (환율)
```
id: string (PK, CUID)
currency: string (UNIQUE, USD/USDT)
rate: decimal (1 외화 = x KRW)
updatedAt: datetime
```

### 5.5 Category (지출 카테고리)
```
id: string (PK, CUID)
name: string (UNIQUE)
isDefault: boolean (기본 제공 여부)
sortOrder: int
createdAt: datetime
```

### 5.6 IncomeSource (수입 출처)
```
id: string (PK, CUID)
name: string (UNIQUE)
isDefault: boolean (기본 제공 여부)
sortOrder: int
createdAt: datetime
```

---

## 6. 우선순위 및 MVP 범위

### 6.1 P0 - 핵심 (MVP 필수)
- 지출 CRUD + 고정/변동 구분
- 수입 CRUD
- 자산 CRUD + 부채 구분
- 카테고리/출처 관리 (사용자 편집)
- 외화 자산 + 환율 환산
- 대시보드 요약 카드
- 표/리스트 기반 데이터 관리 UI

### 6.2 P1 - 중요 (MVP 포함 목표)
- 월별 필터링
- 총자산/순자산 계산
- 고정지출 합계 표시

### 6.3 P2 - 후순위 (시간 여유 시)
- 차트 시각화 (3종)
- 다크 모드

### 6.4 제외 (향후 고려)
- 사용자 인증/다중 사용자
- 예산 설정 및 알림
- 데이터 내보내기 (CSV, Excel)
- 반복 지출/수입 자동 등록
- 환율 API 자동 연동

---

## 7. 일정

| Day | 목표 | 상세 |
|-----|------|------|
| 1 | 환경 + DB | Next.js, Prisma, PostgreSQL 세팅, 전체 스키마 마이그레이션 |
| 2 | 카테고리/출처 + 지출 API | 카테고리/출처 CRUD, 지출 CRUD + 고정/변동, TDD |
| 3 | 수입/자산/환율 API | 수입 CRUD, 자산 CRUD + 외화/부채, 환율 관리, TDD |
| 4 | UI - 지출/수입 | 테이블 뷰, 입력 폼, 필터링 |
| 5 | UI - 자산/설정 | 자산 테이블, 환율 입력, 카테고리/출처 관리 |
| 6 | UI - 대시보드 | 요약 카드, (여유 시) 차트 |
| 7 | 마무리 | 통합 테스트, 버그 수정, 스타일링, (여유 시) 다크 모드 |
