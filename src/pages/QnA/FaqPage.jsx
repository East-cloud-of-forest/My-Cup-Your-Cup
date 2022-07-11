import React from "react";

import "../QnA/FaqPage.scss";

const FaqPage = () => {


  return (
<div>
  
<div className="FAQ_main">
    <div className="FAQmain_header">
            <h1>FAQ</h1>
            <h4>궁금하신 사항이 있으신가요?</h4>
            <h4>FAQ(자주 묻는 질문)을 참고하시면 빠른 문의 해결이 가능합니다.</h4>
    </div>

        <div className="FAQ_contents">


                <input type="checkbox" id="FAQ_answer01" />
                <label htmlFor="FAQ_answer01">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">회원가입은 어떻게 하나요?</p>
            </div>
                </label>
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
                <label htmlFor="FAQ_answer02">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">네잔내잔 에서 어떤 서비스를 제공하나요?</p>
            </div>
                </label>
                <div>
                    <p>네잔내잔 에서는 다양한 디자인의 텀블러를 제작해서 판매하거나 혹은 구매하실 수 있습니다. <br/><br/>

                    주문제작 코너에서 텀블러의 재질과 크기, 빨대 사용 등의 디자인을 한 후 <br/>
                    텀블러의 이름과 설명, 태그를 입력하여 저장하시면 <br/>
                    책정된 가격에 맞춰 원하는 고객에게 해당 가격으로 나만의 텀블러를 판매할 수 있습니다. <br/><br/>
                    
                    잔디자인 코너에서 다양한 텀블러 디자인을 볼수 있으며,<br/>
                    포토리뷰를 통해서 구매자들의 리뷰를 확인하실 수 있습니다. <br/>
                    </p>
                </div>
                
                <input type="checkbox" id="FAQ_answer03" />
                <label htmlFor="FAQ_answer03">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">주문을 취소하는 법은 어떻게 되나요?</p>
            </div>
                </label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>

                <input type="checkbox" id="FAQ_answer04" />
                <label htmlFor="FAQ_answer04">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">배송완료인데 상품을 못 받으셨다면?</p>
            </div>
                </label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>

                <input type="checkbox" id="FAQ_answer05" />
                <label htmlFor="FAQ_answer05">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">반품이나 교환방법은 어떻게 되나요?</p>
            </div>
                </label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>

                <input type="checkbox" id="FAQ_answer06" />
                <label htmlFor="FAQ_answer06">
            <div className="FAQ_label">
                    <p className="icon_1">Q</p>
                    <p className="Question_Menu">자주 묻는 질문</p>
                    <p className="FAQ_Question">주문 결제 관련 문의</p>
            </div>
                </label>
                <div>
                    <p>내용~내용~내용~내용~내용~</p>
                </div>


        </div>
</div>

</div>
  );
};

export default FaqPage;
