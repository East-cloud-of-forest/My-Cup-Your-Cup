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

const LoginMainPage = () => {
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
                <input placeholder="아이디을 입력해주세요" type="text" />
              </div>
              <div className="Loginlogin_input_wrap password_wrap">
                <span className="icon">
                  <FontAwesomeIcon icon={solid('unlock-keyhole')} />
                </span>
                <input placeholder="비밀번호를 입력해주세요" type="password" />
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
                <ButtonComp color="mint">로그인</ButtonComp>
              </div>
            </section>
            <div className="Logincontainer">
              <div className="or_box">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <BrandButton src={Googlelogo} color="white">
                <p>Google 로 로그인</p>
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
