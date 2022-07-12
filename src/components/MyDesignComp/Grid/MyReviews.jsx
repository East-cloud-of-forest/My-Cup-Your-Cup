import './MyReviews.scss'
import { Col, Container, Row } from 'react-bootstrap'
import ReviewModalComp from '../../Review/grid/ReviewModalComp'
  
const MyReviewsComp = (props) => {
  const { user, review } = props;

  // 나의 리뷰 가져오기 
  const myReview = review.filter( r => r.user.uid === user.uid );
  // console.log(myReview)
  return (
    <div className='my_review' >
      <div className="header">
        <h3 id="title">나의 리뷰</h3>
      </div>
      <Container fluid="sm">
        <Row>
          { ( myReview >= 1 ) ? myReview.map( review => ( 
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