
import React from 'react'
import { useSelector } from 'react-redux'

import '../QnA/Ask.scss'

import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../datasources/firebase';



const Ask = (props) => {
    const {user} = useSelector(a=>a.enteruser)
    console.log(user)

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

    const [number, setNumber] = useState(1)
 

    const inputTitle = (e) => {
        setTitle(e.target.value)
    } 
    const inputBody = (e) => {
        setBody(e.target.value)
    }
    const categoryChoice = (e) => {
        setCategory(e.target.value)
    }

    const date = new Date();

    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()

    // 게시글 데이터가 유저 uid문서의 날짜 객체 안에 들어가게

    function createCollection() {


        // 게시판 create기능 구현할떄 push 기능 쓴걸 참고해서 비슷하게 만들어보기
        setDoc(doc(db, "post", user.uid), {
            num: [
                {
                    title: title,
                    body: body,
                    category: category,
                    date: year+"년"+month+"월"+day+"일"
                }
            ]
      })
      setNumber(num)

    alert("firestore에 게시글 데이터가 등록되었습니다")
    }


    return (
        <div>

<main className="Ask_page">

<div className="ask_box">


<form onSubmit={(e) => {

    // 새로고침 방지
    e.preventDefault();

    // 파이어베이스 firestore로 게시글 데이터 전송
    createCollection()
}}>
    <hr />
        <div className="title">
            <h3>제목</h3>
            <input name="title" type="text" value={title} onChange={inputTitle}/>
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
            <textarea name="body" value={body} onChange={inputBody} />
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