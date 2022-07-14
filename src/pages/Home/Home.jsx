import './Home.scss'
import { ButtonComp, SliderComp } from '../../components/index-comp/IndexComp'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '../../datasources/firebase'
import ReviewModalComp from '../../components/Review/grid/ReviewModalComp'
import DesignModalComp from '../../components/DesignModalComp/DesignModalComp'
//import "../../dummies/illustrations/slideImage_disney.jpg"
const Home = () => {
  const { user } = useSelector((a) => a.enteruser)

  const circleitem = [
    '../../dummies/illustrations/tag1.jpg',
    '../../dummies/illustrations/tag2.jpg',
    '../../dummies/illustrations/tag3.png',
    '../../dummies/illustrations/tag4.jpg',
  ]

  const [review, setReview] = useState([])
  const [design, setDesign] = useState([])

  const getData = async () => {
    const q = query(collection(db, 'Review'), limit(8))
    await getDocs(q).then((r) => {
      const reviewArray = []
      r.forEach((doc) => {
        const data = doc.data()
        reviewArray.push({ ...data, id: doc.id })
      })
      setReview(reviewArray)
    })
    const q2 = query(collection(db, 'MyDesign'), limit(4))
    await getDocs(q2).then((r) => {
      const designArray = []
      r.forEach((doc) => {
        const data = doc.data()
        designArray.push({ ...data, id: doc.id })
      })
      setDesign(designArray)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const navigate = useNavigate()

  const designitem = []
  for (let i = 0; i < 4; i++) {
    designitem.push('디자인 ' + (i + 1))
  }

  return (
    <div className="maincomp">
      <div className="main_banner">
        <ButtonComp
          color="mint"
          onClick={() => {
            user ? navigate('/create') : navigate('/enteruser/login')
          }}
        >
          텀블러 제작하러 가기
        </ButtonComp>
      </div>
      <div className="main_slide">
        <SliderComp infinite={true} autoplay={true}>
          <div className="main_slide_item">
            <img
              src={require('../../dummies/illustrations/slideImage_disney.jpg')}
            />
          </div>
          <div className="main_slide_item">
            <img
              src={require('../../dummies/illustrations/slideImage_summer.jpg')}
            />
          </div>
          <div className="main_slide_item">
            <img
              src={require('../../dummies/illustrations/slideImage_loopy.jpg')}
            />
          </div>
          <div className="main_slide_item">
            <img
              src={require('../../dummies/illustrations/slideImage_popular.jpg')}
            />
          </div>
        </SliderComp>
      </div>
      <p className="text-center subtitle">인기 태그</p>
      <Container fluid>
        <Row>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag1.jpg')}
                alt="tag"
              />{' '}
            </div>{' '}
          </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag3.jpg')}
                alt="tag"
              />{' '}
            </div>
          </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag4.jpg')}
                alt="tag"
              />{' '}
            </div>
          </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag2.jpg')}
                alt="tag"
              />{' '}
            </div>
          </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag5.jpg')}
                alt="tag"
              />{' '}
            </div>
          </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem">
              <img
                src={require('../../dummies/illustrations/tag6.jpg')}
                alt="tag"
              />{' '}
            </div>
          </Col>
        </Row>
      </Container>
      <p className="text-center subtitle">리뷰</p>
      <Container fluid>
        <Row>
          {review.map((e, i) => (
            <Col key={i} md="3" sm="6" xs="6" className="main_review">
              <div className="main_review_item">
                <ReviewModalComp review={e} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <p className="text-center subtitle">디자인</p>
      <Container fluid>
        <Row>
          {design.map((e, i) => (
            <Col key={i} md="3" sm="6" xs="6" className="main_design">
              <div className="main_design_item">
                <DesignModalComp design={e} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home
