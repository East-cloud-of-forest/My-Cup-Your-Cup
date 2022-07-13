import React from "react";
import { useSelector } from "react-redux";

import "../QnA/Ask.scss";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { addFirebaseData, db } from "../../datasources/firebase";

import { useNavigate } from "react-router-dom";

const Ask = (props) => {
  const { user } = useSelector((a) => a.enteruser);
  // console.log(user)   현재 로그인 회원 정보를 콘솔로그에 출력시킴

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const inputTitle = (e) => {
    setTitle(e.target.value);
  };
  const inputBody = (e) => {
    setBody(e.target.value);
  };
  const categoryChoice = (e) => {
      setCategory(e.target.value);
  }

  async function createCollection () {

    await addFirebaseData("inquiry", {
      uid: user.uid,
      createdAt: Date.now(),
      title: title,
      body: body,
      category: category,
    });

    alert("firestore에 게시글 데이터가 등록되었습니다");
    navigate("/QnAmenu/MyQuastion")
  }

  return (
    <div>
      <main className="Ask_page">
        <div className="ask_box">
          <form
            onSubmit={(e) => {
              // 새로고침 방지
              e.preventDefault();
              // 파이어베이스 firestore로 게시글 데이터 전송
                createCollection();
            }}
          >
            <hr />
            <div className="title">
              <h3>제목</h3>
              <input
                name="title"
                type="text"
                value={title}
                onChange={inputTitle}
              />
            </div>

            <hr />

            <div className="category">
              <h3>상담 분류</h3>
              <select onChange={categoryChoice} className="category_select">
                <option value="category">카테고리 선택</option>
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

            <input type="submit" className="send_buttonn" value="문의하기" />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Ask;
