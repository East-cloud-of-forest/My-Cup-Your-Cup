import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EditUser.scss'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { getUserInfo, uploadFirestorage } from '../../../datasources/firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { getAllByTestId } from '@testing-library/react'
import { getFirestore } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const EditUser = () => {
  const navi = useNavigate();

  const { user } = useSelector((user) => user.enteruser);

  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [nameInput, setNameInput] = useState('');
  
  // 프로필 들고오기
  useEffect(() => {
    user !== null && 
    
    setPhotoURL(user.photoURL); //profilePic 은 url string
    user !== null && 
    setNameInput(user.displayName);
  }, [user])

  // 프로필사진 업로드
  const InputFile = (e) => {
    let photosrc = URL.createObjectURL(e.target.files[0])
    setProfilePic(e.target.files[0]);  // 파일
    setPhotoURL(photosrc); // 파일 주소
    //console.log(photosrc);
  }

  // 이름, onChange
  const InputName = (e) => {
    setNameInput(e.target.value)
  }

  //파이어스토리지에 사진 업로드
  useEffect( () => {
    const uploadFile = () => {
      const name = new Date().getTime() + user.displayName;
      uploadFirestorage('user', name, profilePic).then(
        result => {
          setPhotoURL(result)
          console.log(result)
        }
      )
    }
  profilePic && uploadFile()
  }, [profilePic])


  // 수정 기능 실행
  const editProfile = async () => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: nameInput,
      photoURL: photoURL,
    })
    .then(() => {
      console.log('Successfully updated user');
    })
    .then( ()=> {
      navi('/');
      //window.location.reload();
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
              src={photoURL ? 
                photoURL : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profile_picture"
              />
            <div className="filebox">
              {/* 파일 업로드 */}
              <label htmlFor="file" >
                <FontAwesomeIcon icon={solid("camera")} />
              </label> 
              <input 
                type="file" 
                onChange={InputFile} 
                id="file" 
                style={{display: "none"}}
              />
              {/* 파일 삭제 */}
              <span onClick={()=>{
                setPhotoURL('')
                }} >
              <FontAwesomeIcon icon={solid("trash-can")} />
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
                value={nameInput}
              ></input>
            </span>
          </div>

          
          <div className="btn_box">
            <ButtonComp 
              color="red" 
              onClick={() => navi(-1)}>
              <h4 >취소</h4>
            </ButtonComp>
            <ButtonComp 
              color="mint" 
              onClick={() => { 
                nameInput !== null ? 
                  editProfile() : noName()
            }}>
              <h4>수정</h4>
            </ButtonComp>
          </div>
        </section>
      </div>
    </main>
    
  )
}

export default EditUser
