import { ButtonComp } from "../../index-comp/IndexComp";
import "./ReviewComp.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewComp = () => {
  return (
    <div>
      <ul className="review_image">
        <li>
          <div></div>
          <p className="review_title">
            고객이 올린 리뷰 제목
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid("heart")} size="x" /> <span>5</span>
            </ButtonComp>
          </p>

          <p>★★★★★</p>
        </li>
      </ul>
    </div>
  );
};
export default ReviewComp;
