import {
    ButtonComp,
    ProfileComp,
    ModalComp,
    StarRating,
    SliderComp,
  } from '../../index-comp/IndexComp'
import './MyReviews.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TempReviewThumbnail from '../../Review/grid/TempReviewThumbnail'
import { Col, Container, Overlay, Popover, Row } from 'react-bootstrap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { deleteFirebaseData, getFirebaseData } from '../../../datasources/firebase'
import { loadingEnd, loadingStart } from '../../../modules/loading'
  
const MyReviewsComp = (props) => {
  const { user, review } = props;

  const [ show, setShow ] = useState(false);
  const [ target, setTarget ] = useState(null);
  const popref = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch

  // 나의 리뷰 가져오기 
  const myReview = review.filter( r => r.user.uid === user.uid );

  // 수정, 삭제 팝오버
  const handleClick = (e) => {
    setShow(!show)
    setTarget(e.target)
  }
  // 삭제버튼 클릭시
  const deletePost = async (id) => {
    try {
        alert('정말 삭제하시겠습니까?')
        await deleteFirebaseData('Review', id)
        navigate(-1)
    } catch (e) { console.log(e) }
  }


  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
      </div>
      <Container fluid="sm">
      <Row>
      { myReview ? myReview.map( review => ( 
      <Col xl="2" lg="3" md="4" sm="6" className="review_card" key={review.id} >
          <ModalComp
            button={<TempReviewThumbnail review={review} />}
            image={
              <SliderComp dots={false} infinite={true}>
                { Object.values(review.images).map( (image,i) => (
                  <div key={i}>
                    <img id="image" src={image} key={i} alt="review-image" />
                  </div>
                ))}
              </SliderComp>
            }
            className="review_modal" 
          >
          <div className="modal_top">
            <div className="star">
              <StarRating rating={review.rating} />
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
              {review.tages.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            
          </div>
          <p>{review.review}</p>
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
              <ProfileComp justName imageURL={review.user.photoURL} size="md" />
              <div>
                <p>{review.user.displayName}</p>
                <p className="caption">2022-06-07</p>
              </div>
            </div>
            <div ref={popref}>
              <ButtonComp icon>
                <FontAwesomeIcon icon={solid('heart')} />
              </ButtonComp>
              <ButtonComp icon>
                <FontAwesomeIcon icon={solid('share-nodes')} />
              </ButtonComp>
              <ButtonComp icon onClick={handleClick}>
                <FontAwesomeIcon icon={solid("ellipsis-vertical")} />
              </ButtonComp>
              <Overlay
                show={show}
                target={target}
                placement="left"
                container={popref}
                containerPadding={20}
                rootClose
                onHide={() => setShow(false)}
              >
                <Popover id='review_popover'>
                  <ButtonComp icon onClick={() => navigate(`/review/write/${review.id}`)}> 
                    <FontAwesomeIcon icon={solid("pen-to-square")}/> 수정
                  </ButtonComp> <br/>
                  <ButtonComp icon onClick={()=> deletePost(review.id)}>
                    <FontAwesomeIcon  icon={solid("trash-can")} /> 삭제
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