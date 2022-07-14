import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ButtonComp, StarRating } from '../../components/index-comp/IndexComp'
import {
  addFirebaseData,
  deleteFirestorage,
  getFirebaseData,
  setFirebaseData,
  uploadFirestorage,
} from '../../datasources/firebase'
import { loadingEnd, loadingStart } from '../../modules/loading'
import './ReviewWriteForm.scss'
import { Spinner } from 'react-bootstrap'

const ReviewWriteForm = () => {
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])
  const { reviewItem } = useSelector((a) => a.writeReview)
  const { loading } = useSelector((a) => a.loading)

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

  // 파일 업로드 클릭
  const fileRef = useRef()
  const fileUpload = () => {
    fileRef.current.click()
  }
  // 파일 저장
  const [files, setFiles] = useState([])
  const saveFileImage = (e) => {
    if (files.length + e.target.files.length <= 8) {
      Array.from(e.target.files).forEach((file, i) => {
        file.url = URL.createObjectURL(file)
        file.id = file.lastModified + String(files.length)
      })
      setFiles([...files, ...e.target.files])
    } else {
      alert('최대 사진의 개수는 8개 입니다.')
    }
    console.log(files)
  }

  // 파일 삭제
  const deleteFileImage = (id) => {
    if (postid.id !== null) {
      let newfiles = files.filter((file) => file.id !== id)
      setFiles(newfiles)
    }
    setFiles(Array.from(files).filter((file) => file.id != id))
  }

  // url 파일로 변환
  const convertURLtoFile = async (url, name) => {
    const response = await fetch(url)
    const data = await response.blob()
    const ext = url.split('.').pop() // url 구조에 맞게 수정할 것
    const filename = name // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` }
    return new File([data], filename, metadata)
  }
  // firestore 데이터가져오기
  const [prevFilename, setPrevFilename] = useState([])
  const postid = useParams()
  const getMyReview = async () => {
    startLoading()
    document.body.style.overflow = 'hidden'
    await getFirebaseData('Review', postid.id)
      .then(async (r) => {
        console.log(r)
        const data = r.data()
        setRating(data.rating)
        setTagList(data.tages)
        setReview(data.review)
        const promise = Object.values(data.images).map(async (img, i) => {
          await convertURLtoFile(img.url, img.filename).then((r) => {
            r.id = img.fileid[i]
            r.url = URL.createObjectURL(r)
            setFiles([...files, r])
            setPrevFilename([...prevFilename, img.filename])
          })
        })
        await Promise.all(promise)
      })
      .catch((e) => {
        console.log(e)
      })
    document.body.style = ''
    endLoading()
  }
  useEffect(() => {
    postid.id && getMyReview()
  }, [])

  // firebase 로 리뷰 업로드
  const { user } = useSelector((a) => a.enteruser)
  const sendFirebase = async () => {
    let postID
    let filename = []
    let fileid = []
    let images = new Object()

    // 리뷰 수정할 경우
    if (postid.id) {
      console.log(postid.id)
      postID = postid.id
      prevFilename.map((name) => {
        deleteFirestorage('review', postID, name)
      })
    } else {
      await addFirebaseData('Review', {}).then((r) => (postID = r.id))
    }
    // 파이어 스토어 업데이트
    console.log(prevFilename)
    const promise = files.map(async (file) => {
      fileid = file.id
      filename = file.name
      return await uploadFirestorage('review/' + postID, file.name, file)
    })
    const result = await Promise.all(promise)
    result.forEach((url, i) => {
      console.log(url)
      images['image' + i] = { url: url, fileid: fileid, filename: filename }
    })
    // 파이어 베이스 업데이트
    await setFirebaseData('Review', postID, {
      createdAt: Date.now(),
      user: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      },
      images: Object.assign({}, images),
      rating: rating,
      review: review,
      tages: [...tagList],
      heart: 0,
      filename: filename,
      fileid: fileid,
      uid: user.uid,
      product: {
        itemName: reviewItem.itemName,
        itemColor: reviewItem.itemColor,
        boughtDate: reviewItem.boughtDate,
      },
    })
  }

  // 취소
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const compliteReview = async () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.')
    } else if (tagList.length === 0) {
      alert('태그를 입력해주세요.')
    } else if (review.length < 10) {
      alert('리뷰를 10글자 이상 입력해주세요.')
    } else if (files.length === 0) {
      alert('리뷰 사진을 첨부해주세요.')
    } else {
      startLoading()
      document.body.style.overflow = 'hidden'
      await sendFirebase()
      document.body.style = ''
      endLoading()
      navigate(-1)
    }
  }

  return (
    <div className="review_write_page">
      {loading ? (
        <div className="pullpage_loading">
          <Spinner animation="border" role="status" />
        </div>
      ) : null}

      <div className="review_write_item_info">
        <img src={reviewItem.itemImage} style={{ width: '100%' }} alt="" />
        <div>
          <p>상품명 : {reviewItem.itemName}</p>
          <p>색상 : {reviewItem.itemColor}</p>
          <p>구매일자 : {reviewItem.boughtDate}</p>
        </div>
      </div>

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
            '구입하시고 사용하시면서 느끼신 만족에 대한 후기를 남겨주세요. (최소 10글자 이상)'
          }
          value={review}
          onChange={reviewChange}
          ref={reviewRef}
        ></textarea>
        <span>
          {review.length.toLocaleString()} / {reviewMaxLength.toLocaleString()}
        </span>
      </div>

      <div className="addimage">
        <ButtonComp color="white" onClick={fileUpload}>
          <FontAwesomeIcon icon={solid('camera-retro')} />
          사진 첨부하기
        </ButtonComp>
        <input
          type="file"
          multiple
          accept="image/*"
          id="img_file"
          ref={fileRef}
          hidden
          onChange={saveFileImage}
        />
        {files.length === 0 ? (
          <>
            <p>상품을 직접 사용해보신 사진을 올려주세요.</p>
            <span>제품이 잘 보이도록 다양한 각도의 사진을</span>
            <span>올려주시면 너무 좋아요.</span>
          </>
        ) : (
          <div className="img_block">
            {files.map((file) => (
              <div className="img_div" key={file.id}>
                <img src={file.url} className="review_user_img"></img>
                <div
                  onClick={() => deleteFileImage(file.id)}
                  className="remove_img"
                >
                  <FontAwesomeIcon icon={solid('xmark')} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="review_form_btn">
        <ButtonComp color="red" onClick={goBack}>
          취소
        </ButtonComp>
        <ButtonComp color="green" onClick={compliteReview}>
          작성
        </ButtonComp>
      </div>
    </div>
  )
}
export default ReviewWriteForm
