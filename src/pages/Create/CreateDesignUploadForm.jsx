import './CreateDesignUploadForm.scss'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { addDoc } from 'firebase/firestore';
import { addFirebaseData, uploadFirestorage } from '../../datasources/firebase';

const CreateDesignUploadForm = () => {
  const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
  const {user} = useSelector( (user) => user.enteruser );
  
  const mycup = items[items.length - 1]
  
  const navigate = useNavigate();

  // 제목, 내용, 비공개 입력
  const [title, setTitle] = useState('')
  const [text, setText] = useState('');
  const [onlyMe, setOnlyMe] = useState(false);
  const titleInputChange = (e) => {
    setTitle(e.target.value);
  }
  const textInputChange = (e) => {
    setText(e.target.value);
    
  }
  const checkOnlyMe = () => {
    setOnlyMe(!onlyMe)
    console.log(onlyMe)
  }
  
  // 태그 인풋 입력
  const [tagInput, setTagInput] = useState('')
  const tagInputChange = (e) => {
    setTagInput(e.target.value);
  }
  // 태그 확정 입력
  const [tagList, setTagList] = useState([])
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = tagInput.trim()
    if (key === 'Enter' && trimmedInput.length) {
      if (!tagList.includes(trimmedInput)) {
        setTagList((prevState) => [...prevState, trimmedInput]);
        setTagInput('');
      } else {
        setTagInput('');
      }
    } else if (key === 'Backspace' && !tagInput.length && tagList.length) {
      const tagListCopy = [...tagList];
      tagListCopy.pop();
      setTagList(tagListCopy);
    }
  }
  // 태그 클릭 삭제
  const deleteTagItem = (index) => {
    setTagList((prevState) => prevState.filter((tag, i) => i !== index));
  }
  // 파이어베이스 업로드
  
  // 나의 디자인 업로드하기
  // https://stackoverflow.com/questions/48862777/firebase-storage-upload-blob-url
  console.log(mycup.imageBlob.src)
  const getFileBlob = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
      cb(xhr.response);
    });
    xhr.send();
  }
  const uploadMyDesign = async (mycup, userid) => { // async 익명함수로 작성하면 표현식)
    let designID;
    let designImage = new Image();
    if ( title==='' ) {
      alert('컵 이름을 지어주세요!');
    } else {
        try {
          await addFirebaseData("MyDesign", {
            image: mycup.image,
            title: title,
            text: text,
            tag: tagList,
            private: onlyMe,
            userid: userid
          }).then( res => designID = res.id );
          
          // designImage.crossOrigin = "Anonymous";
          // designImage.src = new Blob(); // [object blob]
          // console.log(designImage)
          getFileBlob(mycup.imageBlob.src, blob => {
            uploadFirestorage("MyDesign/" + designID)
            .put(blob)
            .then((snapshot) => {
              console.log('Uploaded a blob or file! : ', snapshot);
            })
          })
          }
          // await uploadFirestorage("MyDesign/" + designID, mycup.imageBlob )
          // .then( res => console.log(res))
        catch (e) {
          console.log(e.message);
        }
      }
      // navigate('/mydesign');
    }
    

  return (
    <div className="uploadPage_container">
      <h2>나의 디자인 저장하기</h2>
      <div className='image_block'>
        <img src={mycup.image} alt={mycup.name} />
      </div>
      <div className='cup_info'>
        <p>
          <span>{mycup.name}</span>
          {` | 
          ${mycup.color} | 
          ${mycup.shape} | 
          ${mycup.material} | 
          ${mycup.size} | 
          빨대: ${mycup.strow}`}
        </p>      
      </div>
      <div className="upload_form">
        <input 
          type="text" 
          placeholder="컵 이름을 지어주세요"
          value={title}
          onChange={titleInputChange}
        /> <br />
        <div className="main_input" >
          <textarea rows={20} value={text} onChange={textInputChange}/>
        </div>

        <div className="tag_container">
          {tagList.map((tag, i) => (
            <div key={i} className="tag" onClick={() => deleteTagItem(i)}>
              {tag}
            </div>
          ))}
          <input 
            type="text" 
            placeholder="#태그를입력해주세요" 
            value={tagInput}
            onKeyDown={onKeyDown}
            onChange={tagInputChange}
          />
        </div>
        <input type="checkbox" onChange={checkOnlyMe} checked={onlyMe}/> 나만 보기
        <div className="button_block">
          <ButtonComp color="red">취소</ButtonComp>
          <ButtonComp color="green" onClick={() => { // 함수로 감싸지않고 썼을 경우 이전페이지에서 alert창이 뜨는 오류 발생
            if ( user === null ) {
              alert("로그인이 필요한 서비스입니다");
              navigate('/enteruser/login');
            } else {uploadMyDesign(mycup, user.uid)}
          }}>
            저장
          </ButtonComp> 
        </div>
      </div>
    </div>
  );
}

export default CreateDesignUploadForm;