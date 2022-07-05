import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import './EditUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { addFirebaseData, createUser, setFirebaseData, uploadFirestorage } from '../../../datasources/firebase'
import { updateProfile } from 'firebase/auth'
import { useSelector } from 'react-redux'

const EditUser = () => {
  const { search } = useLocation()

  const navi = useNavigate()

  //////////////////  파이어베이스 회원가입 기능 구현 ////////////////
  const [profilePic, setProfilePic] = useState(null)
  const [photoURL, setPhotoURL] = useState(null)
  const [password, setPassword] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const { user } = useSelector((user) => user.enteruser)

  // 프로필사진 업로드
  const InputFile = (e) => {
    setProfilePic(e.target.files[0]); 
  }
  // 비밀번호 onChange
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

  // 파이어스토리지에 사진 올리기
  useEffect( () => {
    const uploadFile = () => {
    const name = new Date().getTime() + profilePic.name;
    uploadFirestorage('user', name, profilePic).then(
      result => {
        setPhotoURL(result)
        console.log(result)}
    )
    
  }
  profilePic && uploadFile()
  profilePic && console.log("file uploaded") 
}, [profilePic])


  // 수정 기능 실행
  function editProfile(user) {
  
  }

  return (
    <main className="JoinMain">
      <div className="Joinmain_signup">
        <section className="Joinsignup_wrap">
          <div className='.Join_photoURL'>
            <h2> 프로필 수정</h2>
          <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profile"
            />
          <input
            onChange={InputFile}
            className="Joinsignup_id"
            type="file"
            style={{display: "block"}}
            />
          </div>
          {/* <div className="Joinid_password_input">

            <h3 className="Jointext">비밀번호</h3>
            <span className="Joinsignup_input">
              <input
                onChange={signupPassword}
                className="Joinsignup_pw"
                type="password"
              ></input>
            </span>
          </div> */}

          <div className="Joinname_birth_gender_email">
            <h3 className="Jointext">이름</h3>

            <span className="Joinsignup_input">
              <input
                onChange={InputName}
                className="Joinsignup_name"
                type="text"
              ></input>
            </span>

            {/* <h3 className="Jointext">생년월일</h3>

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
                <input
                  onChange={inputMonth}
                  className="Joinsignup_birth_mm"
                  type="text"
                  placeholder="월"
                  maxLength="2"
                >
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
            </div> */}
          </div>

          <div className="btn_box">
            <ButtonComp color="mint" onClick={() => editProfile(user)}>
              <h4 style={{ padding: 0, margin: 0 }}>수정하기</h4>
            </ButtonComp>
          </div>
        </section>
      </div>
    </main>
  )
}

export default EditUser
