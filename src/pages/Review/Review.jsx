import ReviewComp from "../../components/Review/grid/ReviewComp";
import "./Review.scss";
import ReviewModalComp from "../../components/Review/modal/ReviewModalComp";
import MyPageModalComp from "../../components/Review/modal/MyPageModalComp";
import { Col, Container, Row } from "react-bootstrap";

const ReviewPage = () => {
  const reviewgrid = [
    { id: 1, name: "dd" },
    { id: 2, name: "dd" },
    { id: 3, name: "dd" },
    { id: 4, name: "dd" },
  ];
  return (
    <div>
      <h1>Review</h1>
      <Container fluid>
        <Row>
          {reviewgrid.map((r, id) => (
            <Col md="3" sm="6" xs="6">
              <ReviewComp r={r} key={id}></ReviewComp>
            </Col>
          ))}
        </Row>
      </Container>

      <p className="Paging">
        {" "}
        &lt; <a href="">1 2 3 4 5</a> &gt;{" "}
      </p>

      {/** 모달 확인차 임시로 Page에 컴포넌트 입력함 */}
      <ReviewModalComp />

      <MyPageModalComp />
    </div>
  );
};
export default ReviewPage;
