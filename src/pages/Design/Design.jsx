import {
  ButtonComp,
  ModalComp,
  Pagination,
  ProfileComp,
} from '../../components/index-comp/IndexComp'
import './Design.scss'
import { CUP_PICS } from '../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Container, Row, Col } from 'react-bootstrap'
import { getFirebaseData } from '../../datasources/firebase'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadingEnd, loadingStart } from '../../modules/loading'

const Design = () => {
  const [designCol, setDesignCol] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  // 파이어스토어에서 마이디자인컬렉션 가져오기
  const getDesign = () => async () => {
    startLoading()
    document.body.style.overflow = 'hidden'
    try {
      let array = []
      const designColRef = getFirebaseData('MyDesign')
      ;(await designColRef).forEach((doc) => {
        array.push({
          id: doc.data().id,
          title: doc.data().title,
          text: doc.data().text,
          image: doc.data().image,
          tag: doc.data().tag,
          private: doc.data().private,
        })
      })
      setDesignCol(array)
      document.body.style = ''
      endLoading()
    } catch (err) {
      console.log(err.message)
      document.body.style = ''
      endLoading()
    }
  }

  // 공개된 디자인만 가져오기
  const oDesigns = designCol.filter((d) => d.private === false)

  useEffect(() => {
    dispatch(getDesign())
  }, [dispatch])

  return (
    <div className="design_page">
      <div>
        <h1>잔디자인</h1>
        <Container fluid>
          <Row>
            {oDesigns.map((design, i) => (
              <Col xl="2" lg="3" md="4" sm="6" key={i}>
                <ModalComp
                  button={
                    <div id="temp_image">
                      <p>{design.title}</p>
                    </div>
                  } //<img id="preview-image" src={design.image} alt={design.title}/>
                  image={<img src={design.image} alt={design.title} />}
                  className="design_modal"
                >
                  <div className="modal_head">
                    <h2>{design.title}</h2>
                  </div>
                  <div className="modal_body">
                    <p>{design.text}</p>
                    <div className="hashtag">
                      {design.tag.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="modal_footer">
                    <div className="profile_block">
                      <ProfileComp
                        className="profile"
                        justName
                        userName={'user1'}
                        imageURL={
                          'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'
                        }
                      />
                    </div>
                    <div className="button_block">
                      <ButtonComp icon id="like_btn">
                        <FontAwesomeIcon
                          icon={solid('heart')}
                        ></FontAwesomeIcon>
                      </ButtonComp>
                      <ButtonComp icon id="share-btn">
                        <FontAwesomeIcon
                          icon={solid('share-nodes')}
                        ></FontAwesomeIcon>
                      </ButtonComp>
                      <ButtonComp
                        icon
                        id="create-btn"
                        onClick={() => {
                          navigate('/create')
                        }}
                      >
                        제작하러가기
                      </ButtonComp>
                    </div>
                  </div>
                </ModalComp>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Pagination />
    </div>
  )
}
export default Design
