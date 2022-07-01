import './CreateDesignUploadForm.scss'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { addDoc } from 'firebase/firestore';
import { addFirebaseData, db, getFirebaseData } from '../../datasources/firebase';
import { doc } from 'firebase/firestore';

const CreateDesignEditForm = () => {
  const {id} = useParams();
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

  // 파이어베이스에서 데이터 가져오기
  const [ mydesigns, setmydesigns ] = useState([]);
  const getMyDesign = () => async () => {
    try {
        
        const myDesignRef = doc(db, "MyDesign", {id});
        const myDesignSnap = getFirebaseData(myDesignRef);
        // (await myDesignColRef).forEach( (doc) => {
        //     array.push({ 
        //         id: doc.data().id, 
        //         title: doc.data().title, 
        //         text: doc.data().text,
        //         image: doc.data().image,
        //         tag: doc.data().tag,
        //         private: doc.data().private
        //     }); 
        // });
        // setmydesigns(array);
        console.log(myDesignSnap);
    }
    catch (err) {
        console.log(err.message);
    }
  }
  // 파이어베이스 업로드
  
  // 수정한 디자인 업로드하기
  const uploadMyDesign = async (mycup) => { // async 익명함수로 작성하면 표현식)
    if ( title==='' ) {
      alert('컵 이름을 지어주세요!');
    } else {
      // ( async 익명함수로 작성하면 표현식)
          try {
            const ref = await addFirebaseData("MyDesign", {
              cupInfo: mycup[0].mycup,
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
    }
    

  return (
    <div className="uploadPage_container">
      <h2>{id} 나의 디자인 수정</h2>
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
          <ButtonComp color="green">
            저장
          </ButtonComp>
        </div>
      </div>
    </div>
  );
}

export default CreateDesignEditForm;
