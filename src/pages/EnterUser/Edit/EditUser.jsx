import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EditUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { uploadFirestorage } from '../../../datasources/firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { getAllByTestId } from '@testing-library/react'

const EditUser = () => {
  const { search } = useLocation()
  const navi = useNavigate()

  //////////////////  파이어베이스 회원가입 기능 구현 ////////////////
  const [profilePic, setProfilePic] = useState(null)
  const [photoURL, setPhotoURL] = useState(null)
  const [nameInput, setNameInput] = useState('')
  const { user } = useSelector((user) => user.enteruser)
  // console.log(user.uid)
  // console.log(getAuth().currentUser)
  // 프로필사진 업로드
  const InputFile = (e) => {
    setProfilePic(e.target.files[0]); 
  }

  // 이름, 휴대폰번호 onChange
  const InputName = (e) => {
    setNameInput(e.target.value)
  }


  // 파이어스토리지에 사진 올리기
  useEffect( () => {
    const uploadFile = () => {
    const name = new Date().getTime() + profilePic.name;
    uploadFirestorage('user', name, profilePic).then(
      result => {
        setPhotoURL(result)
      }
    )}
    profilePic && uploadFile()
  }, [profilePic])

  // 수정 기능 실행
  // store user 문서도 업데이트
  const editProfile = async () => {
    const auth = getAuth()
    console.log(nameInput, photoURL)
    updateProfile(auth.currentUser, {
      displayName: nameInput,
      photoURL: photoURL,
    })
    .then(() => {
      console.log('Successfully updated user');
    })
    .then( ()=> {
      navi('/')
      window.location.reload()
    } )
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  }
  // 이름 입력 안했을시 
  const noName = () => {
    if (nameInput == '' ) {
      alert('이름을 입력해주세요')
    } else return;
  }

  return (
    <main className="JoinMain">
      <div className="Joinmain_signup">
        <section className="Joinsignup_wrap">
            <h2> 프로필 수정</h2>
            <div className='.Join_photoURL'>
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profile"
              />
            <div className="filebox">
              <label htmlFor="file" >
                파일찾기
              </label> 
              <input type="file" onChange={InputFile} id="file" style={{display: "none"}}/>
              <span onClick={()=>{
                setPhotoURL('')
                console.log(photoURL)
                }} >프로필사진 삭제</span>
            </div>
          </div>

          <div className="Joinname_birth_gender_email">
            <h3 className="Jointext">이름</h3>

            <span className="Joinsignup_input">
              <input
                onChange={InputName}
                className="Joinsignup_name"
                type="text"
              ></input>
            </span>
          </div>

          
          <div className="btn_box">
            { nameInput ? (
            <ButtonComp color="mint" onClick={() => editProfile()}>
              <h4 style={{ padding: 0, margin: 0 }}>수정하기</h4>
            </ButtonComp>) : (
            <ButtonComp color="mint" onClick={() => noName()}>
              <h4 style={{ padding: 0, margin: 0 }}>수정하기</h4>
            </ButtonComp>
            )}
            
          </div>
        </section>
      </div>
    </main>
    
  )
}

export default EditUser
