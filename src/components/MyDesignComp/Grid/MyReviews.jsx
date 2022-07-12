import './MyReviews.scss'
import { Col, Container, Row } from 'react-bootstrap'
import ReviewModalComp from '../../Review/grid/ReviewModalComp'
  
const MyReviewsComp = (props) => {
  const { user, review } = props;

  // 나의 리뷰 가져오기 
  const myReview = review.filter( r => r.user.uid === user.uid );

  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
      </div>
      <Container fluid="sm">
      { myReview >= 1 ? myReview.map( review => ( 
        <Row key={review.id}>
            <Col
              xl="2"
              lg="3"
              md="4"
              sm="6"
              className="review_card"
            > 
              <ReviewModalComp review={review} />
            </Col>

        </Row>
        )) : ( 
          <p>작성한 리뷰가 없습니다.</p>
        )
      }
    </Container>
  </div>
  )
}

  export default MyReviewsComp