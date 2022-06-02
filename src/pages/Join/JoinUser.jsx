import React from "react";
import { Link } from "react-router-dom";

import "../Join/JoinUser.scss";

import {Logo} from "../../components/index-comp/IndexComp"


const JoinPage = () => {
  return (

<main className="JoinMain">

    <div className="main-signup">
    
        <div>
          <Link to="" title="로고 이미지">
            <Logo style={{width:"50%", margin: "50px auto 40px auto"}} />
          </Link>
        </div>
      

      <section className="signup-wrap">
        <div className="id-password-input">
          <h3 className="text">아이디</h3>
          <span className="signup-input">
            <input className="signup-id" type="text"></input>
          </span>

          <h3 className="text">비밀번호</h3>
          <span className="signup-input">
            <input className="signup-pw" type="text"></input>
          </span>

          <h3 className="text">비밀번호 재확인</h3>
          <span className="signup-input">
            <input className="signup-pww" type="text"></input>
          </span>
        </div>

        <div className="name-birth-gender-email">
          <h3 className="text">이름</h3>

          <span className="signup-input">
            <input className="signup-name" type="text"></input>
          </span>

          <h3 className="text">생년월일</h3>

          <span className="birthOption">
            <span className="signup-input-birth">
              <input
                className="signup-birth-yy"
                type="text"
                placeholder="년(4자)"
              ></input>
            </span>

            <span className="signup-input-birth">
              <select className="signup-birth-mm" name="month">
                <option value="month">월</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </span>

            <span className="signup-input-birth">
              <input
                className="signup-birth-dd"
                type="text"
                placeholder="일"
              ></input>
            </span>
          </span>

          <h3 className="text">성별</h3>

          <span className="signup-input">
            <select className="signup-gender" name="gender">
              <option value="gender">성별</option>
              <option value="man">남자</option>
              <option value="woman">여자</option>
            </select>
          </span>

          <span className="choice">
            <h3 className="text">본인 확인 이메일</h3>
          </span>
          <span className="signup-input">
            <input
              className="signup-email"
              type="text"
              placeholder="선택입력"
            ></input>
          </span>
        </div>
      </section>
    </div>
</main>
  );
};

export default JoinPage;
