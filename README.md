# 내잔네잔 My Cup Your Cup - 텀블러 커스텀 쇼핑몰
https://east-cloud-of-forest.github.io/My-Cup-Your-Cup/

## :page_facing_up: Summary
팀프로젝트로 진행한 커스텀 쇼핑몰 입니다. Canvas 를 이용해 사용자가 직접 자신의 텀블러를 디자인 할 수 있는 기능과, 리뷰 및 만든 디자인을 올려 공유할 수 있는 게시판 기능을 파이어베이스와 연동해 제작한 프로젝트 입니다.

## :open_file_folder: Composition
1. 텀블러 디자인 제작 기능
> 텀블러의 모양, 색상 을 선택할 수 있습니다. 텀블러 위로 사용자가 원하는 이미지를 파일 첨부 형식으로 업로드 하고 위치를 배치하고 크기를 조정할 수 있습니다. 텍스트를 추가하여 사용자가 내용을 편집할 수 있고 위치와 크기를 조정할 수 있습니다. firebase strage 에 저장된 웹에서 제공하는 이미지를 불러와 마찬가지로 위치와 크기를 조정할 수 있습니다. 레이어를 이용해 각 요소의 노출 및 순서를 설정하고 삭제 할 수 있습니다. 텀블러에는 마스킹이 되어 있어 선택이 되었다고 알려주고 크기 조정을 해주는 선택박스 외에는 텀블러 밖으로 노출되지 않습니다.
2. 게시글 작성
> 텀블러 디자인 제작 기능에서 만든 텀블러 디자인을 게시할 수 있는 디자인 페이지와 직접 찍은 사진을 첨부하여 사용한 후기를 올리는 리뷰 페이지, 페이지 또는 제품에 대해 문의를 할 수 있는 1:1 문의 페이지에서 firebase database 와 연동해 게시글을 작성 할 수 있습니다. 사진이 첨부되는 글은 firebase storage 와 동시에 연동되어 있으며, 디자인과 리뷰의 각 게시글 내부에서는 로그인된 계정과 연동해 수정 및 삭제 버튼을 노출하고 그 버튼을 통해 수정과 삭제가 가능합니다.

## :busts_in_silhouette: Team Member
- 임동운 (팀장) - https://github.com/East-cloud-of-forest
- 곽진영 - https://github.com/Jinyooo
- 송민주 - https://github.com/m1njuju
- 정호연 - https://github.com/Hoyeon7
- 추희식 - https://github.com/DenierDenier

## :alarm_clock:  Develop Period
2022 / 05.26 ~ 07.14

## :computer: Stack
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/Font Awesome-528DD7?style=for-the-badge&logo=Font Awesome&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">

## :satellite: Api
Kakao 주소 및 우편번호 API

https://postcode.map.daum.net/guide
