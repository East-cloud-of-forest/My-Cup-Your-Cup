import React from "react";

import "../QnA/MyQuastion.scss";
import { Link, Outlet, useParams } from "react-router-dom";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

import { propTypes } from "react-bootstrap/esm/Image";

import { useState } from "react";
import Ask from "./Ask";
import App from "../../App";
import { useEffect } from "react";
import {
  getFirebaseData,
  userGetFirebaseData,
  deleteFirebaseData,
} from "../../datasources/firebase";
import TotalPriceComp from "../../components/Cart/TotalPriceComp";

import PostPage from "./PostPage";
import UpdatePost from "./UpdatePost";
import { useSelector } from "react-redux";

import { doc, deleteDoc } from "firebase/firestore";

const MyQuastion = (props) => {
  // 게시글 데이터
  const [post, setPost] = useState([]);
  const params = useParams();

  // 게시판 세부 기능 컨트롤
  const [mode, setMode] = useState();
  const [id, setId] = useState(null);

  let title,
    body,
    category,
    date = null;
  let postText = null;
  let update_delete = null;
  let updateArea = null;

  //////////////////// 파이어 베이스 관련 ///////////////////////

  const { user } = useSelector((a) => a.enteruser);

  const getPost = async () => {
    let postArray = [];
    await userGetFirebaseData("inquiry", user.uid).then((r) => {
      r.forEach((doc) => {
        const data = doc.data();

        const DATE = new Date(data.createdAt);

        const year = DATE.getFullYear();
        const month = DATE.getMonth() + 1;
        const date = DATE.getDate();

        postArray.push({
          id: doc.id,
          category: data.category,
          date: year + "년 " + month + "월" + date + "일",
          title: data.title,
          body: data.body,
        });
      });
    });
    setPost(postArray);
    setMode("READ");
  };

  // 웹페이지가 리 렌더링 될때마다 getPost 함수를 실행.
  useEffect(() => {
    user !== null && getPost();
  }, [user]);

  //////////////////// 파이어 베이스 관련 ///////////////////////

  // 게시글 출력
  let list = [];

  for (let i = 0; i < post.length; i++) {
    let p = post[i];

    list.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{p.category}</td>
        <td
          className="title_Menu"
          onClick={(e) => {
            e.preventDefault();
            updateArea = null;
            setMode("READ");
          }}
        >
          <Link to={"/QnAmenu/MyQuastion/" + p.id}>{p.title}</Link>
        </td>
        <td>가입회원</td>
        <td>{p.date}</td>
        <td className="answer">답변준비중</td>
      </tr>
    );

    // firestore 저장된 게시글 출력
    if (mode === "READ") {
      for (let i = 0; i < post.length; i++) {
        if (post[i].id === id) {
          title = post[i].title;
          body = post[i].body;
        }

        // 게시글 보기 div에 게시글 출력
        postText = <PostPage title={title} body={body} />;

        update_delete = (
          <div>
            {/* 게시글 수정 */}
            <Link
              to="/QnAmenu/update"
              onClick={(e) => {
                e.preventDefault();
                setMode("UPDATE");
              }}
            >
              <button>수정하기</button>
            </Link>
            | |{/* 게시글 삭제 */}
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

                // setPost(NewPost);
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
            // setPost(NewPost);
          }}
          // useState Post의 title,body,category,date를 UpdatePost에 props로 전달
          title={title}
          body={body}
          category={category}
          date={date}
        />
      );
    }
  }

  return (
    <div>
      <div className="board">
        <div>
          {params.id === undefined ? (
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
          ) : (
            <PostPage post={post} />
          )}
        </div>
      </div>

      {/* 게시글 조회, 수정, 삭제 */}
      <div className="Update_Box">
        <div className="Update_Box2">
          {updateArea}
          {update_delete}
        </div>
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




// - 문의글 파이어베이스 수정, 삭제 기능


