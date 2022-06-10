import { WriteFormComp } from "../../components/index-comp/IndexComp";

const ReviewWriteForm = () => {
  return (
    <div>
      <WriteFormComp
        title={"포토리뷰"}
        placeholder={"리뷰를 작성해 주세요"}
        review
      />
    </div>
  );
};
export default ReviewWriteForm;
