import {
    ButtonComp,
    ProfileComp,
    ModalComp,
    StarRating,
    SliderComp,
  } from '../../index-comp/IndexComp'
import '../../Review/grid/Temp.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TempReviewThumbnail from '../../Review/grid/TempReviewThumbnail'
import { Col, Container, Overlay, OverlayTrigger, Popover, Row } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteFirebaseData } from '../../../datasources/firebase'
  
const MyReviewsComp = ({user, review}) => {
  const [ show, setShow ] = useState(false);
  const [ target, setTarget ] = useState(null);

  const navigate = useNavigate();
  const ref = useRef(null);

  // 인증된 유저의 리뷰만 들고오기
  const uid = user.uid;
  const myReview = review.filter( r => r.data.user.uid === uid)

  // 수정, 삭제 팝오버
  const handleClick = (e) => {
    setShow(!show)
    setTarget(e.target)
    console.log(show, target) //왜안되
  }
  // 삭제버튼 클릭시
  const deletePost = async (id) => {
      try {
          alert('정말 삭제하시겠습니까?')
          await deleteFirebaseData('MyDesign', id)
          window.location.reload();
      }
      catch (e) { console.log(e) }
  }

  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
      </div>
      <Container fluid="sm">
      <Row>
      { myReview.length >=1 ? myReview.map( myReview => ( 
      <Col xl="2" lg="3" md="4" sm="6" className="review_card" key={myReview.id} >
          <ModalComp
            button={<TempReviewThumbnail review={myReview.data} />}
            image={
              <SliderComp dots={false} infinite={true}>
                { Object.values(myReview.data.images).map( (image,i) => (
                  <div>
                    <img id="image" src={image} key={i} alt="review-image" />
                  </div>
                ))}
              </SliderComp>
            }
            className="review_modal" 
          >
          <div className="modal_top">
            <div className="star">
              <StarRating rating={myReview.data.rating} />
            </div>
          </div>
  
          <div className="modal_body">
            <div className="option">
              <p>옵션01</p>
              <p>옵션02</p>
              <p>옵션03</p>
              <p>옵션04</p>
            </div>

            <div className="hashtag">
              {myReview.data.tages.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            
          </div>
          <p>{myReview.data.review}</p>
          <div className="score">
            <i>
              <FontAwesomeIcon icon={regular('eye')} />
            </i>
            <span>1234</span>
            <i>
              <FontAwesomeIcon icon={regular('heart')} />
            </i>
            <span>1234</span>
          </div>
          
          <div className="modal_footer">
            <div className="profile_block">
              <ProfileComp justName imageURL={myReview.data.user.photoURL} size="md" />
              <div>
                <p>{myReview.data.user.displayName}</p>
                <p className="caption">2022-06-07</p>
              </div>
            </div>
            <div>
              <ButtonComp icon>
                <FontAwesomeIcon icon={solid('heart')} />
              </ButtonComp>
              <ButtonComp icon>
                <FontAwesomeIcon icon={solid('share-nodes')} />
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
                  <ButtonComp icon > 
                    <FontAwesomeIcon 
                      icon={solid("pen-to-square")}
                      onClick={() => navigate(`/review/edit/${myReview.id}`)}/> 수정
                  </ButtonComp> <br/>
                  <ButtonComp icon >
                    <FontAwesomeIcon 
                      icon={solid("trash-can")} 
                      onClick={()=> deletePost(myReview.id)}/> 삭제
                  </ButtonComp>
                </Popover>
              </Overlay>
            </div>
          </div>
        </ModalComp> </Col>)
        ) : ( <p>작성한 리뷰가 없습니다.</p>)
      }
      </Row>
    </Container>
  </div>
)
}

  export default MyReviewsComp