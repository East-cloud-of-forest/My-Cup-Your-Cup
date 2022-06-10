import { ButtonComp } from "../../index-comp/IndexComp";
import "./ReviewComp.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ReviewComp2 = () => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <ul className="review_image">
        <li>
          <img
            className="review_preview"
            src="https://cdn.pixabay.com/photo/2022/02/10/03/04/tumbler-7004528_960_720.jpg"
            alt=""
          />
          <h6 className="review_title">
            고객이 올린 리뷰 제목
            <ButtonComp icon style={{ display: "inline" }}>
              <FontAwesomeIcon icon={solid("heart")} size="x" />{" "}
              <span>{number}</span>
            </ButtonComp>
            <br />
            <small>조회수 0000회 2022-06-07</small>
          </h6>
          <p>★★★★★</p>
        </li>
      </ul>
    </div>
  );
};
export default ReviewComp2;
