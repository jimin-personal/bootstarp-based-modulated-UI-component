# 📦 React UI Components (모듈화된 재사용 컴포넌트 라이브러리)

이 프로젝트는 **React + TypeScript** 기반의 UI 컴포넌트를 모듈화하여 재사용성을 높인 레포지토리입니다.  
공통 UI를 중심으로 다양한 외부 라이브러리를 통합해, 유지보수와 확장에 용이한 구조로 개발되었습니다.

---

## 🔧 사용 기술 스택

- **React** (`v18+`)
- **TypeScript**
- **React-Bootstrap**: 빠른 UI 구성과 반응형 레이아웃 구현
- **Chart.js**: 다양한 차트 시각화 (Line, Bar, Pie 등)
- **react-slick**: 배너, 이미지 슬라이더 등 캐러셀 구성
- **CSS Modules & Global CSS**: `styled-components` 없이 전역 스타일 및 컴포넌트 단위 스타일 관리

---

## 🧩 주요 특징

- **컴포넌트 모듈화**: 반복되는 UI를 재사용 가능한 컴포넌트로 분리하여 코드 일관성 확보
- **라이브러리 통합**:
  - React-Bootstrap으로 버튼, 모달, 폼 등의 UI 구성
  - Chart.js로 대시보드 및 통계 기반 화면 구성
  - react-slick으로 자동/수동 슬라이더 구현
- **스타일링 전략**:
  - 글로벌 스타일은 `global.css`로 정의
  - 컴포넌트별 세부 스타일은 CSS Modules 및 필요한 경우 inline style 사용
  - `styled-components`는 사용하지 않음

---
