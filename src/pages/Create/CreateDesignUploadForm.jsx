import { WriteFormComp } from "../../components/index-comp/IndexComp";

const CreateDesignUploadForm = () => {
  return (
    <div>
      <WriteFormComp
        title={"디자인업로드"}
        placeholder={"내용을 작성해 주세요"}
      />
    </div>
  );
};
export default CreateDesignUploadForm;
