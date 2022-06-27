import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonComp, StarRating } from '../../components/index-comp/IndexComp'
import ImageUpload from '../../components/Review/imageUpload/ImageUpload'
import './ReviewWriteForm.scss'

const ReviewWriteForm = () => {
  // 입장시 스크롤 top
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // 별점 클릭시 점수 확정
  // 별점 애니메이션 class 기억
  const [classAray, setClassAray] = useState([0, 0, 0, 0, 0])
  let setAray = [...classAray]
  // 별점
  const [rating, setRating] = useState(0)
  const starClick = (e) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left
    const width = e.currentTarget.getBoundingClientRect().width
    const currentRating = Math.ceil((x / width) * 5)
    let j = 0
    if (rating < currentRating) {
      for (let i = rating; i < currentRating; i++) {
        // 별점 애니메이션 class index 설정
        j++
        setAray[i] = j
        setClassAray(setAray)
        e.currentTarget.children[0].children[i].classList.add('active' + j)
        e.currentTarget.children[1].children[i].classList.add('active' + j)
      }
    } else {
      for (let i = rating - 1; i > currentRating - 1; i--) {
        e.currentTarget.children[0].children[i].classList.remove(
          'active' + setAray[i],
        )
        e.currentTarget.children[1].children[i].classList.remove(
          'active' + setAray[i],
        )
      }
    }
    setRating(currentRating)
  }
  // 별점 hover 시 채워지는 애니메이션
  const [overRating, setOverRating] = useState(0)
  const starOver = (e) => {
    let x = e.clientX - e.currentTarget.getBoundingClientRect().left
    let width = e.currentTarget.getBoundingClientRect().width
    setOverRating(Math.ceil((x / width) * 5))
  }
  const starOut = () => {
    setOverRating(0)
  }
  // 별점 별 문구
  const ratingText = () => {
    switch (rating) {
      case 5:
        return '너무 좋아요'
      case 4:
        return '좋아요'
      case 3:
        return '괜찮아요'
      case 2:
        return '그저그래요'
      case 1:
        return '별로예요'
    }
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

  // 리뷰 입력
  const [review, setReview] = useState('')
  const [reviewMaxLength] = useState(5000)
  const reviewRef = useRef()
  const reviewChange = (e) => {
    const v = e.target.value
    if (v.length > reviewMaxLength) {
      setReview(v.substring(0, reviewMaxLength))
    } else {
      setReview(v)
    }
    // 높이 자동조절
    const ref = reviewRef.current
    if (ref.offsetHeight < ref.scrollHeight) {
      ref.style.height = ref.scrollHeight + 'px'
    }
  }

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
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

  return (
    <div className="review_write_page">
      <div>상품 정보</div>

      <StarRating
        onClick={starClick}
        rating={rating > overRating ? rating : overRating}
        onMouseOver={starOver}
        onMouseOut={starOut}
      />
      {rating > 0 ? (
        <p className="active">
          <span>{rating}점</span> {ratingText()}
        </p>
      ) : (
        <p>별점을 선택해주세요.</p>
      )}
      <hr />
      <h4>
        {rating > 0 ? '별점 ' + rating + '점 을 주셨어요.' : null} <br />
        어떤 부분이 {(rating < 3) & (rating > 0) ? '별로 였나요?' : '좋았나요?'}
      </h4>

      <div className="tag_container">
        <hr />
        {tagList.map((tag, i) => (
          <div key={i} className="tag" onClick={() => deleteTagItem(i)}>
            {tag}
          </div>
        ))}
        <input
          type="text"
          value={tagInput}
          placeholder="태그를 입력해 주세요"
          onKeyDown={onKeyDown}
          onChange={tagInputChange}
        />
      </div>

      <div className="review_form">
        <textarea
          cols="57"
          rows="10"
          placeholder={
            '구입하시고 사용하시면서 느끼신 만족에 대한 후기를 남겨주세요.'
          }
          value={review}
          onChange={reviewChange}
          ref={reviewRef}
        ></textarea>
        <span>
          {review.length.toLocaleString()} / {reviewMaxLength.toLocaleString()}
        </span>
      </div>

      <div className="review">
        <ImageUpload />
      </div>
      <div>
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
    </div>
  )
}
export default ReviewWriteForm
