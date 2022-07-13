import React from "react";

import "../QnA/MyQuastion.scss";
import { Link } from "react-router-dom";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

import { propTypes } from "react-bootstrap/esm/Image";

import { useState } from "react";
import Ask from "./Ask";
import App from "../../App";
import { useEffect } from "react";
import {
  getFirebaseData,
  userGetFirebaseData,
} from "../../datasources/firebase";
import TotalPriceComp from "../../components/Cart/TotalPriceComp";

import PostPage from "./PostPage";
import UpdatePost from "./UpdatePost";
import { useSelector } from "react-redux";

const MyQuastion = (props) => {
  const { user } = useSelector((a) => a.enteruser);

  const [titleBox, setTitleBox] = useState(null);
  const [categoryBox, setCategoryBox] = useState(null);
  const [dateBox, setDateBox] = useState(null);
  const [bodyBox, setBodyBox] = useState(null);

  ////// firestore에 저장된 데이터 꺼내쓰는 코드 ★중요★ ////////

  let firebase_postData = null;

  const getPost = () => {
    // firestore에 있는 post 컬렉션 데이터를 호출한다
    userGetFirebaseData("inquiry", user.uid).then((r) => {
      r.forEach((doc) => {
        const data = doc.data();
        console.log(data);
      });
    });
    // getFirebaseData('post')
    // // 성공적으로 호출됬을 경우 post 컬렉션을 result 매개변수에 담아 함수 실행
    // .then((result) => {
    //     // result를 doc매개변수에 담아서 forEach 반복출력 실행
    //     result.forEach((doc)=> {
    //         // firebase_postData변수에 post 컬렉션 할당
    //         firebase_postData = doc.data()

    //         // 반복문이므로 1번 반복시 aa값이 바뀜
    //         // 바뀐 값이 사라지지 않게 다른 곳에 저장
    //         setTitleBox(firebase_postData.날짜[0].title)
    //         setCategoryBox(firebase_postData.날짜[0].title)
    //         setDateBox(firebase_postData.날짜[0].title)
    //         setBodyBox(firebase_postData.날짜[0].title)
    //         alert("getPost 함수 정상 실행")

    //         addNewPost()
    //     })
    // })
  };
  /////////////////////////////////////////////////////////////////

  const addNewPost = () => {
    const newPost1 = {
      id: nextId,
      category: categoryBox,
      date: dateBox,
      title: titleBox,
      body: bodyBox,
    };
    const newPost2 = [...post];

    newPost2.push(newPost1);

    setPost(newPost2);

    setMode("READ");
  };

  // 웹페이지가 리 렌더링 될때마다 getPost 함수를 실행.
  useEffect(() => {
    user !== null && getPost();
  }, [user]);

  // 게시글 데이터
  const [post, setPost] = useState([
    {
      id: 1,
      category: "회원",
      date: "날짜",
      title: "게시글 제목",
      body: "게시글내용 출력",
    },
    {
      id: 2,
      category: "배송",
      date: "날짜",
      title: "게시글 제목2",
      body: "2번째 게시글 내용",
    },
  ]);

  // 게시판 세부 기능 컨트롤
  const [mode, setMode] = useState();
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);

  // firestore에서 가져온 게시글 데이터 저장
  const [firestoreBODY, setfirestoreBODY] = useState("임의 내용");
  const [firestoreCATEGORY, setfirestoreCATEGORY] = useState("임의 카테고리");
  const [firestoreDATE, setfirestoreDATE] = useState("2022년 0월0일");
  const [firestoreTITLE, setfirestoreTITLE] = useState("임의 제목");

  let title,
    body,
    category,
    date = null;
  let postText = null;
  let update_delete = null;
  let updateArea = null;

  // 올려진 게시글 출력
  if (mode === "READ") {
    for (let i = 0; i < post.length; i++) {
      if (post[i].id === id) {
        title = post[i].title;
        body = post[i].body;
      }

      // 게시글 보기
      postText = <PostPage title={title} body={body} />;

      update_delete = (
        <div>
          {/* 게시글 수정 입력창 출력 */}
          <Link
            to="/QnAmenu/update"
            onClick={(e) => {
              e.preventDefault();
              setMode("UPDATE");
            }}
          >
            <button>수정하기</button>
          </Link>
          | |{/* 조회중인 게시글 삭제 */}
          <input
            type="button"
            value="삭제하기"
            onClick={() => {
              const NewPost = [];

              for (let i = 0; i < post.length; i++) {
                if (post[i].id !== id) {
                  NewPost.push(post[i]);
                }
              }
              setPost(NewPost);
            }}
          />
        </div>
      );
    }
  }

  // 게시글 수정 기능

  if (mode === "UPDATE") {
    postText = null; // 게시글 조회 off

    update_delete = null; // 수정하기 버튼 숨기기

    for (let i = 0; i < post.length; i++) {
      if (post[i].id === id) {
        title = post[i].title;
        body = post[i].body;
        category = post[i].category;
        date = post[i].date;
      }
    }

    updateArea = (
      <UpdatePost
        update_start={(_title, _body, _category, _date) => {
          const NewPost = [...post];
          const NewObject = {
            id: id,
            title: _title,
            body: _body,
            category: _category,
            date: _date,
          };

          for (let i = 0; i < NewPost.length; i++) {
            if (NewPost[i].id === id) {
              NewPost[i] = NewObject;
            }
          }
          setPost(NewPost);
        }}
        // useState Post의 title,body,category,date를 UpdatePost에 props로 전달
        title={title}
        body={body}
        category={category}
        date={date}
      />
    );
  }

  // 새로운 게시글 임의로 추가 기능
  function addPost() {
    const newPost2 = [...post];
    const newPost1 = {
      id: nextId,
      category: firestoreCATEGORY,
      date: firestoreDATE,
      title: firestoreTITLE,
      body: firestoreBODY,
    };

    newPost2.push(newPost1);

    setPost(newPost2);
    setNextId(nextId + 1);
  }

  // 게시글 출력 관련
  let list = [];

  for (let i = 0; i < post.length; i++) {
    let p = post[i];

    const ReadPostId = () => {
      setId(p.id);
    };

    list.push(
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.category}</td>

        <td>
          <Link
            to="/QnAmenu/PostPage/"
            onClick={(e) => {
              e.preventDefault();
              ReadPostId();
              updateArea = null;
              setMode("READ");
            }}
          >
            {p.title}
          </Link>
        </td>

        <td>가입회원</td>
        <td>{p.date}</td>
        <td className="answer">답변준비중</td>
      </tr>
    );
  }

  return (
    <div>
      <div className="board">
        <div>
          <table className="in_board">
            <thead className="menu">
              <tr>
                <th>번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>작성일</th>
                <th>진행상태</th>
              </tr>
            </thead>

            <tbody className="contents">{list}</tbody>
          </table>
        </div>
      </div>

      {/* 게시글 조회, 수정, 삭제 */}
      <div className="postText">
        <button onClick={addPost}>게시글 추가</button>

        {postText}
        {updateArea}
        {update_delete}
      </div>

      {/* 게시글 수정 */}
    </div>
  );
};

export default MyQuastion;

// 1. firestore 유저 uid문서 안에 여러 게시글 데이터를 저장하는 법

// 3. 게시글 데이터를 list로 출력하는 법

// OK 2. firestore 게시글 데이터를 가져오는 법 ★제일 중요★
// OK 4. Firestore에서 가져온 데이터를 useState에 저장하는 법
