import './Review.scss'
import { Col, Container, Row } from 'react-bootstrap'
import ReviewModalComp from '../../components/Review/grid/ReviewModalComp'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { getFirebaseData } from '../../datasources/firebase'
import { loadingEnd, loadingStart } from '../../modules/loading'

const ReviewPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const goReviewWrite = () => {
    navigate('/review/write')
  }
  
  const [review, setReview] = useState([])

  const getReviews = () => async () => {
    document.body.style.overflow = 'hidden'
    try {
      startLoading()
      let array = []
      const reviewRef = getFirebaseData('Review')
      ;(await reviewRef).forEach((doc) => {
        array.push({...doc.data(), id:doc.id})
      })
      setReview(array)
      document.body.style = ''
      endLoading()
    } catch (e) {
      console.log(e)
      document.body.style = ''
      endLoading()
    }
  }

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

  return (
    <div className="review_page">
      <div>
        <h1>포토리뷰</h1>
        <Container fluid>
          <Row>
            { review &&
              review.map((r, i) => (
                <Col
                  xl="2"
                  lg="3"
                  md="4"
                  sm="6"
                  key={i}
                  className="review_card"
                > 
                  <ReviewModalComp review={r} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  )
}
export default ReviewPage
