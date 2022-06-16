import "./Review.scss";
import { Col, Container, Row } from "react-bootstrap";
import ReviewModalComp from "../../components/Review/grid/ReviewModalComp";
import { ButtonComp, Pagination } from "../../components/index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ReviewModalContainer from "../../containers/Review/ReviewModalContainer";

const ReviewPage = () => {
  const navigate = useNavigate();
  const goReviewWrite = () => {
    navigate("/review/write");
  };
  return (
    <div>
      <h1>포토리뷰</h1>
      <Container fluid>
        <Row>
          <Col md="3" sm="6" xs="6">
            <ReviewModalContainer />
          </Col>
        </Row>
      </Container>
      <br />

      {/** plus 버튼 누르면 /review/write 페이지 이동 */}
      <ButtonComp
        icon
        style={{ display: "inline", float: "right" }}
        onClick={goReviewWrite}
      >
        <FontAwesomeIcon icon={solid("circle-plus")} size="2x" />
      </ButtonComp>
      <br />
      {/** 페이징 */}
      <Pagination />
    </div>
  );
};
export default ReviewPage;
