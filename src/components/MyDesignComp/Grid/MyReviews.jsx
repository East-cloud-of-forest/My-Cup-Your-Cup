import './MyReviews.scss'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import ReviewModalComp from '../../Review/grid/ReviewModalComp'
import { useCallback, useEffect, useState } from 'react'
import { loadingEnd, loadingStart } from '../../../modules/loading'
import { useDispatch, useSelector } from 'react-redux'
import { getFirebaseData, userGetFirebaseData } from '../../../datasources/firebase'
import { ButtonComp } from '../../index-comp/IndexComp'
  
const MyReviewsComp = () => {
  const { user } = useSelector((user) => user.enteruser);
  // 나의 리뷰 가져오기 
  const dispatch = useDispatch();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const [review, setReview] = useState([]);
  const getReviews =
    async () => {
      startLoading()
      let array = []
      await userGetFirebaseData("Review", user.uid)
      .then((r) => {
        r.forEach((doc) => {
          const data = doc.data();
          array.push({
            id : doc.id,
            rating : data.rating,
            tages : data.tages,
            review : data.review,
            images: data.images,
            user: data.user,
            createdAt: data.createdAt,
            uid : data.uid
          });
        });
      });
      setReview(array)
      endLoading()
    }

  useEffect(() => { 
    user !== null && getReviews()
  }, [user])

    // 더보기 기능 
    const [noOfReviews, setNoOfReviews] = useState(6);
    const slicedReview = review.slice(0, noOfReviews);
    const loadMore = () => {
      if (review.length > noOfReviews) {
        setNoOfReviews(noOfReviews + 6);
      } else return
    }

  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
        
      </div>
      <Container fluid="sm">
        <Row>
          { slicedReview.length >= 1 ? slicedReview.map( review => ( 
              <Col 
                xl="2"
                lg="3"
                md="4"
                sm="6"
                key={review.id}
                className="review_card"
              > 
                <ReviewModalComp review={review} />
              </Col>
            )) : ( 
            <p>작성한 리뷰가 없습니다.</p>
          )}
      </Row>
      <Row className="load_button">
        { review.length > 6 ? (
        <ButtonComp 
          color="white" 
          onClick={()=> loadMore()}
        >
          더보기
        </ButtonComp> ) : null }
      </Row>
    </Container>
  </div>
  )
}

  export default MyReviewsComp