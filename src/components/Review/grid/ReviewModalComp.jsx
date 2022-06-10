import ReviewComp from "./ReviewComp";
import { ButtonComp, ProfileComp, ModalComp } from "../../index-comp/IndexComp";
import "./ReviewComp.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

const ReviewModalComp = () => {
  const review = [{ id: 1, name: "dd" }];
  return (
    <div>
      <Container fluid="sm">
        <Row>
          {review.map((r) => (
            <Col key={r.id}>
              {/** 모달 전체 창 */}
              <ModalComp
                title={"고객이 작성한 제목"}
                text={
                  "고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이 작성한리뷰입니다. 고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이작성한 리뷰입니다."
                }
                button={
                  <div>
                    <ButtonComp>
                      <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                    </ButtonComp>
                    <ButtonComp>
                      <FontAwesomeIcon
                        icon={solid("share-nodes")}
                      ></FontAwesomeIcon>
                    </ButtonComp>
                    <ButtonComp>디자인 보러가기</ButtonComp>
                  </div>
                }
                imageSRC={
                  "https://cdn.pixabay.com/photo/2022/02/10/03/04/tumbler-7004528_960_720.jpg"
                }
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
                <ReviewComp></ReviewComp>
              </ModalComp>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default ReviewModalComp;
