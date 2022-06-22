
import { ButtonComp, ModalComp, Pagination, ProfileComp } from "../../components/index-comp/IndexComp";
import "./Design.scss";
import { CUP_PICS } from "../../images"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Container, Row, Col } from "react-bootstrap";


const Design = () => {
  return (
    <div>
      <h1>잔디자인</h1>
      <Container fluid="sm">
        <Row>
          {
            CUP_PICS.map( (cup_pic, i)=>(
              <Col xs="6" md="3" key={i}>
                <ModalComp 
                button={<img id="preview-image" src={cup_pic.src} alt={cup_pic.title}/>}
                imageSRC={cup_pic.src}
                className={"design_modal"}
                >
                  <div className="modal_top">

                      <ProfileComp 
                        justName 
                        userName={"user1"} 
                        imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}/>

                    <div className="text_block">
                      <h2>제목</h2>
                      <p>내용</p>
                    </div>

                    <div className="button_block">
                      <ButtonComp>
                        <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                      </ButtonComp>
                      <ButtonComp>
                          <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                      </ButtonComp>  
                      <ButtonComp>제작하러가기</ButtonComp>
                    </div>
                    
                  </div>
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
