import { WriteFormComp } from "../index-comp/IndexComp";

const CreateDesignUploadFormComp = () => {
  return (
    <div>
      <WriteFormComp
        title={"디자인업로드"}
        placeholder={"내용을 작성해 주세요"}
      />
    </div>
  );
};
export default CreateDesignUploadFormComp;
