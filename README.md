![project_900_2](https://user-images.githubusercontent.com/117163085/221343773-066288c6-d536-43ce-b891-cb5d8d7df068.png)

# westy-clone-Projects
웹사이트 클론 프로젝트

<br/>

## 💻 프로젝트 소개
**VanillaJS**를 최대한 사용하여 구현한 **클론 웹사이트**입니다.

실제 서비스하는 웹사이트의 구조를 파악하고 스스로 구현해보면서 **Javascript**를 학습하는 것에 목적을 두었고, 다양한 종류의 슬라이드와 애니메이션 효과, 아이콘 활용, 데이터 필터링 등 구현해 볼 요소가 많다고 생각되어 해당 사이트를 참고하게 되었습니다.

참고 사이트는 여러 페이지로 구성되어 있었으나 index 페이지의 구현 내용과 거의 중복될 것이라 판단하여 스크롤 이벤트를 적용한 **원페이지 사이트**로 수정하여 구현했습니다.

미디어쿼리를 사용하여 **반응형**으로 제작했습니다.

참고사이트 : https://7oroof.com/tfdemos/westy-architecture/

<br/>

## ✨ 배포사이트
https://inn-clone-web.vercel.app/

<br/>

## ⏱ 개발 기간
22년 11월 10일 - 22년 11월 30일

<br/>

## ⚙ 기술 스택
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/FONTAWESOME-528DD7?style=for-the-badge&logo=FontAwesome&logoColor=white"> <img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white">

- **`Javascript`**, **`SCSS`**, **`HTML5`** : \<header\>, \<footer\>, \<nav\>, \<section\> 등 HTML5의 시맨틱 태그를 사용하여 의미있는 문서 구조를 만들기 위해 노력했습니다. 효율적인 스타일 작성을 위해 SCSS를 사용하여 변수, Nesting, mixin 등을 활용했습니다.
- **`Parcel`** : 번들링 및 SCSS 변환을 위하여 사용했습니다.
- **`Git`**, **`Github`**, **`SourceTree`** : Git을 통해 소스코드를 관리했습니다. 주로 SourceTree를 통해 commit할 파일 또는 라인을 add 하고, CLI로 commit, push 하여 작업했습니다.
- **`Vercel`** : Vercel에 Git Repository를 연동하여 웹사이트를 배포했습니다.
- **`Clearbit API`** : 슬라이드에 필요한 회사 로고 이미지를 가져오기 위해 API를 사용했습니다.
- **`Fontawesome`** : SNS 아이콘 등을 사용했습니다.  

<br/>
  
## 📌 주요 기능

#### Vercel를 이용한 서버 구현
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
- 마우스 방향에 따라 내용이 표시되고 사라지는 애니메이션 효과
- 데이터를 3개씩 표시하고, 3개보다 많을 경우 더보기 버튼 생성


### 반응형
- 디바이스 크기에 따라 반응형으로 구현

<br/>

https://user-images.githubusercontent.com/117163085/221343807-fac870b2-aa91-4194-9161-439702be17ac.mp4
