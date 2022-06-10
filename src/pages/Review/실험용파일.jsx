
import "./Review.scss";
import ReviewModalComp from "../../components/Review/modal/ReviewModalComp";
import MyPageModalComp from "../../components/Review/modal/MyPageModalComp";
import { Col, Container, Row } from "react-bootstrap";
import CardTest from './CardTest'
import { ButtonComp } from "../../components/index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestPage = () => {
  const reviewgrid = [
    { id: 1, name: "dd" },
    { id: 2, name: "dd" },
    { id: 3, name: "dd" },
    { id: 4, name: "dd" },
  ];
  return (
    <div>
      <h1>포토리뷰</h1>
      
      <CardTest></CardTest>

      <ButtonComp
        icon
        style={{ display: "inline", float: "right" }}
        onClick={() => {}}
      >
        <FontAwesomeIcon icon={solid("circle-plus")} size="2x" />
      </ButtonComp>

      <p className="Paging">
        {" "}
        &lt; <a href="">1 2 3 4 5</a> &gt;{" "}
      </p>
    </div>
  );
};
export default TestPage;
