import './CreateDesignUploadForm.scss'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { addDoc } from 'firebase/firestore';
import { addFirebaseData } from '../../datasources/firebase';

const CreateDesignUploadForm = () => {
  const {mycup}  = useSelector( (state) => ({ mycup : state.uploadDesign.mycup }) );
  //console.log(mycup) // mycup = [{mycup: {…}}] 배열안에 객체안에 키:밸류
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
        console.log(tagList) //
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
  const uploadMyDesign = async (mycup) => {
    if ( title==='' ) {
      alert('컵 이름을 지어주세요!');
    } else {
      // ( async 익명함수로 작성하면 표현식)
          try {
            const ref = await addFirebaseData("MyDesign", {
              id: mycup[0].mycup.id,
              image: mycup[0].mycup.image,
              title: title,
              text: text,
              tag: tagList,
              private: onlyMe
            })
          }
          catch (e) {
            console.log(e.message);
          }
          
      }
      navigate('/mydesign');
      console.log(mycup);//
      console.log(tagList);//
    }
  

  return (
    <div className="uploadPage_container">
      <h2>나의 디자인 저장하기</h2>
      <div className="temporary_image">image : {mycup[0].mycup.image}</div>
      <div className='cup_info'>
        <p>
          <span>{mycup[0].mycup.name}</span>
          {` | 
          ${mycup[0].mycup.color} | 
          ${mycup[0].mycup.shape} | 
          ${mycup[0].mycup.material} | 
          ${mycup[0].mycup.size} | 
          빨대: ${mycup[0].mycup.strow}`}
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
            uploadMyDesign(mycup)}
          }>
            저장
          </ButtonComp>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignUploadForm;
