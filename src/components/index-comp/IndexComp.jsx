import './IndexComp.scss'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Modal } from 'react-bootstrap'
import StarComp from '../Review/star/StarComp'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../datasources/firebase'
import ImageUpload from '../Review/imageUpload/ImageUpload'

// 버튼
export const ButtonComp = (props) => {
  const { children, size, icon, style, block, tile, color, onClick } = props
  const [ripples, setRipples] = useState([])
  useEffect(() => {
    if (ripples.length > 0) {
      const a = setTimeout(() => {
        setRipples(ripples.filter((e) => e.id !== ripples.length - 1))
      }, 600)
      return () => clearTimeout(a)
    }
  }, [ripples])
  const clickanimation = (e) => {
    let x = e.clientX - e.currentTarget.getBoundingClientRect().left
    let y = e.clientY - e.currentTarget.getBoundingClientRect().top
    let ripple = React.createElement(
      'span',
      {
        style: { left: x + 'px', top: y + 'px' },
        key: ripples.length,
        className: 'ripple-span',
      },
      null,
    )
    setRipples(
      ripples.concat({
        element: ripple,
        id: ripples.length,
      }),
    )
  }
  return (
    <button
      style={style}
      className={classNames(
        'button',
        size,
        icon ? 'icon' : '',
        block ? 'block' : '',
        tile ? 'tile' : '',
        color,
      )}
      onClick={(e) => {
        clickanimation(e)
        onClick()
      }}
    >
      <span>{children}</span>
      {ripples.map((e) => e.element)}
    </button>
  )
}

ButtonComp.defaultProps = {
  onClick: function () {},
}

