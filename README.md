# westy-clone-Projects
웹사이트 클론 프로젝트


## 💻 프로젝트 소개
웹사이트 템플릿을 제공하는 사이트를 참고하여 구현한 반응형 클론 웹사이트

UI 및 구성과 기능 등을 참고하고 일부 수정하여 구현하였습니다.

참고 사이트 : https://7oroof.com/tfdemos/westy-architecture/

## ⏱ 개발 기간
22년 11월 10일 - 22년 11월 30일


## ⚙ 기술 스택
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/FONTAWESOME-528DD7?style=for-the-badge&logo=FontAwesome&logoColor=white"> <img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white">


## 📌 주요 기능
#### ✔ Vercel를 이용한 서버 구현
- json-server-vercel 템플릿 사용 (출처: https://github.com/kitloong/json-server-vercel)
- json 파일로 데이터 관리 - [db.json](https://github.com/InnSeonn/json-server-vercel/blob/main/db.json)
--------------------------------------------------

### 슬라이드 - [slide.js](https://github.com/InnSeonn/westy-clone-Projects/blob/main/js/slide.js)

#### hero
- 메인으로 표시되는 슬라이드
- 이미지와 텍스트에 애니메이션 효과
- 자동 전환 기능
- 페이지 이동 기능(스와이프, 컨트롤 버튼, 페이지 버튼)

#### client
- 고객사를 표시하는 슬라이드
- Vercel 서버에서 client 목록을 요청하고 응답 받음
- clearbit API를 통해 해당 회사의 로고 이미지를 가져와 슬라이드 생성
- 무한 슬라이드
- 페이지 이동 기능(스와이프, 페이지 버튼)

#### review
- 고객 리뷰를 표시하는 슬라이드
- Vercel 서버에서 응답 받은 리뷰 데이터를 통해 슬라이드 생성
- 무한 슬라이드
- 페이지 이동 기능(스와이프, 페이지 버튼)

#### news
- 공지 및 소식을 표시하는 슬라이드
- Vercel 서버에서 응답 받은 뉴스 데이터를 통해 슬라이드 생성
- 무한 슬라이드
- 페이지 이동 기능(스와이프, 페이지 버튼)


### 페이지 스크롤 - [index.js](https://github.com/InnSeonn/westy-clone-Projects/blob/main/js/index.js)
- 네비게이션 메뉴 선택 시 해당 위치로 자동 스크롤
- TOP 버튼 클릭 시 최상단으로 자동 스크롤


### 데이터 필터링 - [works.js](https://github.com/InnSeonn/westy-clone-Projects/blob/main/js/works.js)
- Vercel 서버에서 응답 받은 작업물 데이터를 표시
- 카테고리 버튼을 클릭하여 해당 카테고리에 포함되는 작업물만 필터링하여 표시
- 마우스 방향에 따라 내용이 표시되고 사라지는 애니메이션 효과(마우스 디바이스에서만)
- 데이터를 3개씩 표시하고, 3개보다 많을 경우 더보기 버튼 생성


### 반응형
- 디바이스 크기에 따라 반응형으로 구현
- 터치와 마우스 디바이스를 구분하여 구현
