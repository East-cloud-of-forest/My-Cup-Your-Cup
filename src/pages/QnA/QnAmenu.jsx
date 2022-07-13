import { logDOM } from "@testing-library/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

import "../QnA/QnAmenu.scss";
import { useSelector } from "react-redux";

const QnAmenu = () => {
  const { user } = useSelector((a) => a.enteruser);

  const needlogin = () => {
    alert("1:1 문의를 이용하기 위해 로그인을 해주세요");
  };

  return (
    <div>
      <div className="QnAmain_Name">
        <h1>제품 문의</h1>
      </div>

      <div className="QnAmain_header">
        <Link className="FAQ" to="/QnAmenu" style={{ textDecoration: "none" }}>
          <div>
            <span>자주 묻는 질문</span>
          </div>
        </Link>

        {user ? (
          <Link
            className="my_quastion"
            to="/QnAmenu/MyQuastion"
            style={{ textDecoration: "none" }}
          >
            <div>
              <span>나의 문의게시글</span>
            </div>
          </Link>
        ) : (
          <Link
            onClick={needlogin}
            className="my_quastion"
            to=""
            style={{ textDecoration: "none" }}
          >
            <div>
              <span>나의 문의게시글</span>
            </div>
          </Link>
        )}

        {user ? (
          <Link
            className="ask"
            to="/QnAmenu/Ask"
            style={{ textDecoration: "none" }}
          >
            <div>
              <span>1:1 문의</span>
            </div>
          </Link>
        ) : (
          <div
            className="ask"
            to="/QnAmenu/Ask"
            style={{ textDecoration: "none" }}
            onClick={needlogin}
          >
            <div>
              <span>1:1 문의</span>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default QnAmenu;
