import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EditUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { uploadFirestorage } from '../../../datasources/firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { getAllByTestId } from '@testing-library/react'

const EditUser = () => {
  const { search } = useLocation();
  const navi = useNavigate();

  const { user } = useSelector((user) => user.enteruser);
  
  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [nameInput, setNameInput] = useState('');
  
  // 유저데이터 

  // 프로필사진 업로드
  const InputFile = (e) => {
    let photosrc = URL.createObjectURL(e.target.files[0])
    setProfilePic(photosrc); 
  }

  // 이름, onChange
  const InputName = (e) => {
    setNameInput(e.target.value)
  }

  // 파이어스토리지에 사진 올리기
  // useEffect( () => {

  //   profilePic && uploadFile()
  // }, [profilePic])
  const uploadFile = () => {
      const name = new Date().getTime() + profilePic.name;
      uploadFirestorage('user', name, profilePic).then(
        result => {
          setPhotoURL(result)
        }
      )
    }

  // 수정 기능 실행
  // store user 문서도 업데이트
  const editProfile = async () => {
    const auth = getAuth()

    profilePic && uploadFile()
    console.log(nameInput, photoURL)
    await updateProfile(auth.currentUser, {
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
                profilePic != null ?
                  user.photoURL
                  : profilePic
              }
              alt="profile"
              />
            <div className="filebox">
              <label htmlFor="file" >
                파일찾기
              </label> 
              <input 
                type="file" 
                onChange={InputFile} 
                id="file" 
                style={{display: "none"}}
              />
                <span onClick={()=>{
                  setPhotoURL('')
                  console.log(photoURL)
                  }} >프로필사진 삭제
                </span>
            </div>
          </div>

          <div className="Joinname_birth_gender_email">
            <h3 className="Jointext">이름</h3>

            <span className="Joinsignup_input">
              <input
                onChange={InputName}
                className="Joinsignup_name"
                type="text"
                placeholder={ user && user.displayName}
              ></input>
            </span>
          </div>

          
          <div className="btn_box">
            <ButtonComp 
              color="mint" 
              onClick={() => editProfile()}>
              <h4 style={{ padding: 0, margin: 0 }}>수정하기</h4>
            </ButtonComp>
          </div>
        </section>
      </div>
    </main>
    
  )
}

export default EditUser
