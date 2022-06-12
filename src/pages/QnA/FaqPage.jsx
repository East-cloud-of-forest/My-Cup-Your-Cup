import React from "react";

import "../QnA/FaqPage.scss";

import QnAmenu from './QnAmenu'


const FaqPage = () => {

    return (
<div>

    <QnAmenu />

    <div className="FAQ_main">

        <div className="FAQmain_header">
            <h1>FAQ</h1>

            <h4>FAQ(자주 묻는 질문)을 참고하시면 빠른 문의 해결이 가능합니다.</h4>
            <h4>1:1 채팅 상담을 원하시나요? 아래의 버튼을 클릭해주세요</h4>

            <div className="chat_button">
                <span>1:1 채팅 상담 요청</span>
            </div>
        </div>

        <div className="FAQ_contents">
            <hr />
                <span>[ 회원 ]</span>
                <p>회원가입은 어떻게 하나요?</p>
            <hr />
                <span>[ 주문 ]</span>
                <p>주문 제품 취소하는 법</p>
            <hr />
                <span>[ 결제 ]</span>
                <p>상품 결제 방법</p>
            <hr />
                <span>[ 배송 ]</span>
                <p>반품, 교환 방법</p>
            <hr />
        </div>

    </div>

</div>
    );
};

export default FaqPage;
