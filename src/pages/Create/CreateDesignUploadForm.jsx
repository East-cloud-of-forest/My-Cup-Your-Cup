import './CreateDesignUploadForm.scss'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDesignUploadForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const titleInputChange = (e) => {
    setTitle(e.target.value)
  }
  // 태그 인풋 입력
  const [tagInput, setTagInput] = useState('')
  const tagInputChange = (e) => {
    setTagInput(e.target.value)
  }
  // 태그 확정 입력
  const [tagList, setTagList] = useState([])
  const onKeyDown = (e) => {
    const { key } = e
    const trimmedInput = tagInput.trim()
    if (key === 'Enter' && trimmedInput.length) {
      if (!tagList.includes(trimmedInput)) {
        setTagList((prevState) => [...prevState, trimmedInput])
        setTagInput('')
      } else {
        setTagInput('')
      }
    } else if (key === 'Backspace' && !tagInput.length && tagList.length) {
      const tagListCopy = [...tagList]
      tagListCopy.pop()
      setTagList(tagListCopy)
    }
  }
  // 태그 클릭 삭제
  const deleteTagItem = (index) => {
    setTagList((prevState) => prevState.filter((tag, i) => i !== index))
  }
  // 나의 디자인 업로드하기
  const uploadMyDesign = () => {
    if ( title==='' ) {
      alert('컵 이름을 지어주세요!')
    } else {
      navigate('/mydesign');
    }
  }
  return (
    <div className="uploadPage_container">
      <h2>나의 디자인 저장</h2>
<div className="temporary_image">image</div>
      <div>상품옵션 
        <p>a</p>      
      </div>
      <div className="upload_form">
        <input 
          type="text" 
          placeholder="컵 이름을 지어주세요"
          value={title}
          onChange={titleInputChange}
        /> <br />
        <div className="main_input" >
          <textarea rows={20}/>
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
        <input type="checkbox" /> 나만 보기
        <div className="button_block">
          <ButtonComp color="red">취소</ButtonComp>
          <ButtonComp color="green" onClick={uploadMyDesign}>저장</ButtonComp>
        </div>
      </div>
    </div>
  );
};
export default CreateDesignUploadForm;
