import "./ReviewThumbnail.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { StarRating } from "../../index-comp/IndexComp";

const ReviewThumbnail = (props) => {
  const [number, setNumber] = useState(0);
  const { boardImage, boardTitle, boardRating } = props.board
  return (
    <Card id="review_card">
      <Card.Img variant="top" src={boardImage} />

      <Card.Body>
        <div className="review_top">
          <StarRating rating={boardRating}></StarRating>
          <div className="review_heart">
            <i>
              <FontAwesomeIcon icon={solid("heart")} size="sm" />
            </i>
            <span>{number}</span>
          </div>
        </div>

        <div className="review_body">
          <p className="card_title">{boardTitle}</p>
          <p className="review_text">어쩌고 저쩌고</p>
        </div>

        <hr />

        <div className="caption review_footer">
          <span>2022-06-01</span>
          <span>userID</span>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ReviewThumbnail;
