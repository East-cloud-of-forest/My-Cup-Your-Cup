import './Home.scss'
import { ButtonComp, SliderComp } from '../../components/index-comp/IndexComp'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Home = () => {
  const aaa = useSelector(a=>a)
  // console.log(aaa)
  
  const circleitem = []
  for (let i = 0; i < 6; i++) {
    circleitem.push('태그 ' + (i + 1))
  }

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
        <ButtonComp>텀블러 제작하러 가기</ButtonComp>
      </div>
      <div className="main_slide">
        <SliderComp infinite={true} autoplay={true}>
          <div className="main_slide_item">메인 슬라이더</div>
          <div className="main_slide_item">메인 슬라이더</div>
          <div className="main_slide_item">메인 슬라이더</div>
          <div className="main_slide_item">메인 슬라이더</div>
        </SliderComp>
      </div>
      <p className="text-center subtitle">인기 태그</p>
      <Container fluid>
        <Row>
          {circleitem.map((e) => (
            <Col key={e} md="2" sm="4" xs="4" className="main_circlemenu">
              <div className="main_circleitem">
                {e}
              </div>
            </Col>
          ))}
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
