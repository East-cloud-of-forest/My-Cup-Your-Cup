import React from "react";

import "../QnA/FaqPage.scss";

import QnAmenu from "./QnAmenu";

const FaqPage = () => {
  return (
<div>
      <QnAmenu />

<div className="FAQ_main">
    <div className="FAQmain_header">
          <h1>FAQ</h1>

          <h4>FAQ(자주 묻는 질문)을 참고하시면 빠른 문의 해결이 가능합니다.</h4>
    </div>

        <div className="FAQ_contents">

                <input type="checkbox" id="FAQ_answer01" />
                <label htmlFor="FAQ_answer01">[ 회원 ] 회원가입은 어떻게 하나요?</label>
                <div>
                    <p>
                        회원가입은 웹페이지 화면 1시방향 아이콘을 누르신 후,<br />
                        로그인 입력창 우측 하단의 회원가입 버튼을 클릭하여 가입하실 수 있습니다.<br />
                        <br />
                        서비스 이용약관과 전자상거래 표준약관, 개인정보 제3자 제공에 관한 사항을 체크한 후,<br />
                        확인 버튼을 누르시고 이메일, 비밀번호, 이름, 생년월일, 성별, 휴대전화를 입력하시면 <br />
                        네잔내잔 회원가입이 완료됩니다.
                    </p>
                </div>

          <input type="checkbox" id="FAQ_answer02" />
                <label htmlFor="FAQ_answer02">[ 주문 ] 주문 제품 취소하는 법</label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>
   
          <input type="checkbox" id="FAQ_answer03" />
                <label htmlFor="FAQ_answer03">[ 결제 ] 상품 결제 방법</label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>

          <input type="checkbox" id="FAQ_answer04" />
                <label htmlFor="FAQ_answer04">[ 배송 ] 반품, 교환 결제 방법</label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>

        </div>
</div>

</div>
  );
};

export default FaqPage;
