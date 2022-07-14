import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useRef, useState } from "react"
import { Overlay, Popover } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteFirebaseData } from "../../datasources/firebase"
import { addItem } from "../../modules/addCart"
import { ButtonComp, ModalComp, ProfileComp } from "../index-comp/IndexComp"
import './DesignModalComp.scss'

const DesignModalComp = ({design}) => {
  const { user } = useSelector((a) => a.enteruser)
  const ref = useRef()
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
console.log(design)
  // 수정, 삭제 팝오버
  const handleClick = (e) => {
    setShow(!show)
    setTarget(e.target)
  }

  // 삭제버튼 클릭시
  const deletePost = async (id) => {
    try {
      if (window.confirm('정말 삭제하시겠습니까?') === true) {
        await deleteFirebaseData('MyDesign', id)
        window.location.reload()
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 날짜표시
  const datefn = (d) => {
    let postDate = new Date(d)
    return `${postDate.getFullYear()}-${
      postDate.getMonth() + 1
    }-${postDate.getDate()}`
  }
  
  // 장바구니 추가
  const onAddItem = useCallback((tumblur) => dispatch(addItem(tumblur)), [
    dispatch,
  ])
  const addToCart = (info) => {
    onAddItem({
      image: info.image,
      name: info.name,
      color: info.color,
      material: info.material,
      size: info.size,
      strow: info.strow,
      shape: info.shape,
      price: info.price,
      quantity: info.quantity,
      total: info.total,
    })
    navigate('/cart')
  }

  const tagSearch = (tag) => {
    navigate("/search?keyword=" + tag);
  }

  return (
    <ModalComp
      button={
        <div id="temp_image">
          <img src={design.image} alt={design.title} />
        </div>
      }
      image={<img src={design.image} alt={design.title} />}
      className="design_modal"
    >
      <div className="modal_head" ref={ref}>
        <h2>{design.title}</h2>

        {
          user && design.user.uid == user.uid ? (
          <div>
            <ButtonComp icon onClick={handleClick}>
              <FontAwesomeIcon icon={solid('ellipsis-vertical')} />
            </ButtonComp>
            <Overlay
              show={show}
              target={target}
              placement="left"
              container={ref}
              containerPadding={20}
              rootClose
              onHide={() => setShow(false)}
            >
              <Popover id="ellipsis_popover">
                <ButtonComp
                  color="white"
                  onClick={() => navigate(`/mydesign/edit/${design.id}`)}
                >
                  <FontAwesomeIcon icon={solid('pen-to-square')} /> 수정
                </ButtonComp>{' '}
                <br />
                <ButtonComp color="white" onClick={() => deletePost(design.id)}>
                  <FontAwesomeIcon icon={solid('trash-can')} /> 삭제
                </ButtonComp>
              </Popover>
            </Overlay>
        </div> ) : null
        }
      </div>
      {design.private === true ? (
        <span style={{ fontSize: 'smaller', color: 'gray' }}>
          <FontAwesomeIcon icon={solid('lock')} /> 비공개 게시물입니다
        </span>
      ) : null}
      <div className="modal_body">
        <p>{design.text}</p>
        <div className="hashtag">
          {design.tag.map((tag, i) => (
            <span key={i} onClick={()=>{tagSearch(tag)}}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="modal_footer">
        <div className="profile_block">
          <ProfileComp
            className="profile"
            justName
            userName={design.user.displayName}
            imageURL={design.user.photoURL}
          />
          <span id="date_span">{datefn(design.createdAt)}</span>
        </div>
        <div className="button_block">
          <ButtonComp icon id="like_btn">
            <FontAwesomeIcon icon={solid('heart')} />
          </ButtonComp>
          <ButtonComp icon id="share-btn">
            <FontAwesomeIcon icon={solid('share-nodes')} />
          </ButtonComp>
          <ButtonComp
            icon
            id="create-btn"
            onClick={() => {
              addToCart(design.cupInfo)
            }}
          >
            <FontAwesomeIcon icon={solid('cart-shopping')}></FontAwesomeIcon>
          </ButtonComp>
        </div>
      </div>
    </ModalComp>
  )
}

export default DesignModalComp
