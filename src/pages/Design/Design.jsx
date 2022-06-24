
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
              <Col xs="6" md="3" key={cup_pic.id}>
                <ModalComp 
                button={<img id="preview-image" src={cup_pic.src} alt={cup_pic.title}/>}
                image={<img src={cup_pic.src} alt={cup_pic.title}/>}
                className="design_modal"
                >
                  <div className="modal_head">
                    <div className="text_block">
                      <h2>제목</h2>
                      
                    </div>
                  </div>

                  <div className="modal_body">
                    <p>내용</p>
                    <div className="hashtag">
                      <span>#태그1 </span>
                      <span>#태그2 </span>
                      <span>#태그3 </span>
                    </div>
                  </div>

                  <div className="modal_footer">
                    <ProfileComp
                      className="profile" 
                      justName 
                      userName={"user1"} 
                      imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}
                    />
                    <div className="button_block">
                      <ButtonComp icon id="like_btn">
                        <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                      </ButtonComp>
                      <ButtonComp icon id="share-btn">
                          <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                      </ButtonComp>  
                      <ButtonComp icon id="create-btn">제작하러가기</ButtonComp>
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
