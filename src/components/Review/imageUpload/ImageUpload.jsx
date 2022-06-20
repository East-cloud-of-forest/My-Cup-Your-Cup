import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { ButtonComp } from "../../index-comp/IndexComp";
import "./ImageUpload.scss";

const ImageUpload = () => {
  //파일 미리보기 url을 저장해줄 state
  const [fileImages, setFileImages] = useState([]);
  // 파일 저장
  const saveFileImage = (e) => {
    const fileArr = e.target.files;
    const fileURLs = [];

    let file;
    const filesLength = fileArr.length > 4 ? 4 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setFileImages([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
  // 파일 삭제
  const deleteFileImage = (id) => {
    //URL.revokeObjectURL(fileImage);
    //setFileImage("");
    setFileImages(fileImages.filter((_, i) => i !== id));
  };

  return (
    <>
      <div>
        <label htmlFor="img_file" className="img_label">
          <FontAwesomeIcon icon={solid("plus")} size="2x"></FontAwesomeIcon>
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          id="img_file"
          style={{ display: "none" }}
          onChange={saveFileImage}
        />

        {fileImages.map((el, id) => (
          <div className="img_div" key={id}>
            <img src={fileImages[id]} className="review_user_img"></img>
            <ButtonComp
              type="submit"
              style={{
                backgroundColor: "transparent",
                color: "black",
                position: "absolute",
                bottom: -20,
                right: -20,
              }}
              onClick={() => deleteFileImage(id)}
            >
              <FontAwesomeIcon icon={solid("xmark")} />
            </ButtonComp>
          </div>
        ))}
      </div>
    </>
  );
};
export default ImageUpload;
