
import { React, useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import './JoinUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'


// 파이어베이스 인증, 가입 기능 가져오기
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'


const JoinPage = () => {
  const { search } = useLocation()
  // 동의서
  const agreeObj = queryString.parse(search)


  //////////////////  파이어베이스 회원가입 기능 구현 ////////////////
  const auth = getAuth();

  const [emailInput, setEmailInput] = useState('')
  const [password, setPassword] = useState('')
  const InputEmail = (e) => {
    setEmailInput(e.target.value)
}
const signupPassword = (e) => {
  setPassword(e.target.value)
}
function Join(emailInput, password) {
  signupEmail(emailInput, password)
  .then((result) => {
      const user = result.user;
      loginSuccess(user.email, user.uid);
  })
  .catch(() => {
      alert('회원가입 실패')
  })
}
const signupEmail = () => {
  return createUserWithEmailAndPassword(auth, emailInput, password)
};

const loginSuccess = () => {
  alert('회원가입 성공')
}
  
  //////////////////  파이어베이스 회원가입 기능 구현 ////////////////


  return (
    <main className="JoinMain">
      <div className="Joinmain_signup">
        <section className="Joinsignup_wrap">
          <div className="Joinid_password_input">
            <h3 className="Jointext">이메일</h3>
            <span className="Joinsignup_input">
              <input onChange={InputEmail} className="Joinsignup_id" type="email"></input>
            </span>

            <h3 className="Jointext">비밀번호</h3>
            <span className="Joinsignup_input">
              <input onChange={signupPassword} className="Joinsignup_pw" type="text"></input>
            </span>

            {/* <h3 className="Jointext">비밀번호 재확인</h3>
            <span className="Joinsignup_input">
              <input className="Joinsignup_pww" type="text"></input>
            </span> */}
          </div>

          <div className="Joinname_birth_gender_email">
            <h3 className="Jointext">이름</h3>

            <span className="Joinsignup_input">
              <input className="Joinsignup_name" type="text"></input>
            </span>

            <h3 className="Jointext">생년월일</h3>

            <span className="JoinbirthOption">
              <span className="Joinsignup_input_birth">
                <input
                  className="Joinsignup_birth_yy"
                  type="text"
                  placeholder="년(4자)"
                ></input>
              </span>

              <span className="Joinsignup_input_birth">
                <select className="Joinsignup_birth_mm" name="month">
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

              <span className="Joinsignup_input_birth">
                <input
                  className="Joinsignup_birth_dd"
                  type="text"
                  placeholder="일"
                ></input>
              </span>
            </span>

            <h3 className="Jointext">성별</h3>

            <span className="Joinsignup_input">
              <select className="Joinsignup_gender" name="gender">
                <option value="gender">성별</option>
                <option value="man">남자</option>
                <option value="woman">여자</option>
              </select>
            </span>

            {/* <span className="Joinchoice">
              <h3 className="Jointext">본인 확인 이메일 (불필요, 삭제)</h3>
            </span>
            <span className="Joinsignup_input">
              <input
                className="Joinsignup_email"
                type="text"
                placeholder="선택입력"
              ></input>
            </span> */}
          </div>

          <div className="JoininputPhone">
            <h3 className="Jointext">휴대전화</h3>

            <span className="Joinsignup_input">
              <select className="Joinsignup_country" name="country">
                <option value="ko">대한민국 +82</option>
              </select>
            </span>

            <div className="JoinphoneNumber">
              <span className="JoinphoneNumberSpan">
                <input
                  className="Joinsignup_phone"
                  type="text"
                  placeholder="휴대폰 번호 입력"
                ></input>
              </span>
            </div>
          </div>

          <div className='btn_box'>
            <ButtonComp color="mint" onClick={Join}>
              <h4 style={{padding:0, margin:0}}>가입하기</h4>
            </ButtonComp>
          </div>
        </section>
      </div>
    </main>
  )
}

export default JoinPage
