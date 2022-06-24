import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonComp, StarRating } from '../../components/index-comp/IndexComp'
import ImageUpload from '../../components/Review/imageUpload/ImageUpload'
import './ReviewWriteForm.scss'

const ReviewWriteForm = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])
  const [post, setPost] = useState('')
  const [reviewWrite, setReviewWrite] = useState([
    { reviewTitle: '', tagArr: '', content: '', rating: '' },
  ])

  const [rating, setRating] = useState('')
  const getRating = (star) => {
    setRating(star)
    console.log(rating)
  }

  const addImage = () => {}

  const onChange = (e) => {
    const { value } = e.target
    setTagItem(value)
  }

  const onKeyDown = (e) => {
    const { key } = e
    const trimmedInput = tagItem.trim()

    if (
      key === 'Enter' &&
      trimmedInput.length &&
      !tagList.includes(trimmedInput)
    ) {
      e.preventDefault()
      setTagList((prevState) => [...prevState, trimmedInput])
      setTagItem('')
    }

    if (key === 'Backspace' && !tagItem.length && tagList.length) {
      e.preventDefault()
      const tagListCopy = [...tagList]
      const poppedTag = tagListCopy.pop()

      setTagList(tagListCopy)
      setTagItem(poppedTag)
    }
  }

  const deleteTagItem = (index) => {
    setTagList((prevState) => prevState.filter((tag, i) => i !== index))
  }

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   let timeStamp = Date.now()
  //   await addDoc(collection(db, 'Test'), {
  //     text: post,
  //     createdAt: new Date(timeStamp),
  //   })
  //   setPost('')
  // }
  // const onChangePost = (e) => {
  //   const {
  //     target: { value },
  //   } = e
  //   setPost(value)
  // }

  return (
    <div className="review_write_page">
      <StarRating />
      <input
        className="write_title"
        type="search"
        placeholder="제목을 작성해 주세요"
        size="54"
      />
      <div className="tag_container">
        {tagList.map((tag, index) => (
          <div className="tag">
            {tag}
            <button onClick={() => deleteTagItem(index)}>x</button>
          </div>
        ))}
        <input
          type="search"
          className="tag_input"
          value={tagItem}
          placeholder="태그를 작성해 주세요"
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </div>
      <textarea cols="57" rows="10" placeholder={'aa'} value={post}></textarea>{' '}
      <div className="review">
        <ImageUpload />
      </div>
      {/** 디자인업로드 폼 */}
      <div className="design">
        <div className="design_preview"></div>
      </div>
      <ButtonComp type="submit" style={{ float: 'right' }} color="brown">
        작성
      </ButtonComp>
      <ButtonComp
        type="submit"
        style={{ float: 'right' }}
        color="brown"
        onClick={goBack}
      >
        취소
      </ButtonComp>
    </div>
  )
}
export default ReviewWriteForm
