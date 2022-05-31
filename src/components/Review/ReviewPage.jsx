import ReviewComp from "./grid/ReviewComp";
import "./grid/ReviewForm.scss";
import ReviewModalComp from "./modal/ReviewModalComp";

const ReviewPage = () => {
  return (
    <div>
      <h1>Review</h1>
      <ReviewComp />
      <ReviewComp />
      <ReviewComp />
      <p className="Paging"> &lt; 1 2 3 4 5 6 &gt; </p>

      {/** 모달 확인차 임시로 Page에 컴포넌트 입력함 */}
      <ReviewModalComp />
    </div>
  );
};
export default ReviewPage;
