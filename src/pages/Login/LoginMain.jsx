
import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../Login/LoginMain.scss";

import GoolgeButton from "../../components/Login/GoolgeButton"
import FacebookButton from "../../components/Login/FacebookButton"


import SearchID from '../../components/Login/SearchID/SearchID'
import SearchPassword from '../../components/Login/SearchPassword/SearchPassword'


const LoginMainPage = () => {

    {/*아이디찾기 모달창 기능*/}
    const [ searchID,setSearchID ] = useState(false)

    const openWindow = () => {
      setSearchID(true)
    }

    const closeWindow = () => {
      setSearchID(false)
    }


        {/*아이디찾기 모달창 기능*/}
        const [ searchPassword,setSearchPassword ] = useState(false)

        const openWindowPS = () => {
          setSearchPassword(true)
        }
    
        const closeWindowPS = () => {
          setSearchPassword(false)
        }


        
  return (
    <main className="LoginLogin_Main">
      <div>
        <div className="Loginmain_container">
          <div className="Loginmain_wrap">

              <div className="Loginlogo_wrap">
                <h1>로그인 페이지</h1>
              </div>

            <section className="Loginlogin_input_section_wrap">
              <div className="Loginlogin_input_wrap">
                <input placeholder="아이디을 입력하세요" type="text" />
              </div>

              <div className="Loginlogin_input_wrap password_wrap">
                <input placeholder="비밀번호를 입력하세요" type="password" />
              </div>

              <div className="Loginlogin_button_wrap">
                <a href="">
                  <button>로그인</button>
                </a>
              </div>
            </section>

            <section className="Loginforget_account_p">
              <p>
                <button className="Loginforget_account_a" onClick={openWindow}>
                  아이디 찾기
                </button>{" "}
                |{" "}
                <button className="Loginforget_account_a" onClick={openWindowPS}>
                  비밀번호 찾기
                </button>{" "}
                |{" "}
                <a href="Join" className="Loginforget_account_a">
                  회원가입
                </a>
              </p>
            </section>


          <SearchID open={searchID} close={closeWindow} />
          <SearchPassword open={searchPassword} close={closeWindowPS} />

        
            <div className="Logincontainer">
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
