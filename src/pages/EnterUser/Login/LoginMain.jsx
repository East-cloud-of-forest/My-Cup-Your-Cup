import { React, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './LoginMain.scss'
import BrandButton from '../../../components/Login/BrandButton'
import SearchID from '../../../components/Login/SearchID/SearchID'
import SearchPassword from '../../../components/Login/SearchPassword/SearchPassword'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Googlelogo from '../../../components/Login/img/googleicon.svg'
import Facebooklogo from '../../../components/Login/img/facebookicon.svg'
import { loginUserModule } from '../../../modules/enteruser'
import {
  emailLogin,
  googleLoginPopup,
  saveLoginInfo,
} from '../../../datasources/firebase'

import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth'
const auth = getAuth()

const LoginMainPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navi = useNavigate()

  // input 창 입력
  const inputEmail = (e) => {
    setEmail(e.target.value)
  }
  const inputPassword = (e) => {
    setPassword(e.target.value)
  }

  // 로그인 모듈 dispatch
  const loginUser = useCallback((user) => dispatch(loginUserModule(user)), [
    dispatch,
  ])

  // 로그인 유저 정보 가져오기 기능
  const userInfo = auth.currentUser

  // 구글 로그인 버튼 클릭시 구글 로그인
  function GoogleLoginClick() {
    saveLoginInfo('session').then(async () => {
      return await googleLoginPopup()
        .then((result) => {
          loginUser(result.user)
          const hiGoogleUser = result.user.displayName
          alert(`환영합니다 ${hiGoogleUser}님, 구글 로그인 되었습니다.`)
          navi('/')
        })
        .catch((e) => {
          alert('구글로그인에 실패 했습니다.')
          console.log(e)
        })
    })
  }

  // 이메일, 비밀번호 미입력시 출력
  const [emailAlert, setEmailAlert] = useState(false)
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [emailAndPasswordAlert, setEmailAndPasswordAlert] = useState(false)

  // 이메일 로그인
  function emailLoginClick() {
    if (email === '') {
      // alert("이메일을 입력하세요")
      setEmailAlert(true)
      setPasswordAlert(false)
      setEmailAndPasswordAlert(false)
    } else if (password === '') {
      // alert("비밀번호를 입력하세요")
      setPasswordAlert(true)
      setEmailAlert(false)
      setEmailAndPasswordAlert(false)
    } else if (password !== '') {
      emailLogin(email, password)
        .then((result) => {
          loginUser(result.user)
          const hiEmailUser = userInfo.email
          alert(`어서오세요, ${hiEmailUser}님, 이메일 로그인 되었습니다.`)
          navi('/')
        })
        .catch((e) => {
          // alert(`이메일 또는 비밀번호를 잘못 입력하셨습니다, 입력하신 내용을 다시 확인해주세요.`)
          setEmailAlert(false)
          setPasswordAlert(false)
          setEmailAndPasswordAlert(true)
          console.log(e)
        })
    }
  }

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
            <section className="Loginlogin_input_section_wrap">
              <div className="Loginlogin_input_wrap">
                <span className="icon">
                  <FontAwesomeIcon icon={regular('user')} />
                </span>
                <input
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  onChange={inputEmail}
                />
              </div>
              <div className="Loginlogin_input_wrap password_wrap">
                <span className="icon">
                  <FontAwesomeIcon icon={solid('unlock-keyhole')} />
                </span>
                <input
                  placeholder="비밀번호를 입력해주세요"
                  type="text"
                  onChange={inputPassword}
                />
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
                <ButtonComp color="mint" onClick={emailLoginClick}>
                  로그인
                </ButtonComp>
              </div>

              <div className="Alert">
                {emailAlert && (
                  <div>
                    <p>
                      <strong>이메일</strong>을 입력해주세요
                    </p>
                  </div>
                )}
                {passwordAlert && (
                  <div>
                    <p>
                      <strong>비밀번호</strong>를 입력해주세요
                    </p>
                  </div>
                )}
                {emailAndPasswordAlert && (
                  <div>
                    <p>
                      <strong>이메일</strong> 또는 <strong>비밀번호</strong>를
                      잘못 입력하셨습니다.
                      <br />
                      입력하신 내용을 다시 확인해주세요.
                    </p>
                  </div>
                )}
              </div>
            </section>
            <div className="Logincontainer">
              <div className="or_box">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <BrandButton src={Googlelogo} color="white">
                <p onClick={GoogleLoginClick}>Google 로 로그인</p>
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
