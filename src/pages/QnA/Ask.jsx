
import React from 'react'

import '../QnA/Ask.scss'

import QnAmenu from './QnAmenu'

import { useState } from 'react'



const Ask = (props) => {

    const [category, setCategory] = useState("");

    const categoryChoice = (e) => {
        setCategory(e.target.value)
    }

    const date = new Date();

    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()


    return (
        <div>
            
        <QnAmenu />

        <button onClick={() => {

            let num = 1;

            props.test(num)
            alert("Ask에서 app.js로 데이터1 전송함")

        }}>데이터 전송 테스트</button>

<main className="Ask_page">

<div className="ask_box">


<form onSubmit={(e) => {

    let title = e.target.title.value
    let body = e.target.body.value

    
    // 게시글 데이터 전송
    props.newPost(title, body, category, year, month, day)
}}>
    <hr />
        <div className="title">
            <h3>제목</h3>
            <input name="title" type="text" />
        </div>

    <hr />

        <div className="category">
            <h3>상담 분류</h3>
            <select onChange={categoryChoice} className="category_select">
                <option value="">카테고리 선택</option>
                <option value="회원">회원</option>
                <option value="배송">배송</option>
                <option value="주문">주문</option>
                <option value="결제">결제</option>
            </select>
        </div>

    <hr />

        <div className="ask_contents">
            <h3>문의내용</h3>
            <textarea name="body" />
        </div>
    <hr />

    <input type="submit" className="send_button" value="문의하기" />
</form>
    
</div>


</main>
        </div>
    )
}

export default Ask