
import React from 'react'
import { useSelector } from 'react-redux'

import '../QnA/Ask.scss'

import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../datasources/firebase';



const Ask = (props) => {

    const {user} = useSelector(a=>a.enteruser)
    // console.log(user)   현재 로그인 회원 정보를 콘솔로그에 출력시킴

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
 

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



    function createCollection() {

        // 만약 사용자가 로그인했을 경우 1:1 문의가 등록되게
        if (user) {

        // 게시판 create기능 구현할떄 push 기능 쓴걸 참고해서 비슷하게 만들어보기
        setDoc(doc(db, "post", user.uid), {
            날짜: [
                {
                    title: title,
                    body: body,
                    category: category,
                    date: year+"년"+month+"월"+day+"일"
                }
            ]
    })

    alert("firestore에 게시글 데이터가 등록되었습니다")
        }

        // 사용자가 로그인하지 않았을 경우 alert 출력
        else {
            alert("1:1 문의를 이용하기 위해 로그인을 해주세요")
        }
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