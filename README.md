# 바닐라 자바스크립트로 SPA 앱 구현하기

### 메인 페이지

API: https://dummyjson.com/products

1. 물품 리스트 표기

- 물품 이미지, 품목명, 가격 정보 표시
- 아이템 클릭 시 상세 페이지로 이동

2. 보여질 갯수를 선택하여 물품 노출
3. 페이징 처리

- 페이지 넘버를 클릭하여 다음 페이지로 이동
- 현재 페이지는 다른 페이지와 구별되도록 스타일 처리

4. 검색기능
5. 상단에 현재 장바구니 갯수 표기

- 장바구니 클릭 시 장바구니 페이지로 이동 처리

### 아이템 상세 페이지 (Product Details)

API: https://dummyjson.com/products/{productId}

1. 뒤로가기 버튼 구현

- 바로 이전 페이지로 보내기

2. 물품 상세 정보 표시
3. 상단에 현재 장바구니 갯수 표기

- 장바구니 클릭 시 장바구니 페이지로 이동 처리

4. 장바구니 담기 기능

- 담는 즉시 상단에 장바구니 갯수가 변경됨

### 장바구니 페이지 (Cart)

1. 뒤로가기 버튼 구현

- 바로 이전 페이지로 보내기

2. 물품 이미지, 품목명, 갯수 표기
3. 삭제 기능 구현

- 현재 장바구니에서 삭제 처리
- 삭제와 동시에 상단 장바구니 표기 갯수 및 품목 리스트 갱신 처리

### 특징

1. 기본적인 형태의 전역 상태관리 Store 구현
2. 각 컴포넌트의 life cycle을 만들어서 관리
3. router를 구현하고 페이지를 렌더링

### 프로젝트 실행방법

```js
npm install
npm start
```
