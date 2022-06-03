
import React from "react";
import { Link } from "react-router-dom";
import "../Login/LoginMain.scss";

import GoolgeButton from "../../components/Login/GoolgeButton"
import FacebookButton from "../../components/Login/FacebookButton"

const LoginMainPage = () => {
  return (
    <main className="LoginMain">
      <div>
        <div className="main-container">
          <div className="main-wrap">

              <div className="logo-wrap">
                <h1>로그인 페이지</h1>
              </div>


            <section className="login-input-section-wrap">
              <div className="login-input-wrap">
                <input placeholder="아이디을 입력하세요" type="text" />
              </div>

              <div className="login-input-wrap password-wrap">
                <input placeholder="비밀번호를 입력하세요" type="password" />
              </div>

              <div className="login-button-wrap">
                <a href="">
                  <button>로그인</button>
                </a>
              </div>
            </section>

            <section className="forget-account-p">
              <p>
                <a href="" className="forget-account-a">
                  아이디 찾기
                </a>{" "}
                |{" "}
                <a href="" className="forget-account-a">
                  비밀번호 찾기
                </a>{" "}
                |{" "}
                <a href="Join" className="forget-account-a">
                  회원가입
                </a>
              </p>
            </section>
        
            <div className="container">
              <h2>간편 로그인 버튼</h2>

              <GoolgeButton />

              <FacebookButton />

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginMainPage;
