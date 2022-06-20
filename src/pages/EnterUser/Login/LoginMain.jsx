import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginMain.scss'
import BrandButton from '../../../components/Login/BrandButton'
import SearchID from '../../../components/Login/SearchID/SearchID'
import SearchPassword from '../../../components/Login/SearchPassword/SearchPassword'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Googlelogo from '../../../components/Login/img/googleicon.svg'
import Facebooklogo from '../../../components/Login/img/facebookicon.svg'



/////////////////////  파이어베이스 로그인 기능 구현  ///////////////////////////////////////////

import { getAuth, signInWithPopup, GoogleAuthProvider,
        signInWithEmailAndPassword } from 'firebase/auth'
/*
로그인 기능 구현 중 아래의 문제로 부득이하게 LoginMain에 입력함
(Firebase: No Firebase App '[DEFAULT]' has been created - call Firebase App.initializeApp() (app/no-app).)
*/
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCYX6ARJoL4o85wYhRK9vtTzsXiOBhhk1w",
  authDomain: "mycup-yourcup.firebaseapp.com",
  projectId: "mycup-yourcup",
  storageBucket: "mycup-yourcup.appspot.com",
  messagingSenderId: "276042250201",
  appId: "1:276042250201:web:b2f5b07a67e315699c8bc8",
  measurementId: "G-F8RG45WD8Q",
};
const app = initializeApp(firebaseConfig);


    // 구글 로그인 버튼 클릭시 구글 로그인
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const loginGoogle = () => {
      return signInWithPopup(auth, provider);
    }
    function GoogleLoginButton() {
      loginGoogle()
      .then((result) => {
          const user = result.user;
          loginSuccess(user.email, user.displayName);
      })
      .catch(() => {
          alert('구글로그인 기능 실패')
      })
  }
  const loginSuccess = (email, name) => {
    alert('로그인 성공')
    const login_area = document.getElementById('login-area');
    login_area.innerHTML =
    `<h2>Login 성공, 환영합니다 ${name}님 <br>
    ${email}</h2>`;
}


const LoginMainPage = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputEmail = (e) => {
    setEmail(e.target.value)
  }
  const inputPassword = (e) => {
    setPassword(e.target.value)
  }
const emailLogin = () => {
    return signInWithEmailAndPassword(auth, email, password)
}
  function 로그인(email, password) {
    emailLogin()
    .then((result) => {
      const user = result.user;
      loginSuccess(user.email, user.displayName)
    })
    .catch((error) => {
      alert('이메일 로그인 실패')
      console.log(error)
    })
  }
/////////////////////  파이어베이스 로그인 기능 구현  ///////////////////////////////////////////


    /*아이디찾기 모달창 기능*/
  const [searchID, setSearchID] = useState(false)

  const openWindow = () => {
    setSearchID(true)
  }

  const closeWindow = () => {
    setSearchID(false)
  }

    /*아이디찾기 모달창 기능*/
  const [searchPassword, setSearchPassword] = useState(false)

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


                    {/* 로그인 기능 확인용 */}
                    <div id="login-area"></div>


            <section className="Loginlogin_input_section_wrap">
              <div className="Loginlogin_input_wrap">
                <span className="icon">
                  <FontAwesomeIcon icon={regular('user')} />
                </span>
                <input placeholder="이메일을 입력해주세요" type="email" onChange={inputEmail} />
              </div>
              <div className="Loginlogin_input_wrap password_wrap">
                <span className="icon">
                  <FontAwesomeIcon icon={solid('unlock-keyhole')} />
                </span>
                <input placeholder="비밀번호를 입력해주세요" type="password" onChange={inputPassword} />
              </div>
              <section className="Loginforget_account_p caption">
                <button className="Loginforget_account_a" onClick={openWindow}>
                  아이디 찾기
                </button>
                <button
                  className="Loginforget_account_a"
                  onClick={openWindowPS}
                >
                  비밀번호 찾기
                </button>
                <Link to="/enteruser/agree" className="Loginforget_account_a">
                  회원가입
                </Link>
              </section>
              <SearchID open={searchID} close={closeWindow} />
              <SearchPassword open={searchPassword} close={closeWindowPS} />
              <div className="Loginlogin_button_wrap">
                <ButtonComp color="mint" onClick={로그인}>로그인</ButtonComp>
              </div>
            </section>
            <div className="Logincontainer">
              <div className="or_box">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <BrandButton src={Googlelogo} color="white">
                <p onClick={GoogleLoginButton}>Google 로 로그인</p>
              </BrandButton>
              <BrandButton src={Facebooklogo} color="facebook">
                <p>Facebook 으로 로그인</p>
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginMainPage
