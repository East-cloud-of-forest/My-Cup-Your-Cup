import { ButtonComp, ProfileComp, ModalComp } from "../../index-comp/IndexComp";
import "./ReviewThumbnail.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewThumbnail from "./ReviewThumbnail";

const ReviewModalComp = (props) => {
  const {
    boardImage,
    boardTitle,
    boardRating,
    boardContent,
  } = props.board
  return (
    <div>
      <ModalComp
        title={boardTitle}
        text={boardContent}
        button={
          <div>
            <ButtonComp>
              <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
            </ButtonComp>
            <ButtonComp>
              <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
            </ButtonComp>
          </div>
        }
        imageSRC={boardImage}
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
        rating={boardRating}
        view={1234}
      >
        <ReviewThumbnail board={props.board} />
      </ModalComp>
    </div>
  );
};
export default ReviewModalComp;
