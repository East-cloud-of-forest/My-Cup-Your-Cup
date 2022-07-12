import { logDOM } from "@testing-library/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from 'react'

import "../QnA/QnAmenu.scss";

const QnAmenu = () => {


  return (
    <div>
      <div className="QnAmain_Name">
        <h1>제품 문의</h1>
      </div>

      <div className="QnAmain_header">
        <Link
          className="FAQ"
          to="/QnAmenu/FaqPage"
          style={{ textDecoration: "none" }}
        >
          <div>
            <span>자주 묻는 질문</span>
          </div>
        </Link>

        <Link
          className="my_quastion"
          to="/QnAmenu/MyQuastion"
          style={{ textDecoration: "none" }}
        >
          <div>
            <span>나의 문의게시글</span>
          </div>
        </Link>

        <Link
          className="ask"
          to="/QnAmenu/Ask"
          style={{ textDecoration: "none" }}
        >
          <div>   
            <span>1:1 문의</span>
          </div>
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default QnAmenu;
