import './CreateDesignUploadForm.scss'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { addDoc } from 'firebase/firestore';
import {  getFirebaseData, setFirebaseData } from '../../datasources/firebase';
import { useEffect } from 'react';

const PostEditForm = () => {
  const {id} = useParams();
  const {user} = useSelector((user)=>user.enteruser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    console.log(trimmedInput);
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
        console.log(tagList) //
  // 태그 클릭 삭제
  const deleteTagItem = (index) => {
    setTagList((prevState) => prevState.filter((tag, i) => i !== index));
  }

  // 파이어베이스에서 데이터 가져오기
  //const [ mydesigns, setmydesigns ] = useState([]);
  const getMyDesign = () => async () => {
    try {
      let thisPost;
      const myDesignRef = getFirebaseData("MyDesign");
      (await myDesignRef).forEach( (doc) => {
        if (doc.id === id ) {thisPost = doc.data()} else return;
      });
      setTitle(thisPost.title);
      setText(thisPost.text);
      setTagList([...thisPost.tag]);
    }
    catch (err) {
        console.log(err);
    }
  }
  useEffect( ()=>{dispatch(getMyDesign())}, [dispatch])

  // 수정한 디자인 업로드하기
  const uploadMyDesign = async (userid) => {
    if ( title==='' ) {
      alert('컵 이름을 지어주세요!');
    } else {
        try { // await setDoc(doc(db, name, id), content)
          await setFirebaseData("MyDesign", id, {
            title: title,
            text: text,
            tag: tagList,
            private: onlyMe,
            userid: userid
          })
        }
        catch (e) {
          console.log(e.message);
        }
        
      }
      navigate('/mydesign');
    }
    

  return (
    <div className="uploadPage_container">
      <h2>나의 디자인 수정</h2>
      <div className="temporary_image">image</div>
      <div className='cup_info'>
        <p>
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
          <ButtonComp color="green" onClick={()=>uploadMyDesign(user.uid)}>
            저장
          </ButtonComp>
        </div>
      </div>
    </div>
  );
}

export default PostEditForm;
