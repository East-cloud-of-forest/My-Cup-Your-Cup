import './MyReviews.scss'
import { Col, Container, Row } from 'react-bootstrap'
import ReviewModalComp from '../../Review/grid/ReviewModalComp'
import { useCallback, useEffect, useState } from 'react'
import { loadingEnd, loadingStart } from '../../../modules/loading'
import { useDispatch } from 'react-redux'
import { getFirebaseData } from '../../../datasources/firebase'
  
const MyReviewsComp = ({user}) => {
  //const { user, review } = props;

  // 나의 리뷰 가져오기 
  const dispatch = useDispatch();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])
  
  const [review, setReview] = useState([]);
  const getReviews =
    async () => {
      startLoading()
      try {
        let array = []
        const reviewRef = getFirebaseData('Review');
        (await reviewRef).forEach( doc => {
          array.push(
            {
            id : doc.id,
            rating : doc.data().rating,
            tages : doc.data().tages,
            review : doc.data().review,
            images: doc.data().images,
            user: doc.data().user,
            createdAt: doc.data().createdAt,
            }
          )
        })
        setReview(array)
      } catch (e) { console.log(e) }
      endLoading()
      console.log(review)
    }
  
  useEffect(() => { 
    getReviews()}, [])

  const myReview = review.filter( r =>( r.user.uid == user.uid ));
  // console.log(myReview)
  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
      </div>
      <Container fluid="sm">
        <Row>
          { myReview? myReview.map( review => ( 
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
    </Container>
  </div>
  )
}

  export default MyReviewsComp