import ReviewComp2 from "../../components/Review/grid/ReviewComp2";
import "./Review.scss";
import { Col, Container, Row } from "react-bootstrap";
import ReviewComp from "../../components/Review/grid/ReviewComp";
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

      <CardTest2 />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <CardTest2 />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/** plus 버튼 누르면 /review/write 페이지 이동 */}
      <ButtonComp
        icon
        style={{ display: "inline", float: "right" }}
        onClick={() => {}}
      >
        <FontAwesomeIcon icon={solid("circle-plus")} size="2x" />
      </ButtonComp>
      <br />
      <br />
      {/** 페이징 */}
      <Pagination />
    </div>
  );
};
export default ReviewPage;
