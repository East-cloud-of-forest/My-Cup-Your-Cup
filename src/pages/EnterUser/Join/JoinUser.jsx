
import { React, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import './JoinUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'

// 파이어베이스 fireStore 컬랙션 생성 기능 가져오기
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../datasources/firebase";

// 파이어베이스 인증, 가입 기능 가져오기
import { getAuth, createUserWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth'


const JoinPage = () => {
  const { search } = useLocation()
  // 동의서
  const agreeObj = queryString.parse(search)

const navi = useNavigate()

  //////////////////  파이어베이스 회원가입 기능 구현 ////////////////
  const auth = getAuth();

  const [emailInput, setEmailInput] = useState('')
  const [password, setPassword] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')

// 이메일 비밀번호 onChange
  const InputEmail = (e) => {
    setEmailInput(e.target.value)
  }
  const signupPassword = (e) => {
    setPassword(e.target.value)
  }

  // 이름, 휴대폰번호 onChange
  const InputName = (e) => {
    setNameInput(e.target.value)
  }
  const InputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  } 

  // 생년월일 onChange
  const inputYear = (e) => {
      setBirthYear(e.target.value)
  }
  const inputMonth = (e) => {
      setBirthMonth(e.target.value)
    }
  const inputDate = (e) => {
      setBirthDate(e.target.value)
  }

  // 성별 선택 onChange
  const genderChange = (e) => {
      console.log(e.target.value)
      setGender(e.target.value)
  }

// 회원가입 기능 실행
function Join(emailInput, password) {

  signupEmail(emailInput, password)
  .then((userData) => {

    onAuthStateChanged(auth, (userData) => {

      if (userData) {
        const uid = userData.uid

        setDoc(doc(db, "user", uid), {
          userName: nameInput,
          birth: `${birthYear}년 ${birthMonth}월 ${birthDate}일`,
          gender: gender,
          phone: phoneNumber,
        })
      }
      loginSuccess();
    })
      // const user = result.user;
  })
  .catch(() => {
      alert('회원가입 실패')
  })
}

const signupEmail = () => {
  return createUserWithEmailAndPassword(auth, emailInput, password)
};
const loginSuccess = () => {
  alert('회원가입이 완료 되었습니다')
  navi('/')
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
              <input onChange={signupPassword} className="Joinsignup_pw" type="password"></input>
            </span>

            {/* <h3 className="Jointext">비밀번호 재확인</h3>
            <span className="Joinsignup_input">
              <input className="Joinsignup_pww" type="text"></input>
            </span> */}
          </div>

          <div className="Joinname_birth_gender_email">
            <h3 className="Jointext">이름</h3>

            <span className="Joinsignup_input">
              <input onChange={InputName} className="Joinsignup_name" type="text"></input>
            </span>

            <h3 className="Jointext">생년월일</h3>

            <span className="JoinbirthOption">
              <span className="Joinsignup_input_birth">
                <input
                  onChange={inputYear}
                  className="Joinsignup_birth_yy"
                  type="text"
                  placeholder="년(4자)"
                  maxLength="4"
                ></input>
              </span>

              <span className="Joinsignup_input_birth">
                <input onChange={inputMonth}
                className="Joinsignup_birth_mm"
                type="text" placeholder='월' maxLength="2">
                  {/* <option value="month" id="optionn">월</option>
                  <option value="1" id="one">1</option>
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
                  <option value="12">12</option> */}
                </input>
              </span>

              <span className="Joinsignup_input_birth">
                <input
                  onChange={inputDate}
                  className="Joinsignup_birth_dd"
                  type="text"
                  placeholder="일"
                  maxLength="2"
                ></input>
              </span>
            </span>

            <h3 className="Jointext">성별</h3>

            <span className="Joinsignup_input">
              <select onChange={genderChange} className="Joinsignup_gender" name="gender">
                <option value="성별 선택">성별 선택</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
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
                  placeholder="휴대폰 번호를 입력해주세요"
                  onChange={InputPhoneNumber}
                  maxLength="11"
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
