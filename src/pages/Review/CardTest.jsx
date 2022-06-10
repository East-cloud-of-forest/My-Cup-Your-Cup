import { ButtonComp, ModalComp2, ProfileComp } from "../../components/index-comp/IndexComp";
import "../../components/Review/grid/ReviewComp.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

const CardTest = () => {
  const [number, setNumber] = useState(0);

  return (
    <Row xs={2} md={4} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          
          <ModalComp2 
            title="고객이 올린 리뷰 제목"
            text="고객이 올린 리뷰 내용"
            button={
              <>
                <ButtonComp>
                  <FontAwesomeIcon icon={solid("heart")} />
                          <span> {number}</span>
                </ButtonComp>
                <ButtonComp>
                    <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                </ButtonComp>  
                <ButtonComp>제작하러가기</ButtonComp>
              </>
            }
            imageSRC={"https://cdn.pixabay.com/photo/2022/02/10/03/04/tumbler-7004528_960_720.jpg"}
            profile={
              <ProfileComp
                justName
                imageURL={
                  "https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg"
                }
                userName={"user1"}
              />
              }
            date={"2022-06-07"}
            rating={"★★★★★"}
            view={1234}
          >
            <Card>
              <Card.Img
                variant="top"
                src="https://cdn.pixabay.com/photo/2022/02/10/03/04/tumbler-7004528_960_720.jpg"
              />
              <Card.Body>
                <Card.Title>
                  고객이 올린 리뷰 제목
                  <ButtonComp
                    icon
                    style={{ display: "inline" }}
                    onClick={() => {
                      setNumber(number + 1);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("heart")} size="x" />{" "}
                    <span>{number}</span>
                  </ButtonComp>
                </Card.Title>
                <Card.Text>★★★★★</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">조회수 0000회 2022-06-07</small>
              </Card.Footer>
            </Card>
          </ModalComp2>
        </Col>
      ))}
    </Row>
  );
};
export default CardTest;
