import ReviewComp from "../../components/Review/grid/ReviewComp";
import "./Review.scss";
import ReviewModalComp from "../../components/Review/modal/ReviewModalComp";
import MyPageModalComp from "../../components/Review/modal/MyPageModalComp";
import { Col, Container, Row } from "react-bootstrap";
import CardTest from "../../components/Review/grid/CardTest";
import CardTest2 from "../../components/Review/grid/CardTest2";
import { ButtonComp, Pagination } from "../../components/index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewPage = () => {
  const reviewgrid = [
    { id: 1, name: "dd" },
    { id: 2, name: "dd" },
    { id: 3, name: "dd" },
    { id: 4, name: "dd" },
  ];
  return (
    <div>
      <h1>포토리뷰</h1>
      <Container fluid>
        <Row>
          {reviewgrid.map((r, id) => (
            <Col md="3" sm="6" xs="6">
              <ReviewComp r={r} key={id}></ReviewComp>
            </Col>
          ))}
        </Row>
      </Container>

      <CardTest></CardTest>

      {/** plus 버튼 누르면 /review/write 페이지 이동 */}
      <ButtonComp
        icon
        style={{ display: "inline", float: "right" }}
        onClick={() => {}}
      >
        <FontAwesomeIcon icon={solid("circle-plus")} size="2x" />
      </ButtonComp>

      {/** 페이징 */}
      <Pagination />

      {/** 모달 확인차 임시로 Page에 컴포넌트 입력함 */}
      <CardTest2 />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ReviewModalComp />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <MyPageModalComp />
    </div>
  );
};
export default ReviewPage;
