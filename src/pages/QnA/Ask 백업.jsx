
import React from 'react'

import '../QnA/Ask.scss'

import QnAmenu from './QnAmenu'


const Ask = () => {

    return (
        <div>
            
        <QnAmenu />


<main className="Ask_page">

<div className="ask_box">

<form>
    <hr />
        <div className="title">
            <h3>제목</h3>
            <input type="text" />
        </div>

    <hr />

        <div className="category">
            <h3>상담 분류</h3>
            <select className="category_select">
                <option value="회원">회원</option>
                <option value="배송">배송</option>
                <option value="주문">주문</option>
                <option value="결제">결제</option>
            </select>
        </div>

    <hr />

        <div className="ask_contents">
            <h3>문의내용</h3>
            <textarea></textarea>
        </div>
    <hr />

    <div className="send_button">문의하기</div>
</form>
    
</div>


</main>
        </div>
    )
}

export default Ask