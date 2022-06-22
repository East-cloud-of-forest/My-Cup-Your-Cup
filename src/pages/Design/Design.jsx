import { Row, Col, Container } from "react-bootstrap";
import { ButtonComp, ModalComp, Pagination } from "../../components/index-comp/IndexComp";
import "./Design.scss";
import { CUP_PICS } from "../../images"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";


const Design = () => {
  return (
    <div>
      <h1>잔디자인</h1>
      <ModalComp>aa</ModalComp>
      <ButtonComp>마이 디자인</ButtonComp>

      <Container fluid>
        <Row>
            {
              CUP_PICS.map( (cup_pic, i) => (
                <Col md="3" sm="6" xs="6" key={i}>
                  <ModalComp 
                    text={cup_pic.title}
                    title={cup_pic.title}
                    imageSRC={cup_pic.src}
                    button={ 
                      <div>
                          <ButtonComp style={{backgroundColor: "red"}}>
                              <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                          </ButtonComp>
                          <ButtonComp id="share-btn">
                              <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                          </ButtonComp>  
                          <ButtonComp id="create-btn">제작하러가기</ButtonComp>
                      </div>
                    }
                  >
                    <img src={cup_pic.src} alt={cup_pic.id} id="preview-image" />
                  </ModalComp>
                </Col>
              ))
            }
            {
              CUP_PICS.map( (cup_pic, i) => (
                <Col md="3" sm="6" xs="6" key={i}>
                  <ModalComp 
                    text={cup_pic.title}
                    title={cup_pic.title}
                    imageSRC={cup_pic.src}
                    button={ 
                      <div>
                          <ButtonComp>
                              <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                          </ButtonComp>
                          <ButtonComp>
                              <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                          </ButtonComp>  
                          <ButtonComp>제작하러가기</ButtonComp>
                      </div>
                    }
                  >
                    <img src={cup_pic.src} alt={cup_pic.id} id="preview-image" />
                  </ModalComp>
                </Col>
              ))
            }
            {
              CUP_PICS.map( (cup_pic, i) => (
                <Col md="3" sm="6" xs="6" key={i}>
                  <ModalComp 
                    text={cup_pic.title}
                    title={cup_pic.title}
                    imageSRC={cup_pic.src}

                    button={ 
                      <div>
                          <ButtonComp>
                              <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                          </ButtonComp>
                          <ButtonComp>
                              <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                          </ButtonComp>  
                          <ButtonComp>제작하러가기</ButtonComp>
                      </div>
                    }
                  >
                    <img src={cup_pic.src} alt={cup_pic.id} id="preview-image" />
                  </ModalComp>
                </Col>
              ))
            }
          
        </Row>
      </Container>
      <br />
      <Pagination />
    </div>
  );
};
export default Design;
