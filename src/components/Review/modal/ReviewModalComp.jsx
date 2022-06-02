import { ModalComp } from "../../index-comp/IndexComp";
import "./ReviewModal.scss";

const ReviewModalComp = (props) => {
  return (
    <div className="review_modal">
      <ModalComp
        title={"고객이 작성한 제목"}
        write={
          "고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이 작성한리뷰입니다. 고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이작성한 리뷰입니다."
        }
        designbtn={"디자인 보러가기"}
      ></ModalComp>
    </div>
  );
};
export default ReviewModalComp;
