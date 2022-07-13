import './DesignsGrid.scss'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { useSelector } from 'react-redux'
import { userGetFirebaseData } from '../../../datasources/firebase'
import DesignModalComp from '../../DesignModalComp/DesignModalComp'

export default function MyDesigns() {
  const [designs, setdesigns] = useState([])
  const { user } = useSelector((user) => user.enteruser)

  // 디자인 가져오기
  const getDesign = async () => {
    let array = []
    await userGetFirebaseData('MyDesign', user.uid).then((r) => {
      r.forEach((doc) => {
        const data = doc.data()
        array.push({
          id: doc.id,
          title: data.title,
          text: data.text,
          image: data.image,
          tag: data.tag,
          private: data.private,
          user: data.user,
          createdAt: data.createdAt,
          cupInfo: data.cupInfo,
        })
      })
    })
    setdesigns(array)
  }
  useEffect(() => {
    user !== null && getDesign()
  }, [user])

  return (
    <>
      <div className="header">
        <h3 id="title">나의 디자인</h3>
        <a href="#">더보기</a>
      </div>

      <Container fluid="sm">
        <Row>
          {designs.length >= 1 ? (
            designs.map((design) => (
              <Col xl="2" lg="3" md="4" sm="6" key={design.id}>
                <DesignModalComp design={design} />
              </Col>
            ))
          ) : (
            <p>나의 디자인이 없습니다.</p>
          )}
        </Row>
      </Container>
    </>
  )
}
