import React from "react";
import { Link } from "react-router-dom";

import "../QnA/QnAmenu.scss";

const QnAmenu = () => {
  return (
    <div>
      

        <div className="QnAmain_Name">
                <h1>제품 문의</h1>
        </div>

        <div className="QnAmain_header">

        <div className="FAQ">
        <Link to="/QnAmenu/FaqPage" style={{ textDecoration: 'none' }}>
          <span>자주 묻는 질문</span>
        </Link>
        </div>

        <div className="my_quastion">
        <Link to="/QnAmenu/MyQuastion" style={{ textDecoration: 'none' }}>
          <span>나의 문의게시글</span>
        </Link>
        </div>

        <div className="ask">
        <Link to="/QnAmenu/Ask" style={{ textDecoration: 'none' }}>
          <span>문의하기</span>
        </Link>
        </div>

      </div>
    </div>
  );
};

export default QnAmenu;