// 슬라이드 컴포넌트
export const SliderComp = ({
  dots,
  infinite,
  speed,
  slidesToShow,
  slidesToScroll,
  arrows,
  autoplay,
  children,
}) => {
  const NextArrow = ({ style, onClick }) => {
    return (
      <div
        className="customarrow arrow-next"
        style={{ ...style }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={solid('caret-right')} size="3x" />
      </div>
    )
  }

  const PrevArrow = ({ style, onClick }) => {
    return (
      <div
        className="customarrow arrow-prev"
        style={{ ...style }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={solid('caret-left')} size="3x" />
      </div>
    )
  }

  const settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    arrows: arrows,
    autoplay: autoplay,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

SliderComp.defaultProps = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
}

// 로고 컴포넌트
export const Logo = ({ style }) => {
  return (
    <div style={style}>
      <svg
        id="레이어_1"
        data-name="레이어 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1042.56 707.43"
      >
        <defs>
          <style>
            {`.cls-1{fill:none;
          stroke:#a6fae1;
          stroke-linecap:round;
          stroke-linejoin:round;
          stroke-width:20px;}
          .cls-2{fill:#a6fae1;}
          .cls-3{fill:#c5a8a1;}`}
          </style>
        </defs>
        <polygon
          className="cls-1"
          points="222 10 59.87 32.48 29.41 74.05 414.59 74.05 384.13 32.48 222 10"
        />
        <rect
          className="cls-1"
          x="10"
          y="74.43"
          width="424"
          height="32"
          rx="16"
        />
        <path
          className="cls-1"
          d="M849,904s-6,24-141,24-142-24-142-24L526,337H889Z"
          transform="translate(-485 -230.57)"
        />
        <circle className="cls-2" cx="129" cy="303.43" r="9" />
        <path
          className="cls-2"
          d="M614,530a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-10a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z"
          transform="translate(-485 -230.57)"
        />
        <circle className="cls-2" cx="327" cy="298.43" r="9" />
        <path
          className="cls-2"
          d="M812,525a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-10a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z"
          transform="translate(-485 -230.57)"
        />
        <polygon
          className="cls-1"
          points="223.31 424.73 278.46 303.92 177.02 300.25 223.31 424.73"
        />
        <path
          className="cls-2"
          d="M1203.48,291V578.42H1150V441.76h-26.6V576.89h-52V540.81c-23.54,5.81-45.25,7.34-75.21,7.34H940.56V300.21h53.5V506.88c30,0,52-1.84,77.35-7.34v-207h52V398H1150V291Z"
          transform="translate(-485 -230.57)"
        />
        <path
          className="cls-3"
          d="M1301.63,363.8V336h-57.17V294.09h169.67V336h-57.47v26.59a92,92,0,0,1-.92,13.15c28.43,14.68,56.25,36.38,74.6,61.76l-36.69,39.74c-15.29-21.09-34.24-38.52-56.56-57.47-18.65,25.06-48.92,44.63-82.55,57.47L1228,436C1269.83,421.58,1301.63,396.2,1301.63,363.8Zm-34.25,120.76h56.26v51.36H1497v42.5h-229.6ZM1527.56,376v42.8h-36.69v86.82h-55V291h55v85Z"
          transform="translate(-485 -230.57)"
        />
        <path
          className="cls-3"
          d="M940.56,633.21h53.81V839.27h66v41.88H940.56Zm86.21,88h50.75v-95.7h52V909.89h-52V764.06h-50.75ZM1203.48,624V911.42H1150V624Z"
          transform="translate(-485 -230.57)"
        />
        <path
          className="cls-2"
          d="M1301.63,696.8V669h-57.17V627.09h169.67V669h-57.47v26.59a92,92,0,0,1-.92,13.15c28.43,14.68,56.25,36.38,74.6,61.76l-36.69,39.74c-15.29-21.09-34.24-38.52-56.56-57.47-18.65,25.06-48.92,44.63-82.55,57.47L1228,769C1269.83,754.58,1301.63,729.2,1301.63,696.8Zm-34.25,120.76h56.26v51.36H1497v42.5h-229.6ZM1527.56,709v42.8h-36.69v86.82h-55V624h55v85Z"
          transform="translate(-485 -230.57)"
        />
      </svg>
    </div>
  )
}

// 프로필 컴포넌트
// 프로필 아이콘으로 사용할때 컴포넌트태그 안에 icon 작성
export function ProfileComp(props) {
  const {
    icon,
    justName,
    imageURL,
    userName,
    intro,
    instaURL,
    fbURL,
    size,
  } = props
  return (
    <div
      className={classNames(
        'profile',
        icon ? 'icon' : '',
        justName ? 'justName' : '',
      )}
    >
      <div className={classNames('image_container', size)}>
        <img src={imageURL} alt="profile photo"></img>
      </div>

      {justName && (
        <div className="text">
          <span id="username">{userName}</span>
        </div>
      )}

      {!icon && !justName && (
        <div className="text">
          <span id="username">{userName}</span>
          <p id="intro">{intro}</p>
          <div className="social">
            <a href={fbURL} target="blank">
              <img src="https://www.svgrepo.com/show/299115/facebook.svg"></img>
            </a>
            <a href={instaURL} target="blank">
              <img src="https://www.svgrepo.com/show/299116/instagram.svg"></img>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// 모달 컴포넌트
export const ModalComp = ({ children, button, image, className }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <span onClick={handleShow}>{button}</span>

      <Modal
        centered
        dialogClassName={classNames('opened_modal', className)}
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <div className="img_block">{image}</div>

          <div className="content_block">{children}</div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

// 글쓰기 폼 컴포넌트
export const WriteFormComp = (props) => {
  const { title, placeholder, review } = props
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

  const onSubmit = async (e) => {
    e.preventDefault()
    let timeStamp = Date.now()
    await addDoc(collection(db, 'Test'), {
      text: post,
      createdAt: new Date(timeStamp),
    })
    setPost('')
  }
  const onChangePost = (e) => {
    const {
      target: { value },
    } = e
    setPost(value)
  }

  return (
    <div className={classNames('write_form', review ? 'review' : 'design')}>
      <form onSubmit={onSubmit}>
        <h1>{title}</h1>
        <br />
        <input
          className="write_title"
          type="search"
          placeholder="제목을 작성해 주세요"
          size="54"
        />{' '}
        <br />
        <br />
        {/** 해시태그 기능 */}
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
        <br />
        <br />
        <textarea
          cols="57"
          rows="10"
          placeholder={placeholder}
          value={post}
          onChange={onChangePost}
        ></textarea>{' '}
        {/** 리뷰 폼 */}
        <div className="review">
          {/**
           * <input type="file" className="image_input" style={{ display: "hidden" }}>
            <label htmlFor="file-input">
              <button></button>
            </label>          </input>

          <ButtonComp
            style={{
              backgroundColor: 'inherit',
              color: 'black',
              float: 'left',
            }}
          >
            <FontAwesomeIcon icon={solid("plus")} size="2x">
              <input type="file" />
            </FontAwesomeIcon>

          </ButtonComp>
           */}
          {/**
           * <label for="img_file" className="img_label">
            <FontAwesomeIcon icon={solid("plus")} size="2x"></FontAwesomeIcon>
          </label>
          <input type="file" id="img_file" style={{ display: "none" }} />

          <ul className="review_user">
            <li>
              <div className="review_user_img">
                <ButtonComp
                  type="submit"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                  }}
                >
                  X
                </ButtonComp>
              </div>
            </li>
            <li>
              <div className="review_user_img">
                <ButtonComp
                  type="submit"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                  }}
                >
                  X
                </ButtonComp>
              </div>
            </li>
            <li>
              <div className="review_user_img">
                <ButtonComp
                  type="submit"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                  }}
                >
                  X
                </ButtonComp>
              </div>
            </li>
            <li>
              <div className="review_user_img">
                <ButtonComp
                  type="submit"
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                  }}
                >
                  X
                </ButtonComp>
              </div>
            </li>
          </ul>
           * 
           */}
          <ImageUpload />
          <br />
          <br />
          <br />
          <br />
          <br />
          <StarComp onClick={getRating} />
        </div>
        {/** 디자인업로드 폼 */}
        <div className="design">
          <br />
          <br />
          <div className="design_preview"></div>
        </div>
        <br />
        <br />
        <ButtonComp
          type="submit"
          style={{ float: 'right' }}
          color="brown"
          onClick={() => onSubmit}
        >
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
      </form>
    </div>
  )
}

// 페이지 컴포넌트
export const Pagination = (props) => {
  const { total, limit, page, setPage } = props
  const numPages = [1, 2, 3, 4] //Math.ceil(total / limit);
  return (
    <div className="pagination">
      <nav>
        <ButtonComp style={{ backgroundColor: 'transparent', color: 'black' }}>
          <FontAwesomeIcon icon={solid('chevron-left')} />
        </ButtonComp>

        {numPages.fill().map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
            style={{ border: 'none', margin: '7px' }}
          >
            {i + 1}
          </button>
        ))}

        <ButtonComp style={{ backgroundColor: 'transparent', color: 'black' }}>
          <FontAwesomeIcon icon={solid('chevron-right')} />
        </ButtonComp>
      </nav>
    </div>
  )
}

// 별점
export const StarRating = ({ rating }) => {
  return (
    <div className="star_rating">
      <span className="star_grey">
        <FontAwesomeIcon icon={regular('star')} size="sm" />
        <FontAwesomeIcon icon={regular('star')} size="sm" />
        <FontAwesomeIcon icon={regular('star')} size="sm" />
        <FontAwesomeIcon icon={regular('star')} size="sm" />
        <FontAwesomeIcon icon={regular('star')} size="sm" />
      </span>
      <span className="star_full" style={{ width: rating * 20 + '%' }}>
        <FontAwesomeIcon icon={solid('star')} size="sm" />
        <FontAwesomeIcon icon={solid('star')} size="sm" />
        <FontAwesomeIcon icon={solid('star')} size="sm" />
        <FontAwesomeIcon icon={solid('star')} size="sm" />
        <FontAwesomeIcon icon={solid('star')} size="sm" />
      </span>
    </div>
  )
}
