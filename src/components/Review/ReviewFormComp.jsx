import { WriteFormComp } from "../index-comp/IndexComp";

const ReviewFormComp = () => {
  return (
    <div>
      <WriteFormComp
        title={"포토리뷰"}
        placeholder={"리뷰를 작성해 주세요"}
        review
        addWrite
      />
    </div>
  );
};
export default ReviewFormComp;
