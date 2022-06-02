import { ModalComp } from "../../index-comp/IndexComp";
import "./MyPageModal.scss";

const MyPageModalComp = (props) => {
  return (
    <div className="review_modal">
      <ModalComp
        title={"고객이 작성한 제목"}
        write={"고객이 작성한 내용입니다."}
        designbtn={"제작하러 가기"}
      />
    </div>
  );
};
export default MyPageModalComp;
