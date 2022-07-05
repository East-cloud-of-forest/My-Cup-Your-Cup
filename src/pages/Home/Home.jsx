import './Home.scss'
import { ButtonComp, SliderComp } from '../../components/index-comp/IndexComp'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//import "../../dummies/illustrations/slideImage_disney.jpg"
const Home = () => {
  const aaa = useSelector(a=>a)
  // console.log(aaa)
  
  const circleitem = [
    '../../dummies/illustrations/tag1.jpg',
    '../../dummies/illustrations/tag2.jpg',
    '../../dummies/illustrations/tag3.png',
    '../../dummies/illustrations/tag4.jpg',
  ]
  // for (let i = 0; i < 6; i++) {
  //   circleitem.push(`../../dummies/illustrations/tag${i+1}.jpg`)
  // }

  const navigate = useNavigate()

  const reviewitem = []
  for (let i = 0; i < 8; i++) {
    reviewitem.push('리뷰 ' + (i + 1))
  }

  const designitem = []
  for (let i = 0; i < 4; i++) {
    designitem.push('디자인 ' + (i + 1))
  }

  return (
    <div className="maincomp">
      <div className="main_banner">
        메인 배너
        <ButtonComp onClick={()=>{navigate('/create')}} >텀블러 제작하러 가기</ButtonComp>
      </div>
      <div className="main_slide">
        <SliderComp infinite={true} autoplay={true}>
          <div className="main_slide_item"><img src={require('../../dummies/illustrations/slideImage_disney.jpg')} /></div>
          <div className="main_slide_item"><img src={require('../../dummies/illustrations/slideImage_summer.jpg')} /></div>
          <div className="main_slide_item"><img src={require('../../dummies/illustrations/slideImage_loopy.jpg')} /></div>
          <div className="main_slide_item"><img src={require('../../dummies/illustrations/slideImage_popular.jpg')} /></div>
        </SliderComp>
      </div>
      <p className="text-center subtitle">인기 태그</p>
      <Container fluid>
        <Row>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem"><img src={require('../../dummies/illustrations/tag1.jpg')} alt='tag' /> </div> </Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem"><img src={require('../../dummies/illustrations/tag3.jpg')} alt='tag' /> </div></Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu">
            <div className="main_circleitem"><img src={require('../../dummies/illustrations/tag4.jpg')} alt='tag' /> </div></Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu"> 
            <div className="main_circleitem"><img src={require('../../dummies/illustrations/tag2.jpg')} alt='tag' /> </div></Col>
          <Col md="2" sm="4" xs="4" className="main_circlemenu"> 
            <div className="main_circleitem"><img src={require('../../dummies/illustrations/tag5.jpg')} alt='tag' /> </div></Col>
        </Row>
      </Container>
      <p className="text-center subtitle">리뷰</p>
      <Container fluid>
        <Row>
          {reviewitem.map((e) => (
            <Col key={e} md="3" sm="6" xs="6" className="main_review">
              <div className="main_review_item">
                {e}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <p className="text-center subtitle">디자인</p>
      <Container fluid>
        <Row>
          {designitem.map((e) => (
            <Col key={e} md="3" sm="6" xs="6" className="main_design">
              <div className="main_design_item">
                {e}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home
