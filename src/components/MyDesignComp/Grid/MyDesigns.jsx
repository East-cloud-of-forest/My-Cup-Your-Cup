import "./DesignsGrid.scss";
import { useState, useEffect, } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import { ButtonComp,  } from "../../index-comp/IndexComp";
import { userGetFirebaseData, } from "../../../datasources/firebase";
import DesignModalComp from "../DesignModalComp";
import { useSelector } from "react-redux";

export default function MyDesigns() {
  const [designs, setdesigns] = useState([]);

  const { user } = useSelector((user) => user.enteruser);

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
    user !== null && getDesign();
  }, [user]);


    // 더보기 기능
    const [noOfDesigns, setNoOfDesigns] = useState(6);
    const slicedDesign = designs.slice(0, noOfDesigns);
    const loadMore = () => {
      if (designs.length > noOfDesigns) {
        setNoOfDesigns(noOfDesigns + 6);
      } else return;
    };


  return (
    <>
      <div className="header">
        <h3 id="title">나의 디자인</h3>
      </div>

      <Container fluid="sm">
        <Row>
          {slicedDesign.length >= 1 ? (
            slicedDesign.map((design) => (
              <Col xl="2" lg="3" md="4" sm="6" key={design.id}>
                <DesignModalComp design={design} />
              </Col>
            ))
            
          ) : (
            <p>나의 디자인이 없습니다.</p>
          )}
        </Row>
        
        <Row className="load_button">
          { designs.length > 6 ? (
          <ButtonComp color="white" onClick={()=> loadMore()}>
            더보기
          </ButtonComp> ) : null }
        </Row>
      </Container>
    </>
  )
}
