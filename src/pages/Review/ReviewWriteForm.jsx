import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComp, StarRating } from "../../components/index-comp/IndexComp";
import ImageUpload from "../../components/Review/imageUpload/ImageUpload";
import "./ReviewWriteForm.scss";

const ReviewWriteForm = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [post, setPost] = useState("");
  const [reviewWrite, setReviewWrite] = useState([
    { reviewTitle: "", tagArr: "", content: "", rating: "" },
  ]);

  const addImage = () => {};

  const onChange = (e) => {
    const { value } = e.target;
    setTagItem(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = tagItem.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tagList.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTagList((prevState) => [...prevState, trimmedInput]);
      setTagItem("");
    }

    if (key === "Backspace" && !tagItem.length && tagList.length) {
      e.preventDefault();
      const tagListCopy = [...tagList];
      const poppedTag = tagListCopy.pop();

      setTagList(tagListCopy);
      setTagItem(poppedTag);
    }
  };

  const deleteTagItem = (index) => {
    setTagList((prevState) => prevState.filter((tag, i) => i !== index));
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   let timeStamp = Date.now()
  //   await addDoc(collection(db, 'Test'), {
  //     text: post,
  //     createdAt: new Date(timeStamp),
  //   })
  //   setPost('')
  // }
  // const onChangePost = (e) => {
  //   const {
  //     target: { value },
  //   } = e
  //   setPost(value)
  // }

  // 별점 클릭시 점수 확정
  // 별점 애니메이션 class 기억
  const [classAray, setClassAray] = useState([0, 0, 0, 0, 0]);
  let setAray = [...classAray];
  // 별점
  const [rating, setRating] = useState(0);
  const starClick = (e) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const width = e.currentTarget.getBoundingClientRect().width;
    const currentRating = Math.ceil((x / width) * 5);
    let j = 0;
    if (rating < currentRating) {
      for (let i = rating; i < currentRating; i++) {
        // 별점 애니메이션 class index 설정
        j++;
        setAray[i] = j;
        setClassAray(setAray);
        e.currentTarget.children[0].children[i].classList.add("active" + j);
        e.currentTarget.children[1].children[i].classList.add("active" + j);
      }
    } else {
      for (let i = rating - 1; i > currentRating - 1; i--) {
        e.currentTarget.children[0].children[i].classList.remove(
          "active" + setAray[i]
        );
        e.currentTarget.children[1].children[i].classList.remove(
          "active" + setAray[i]
        );
      }
    }
    setRating(currentRating);
  };
  // 별점 hover 시 채워지는 애니메이션
  const [overRating, setOverRating] = useState(0);
  const starOver = (e) => {
    let x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    let width = e.currentTarget.getBoundingClientRect().width;
    setOverRating(Math.ceil((x / width) * 5));
  };
  const starOut = () => {
    setOverRating(0);
  };
  // 별점 별 문구
  const ratingText = () => {
    switch (rating) {
      case 5:
        return "너무 좋아요";
      case 4:
        return "좋아요";
      case 3:
        return "괜찮아요";
      case 2:
        return "그저그래요";
      case 1:
        return "별로예요";
    }
  };

  return (
    <div className="review_write_page">
      <div>
        상품 정보
      </div>
      <StarRating
        onClick={starClick}
        rating={rating > overRating ? rating : overRating}
        onMouseOver={starOver}
        onMouseOut={starOut}
      />
      {rating > 0 ? (
        <p className="active">
          <span>{rating}점</span> {ratingText()}
        </p>
      ) : (
        <p>별점을 선택해주세요.</p>
      )}
      <hr />
      <h4>
        {rating > 0? '별점 '+ rating +'점 을 주셨어요.': null} <br />
        어떤 부분이 {rating < 3 & rating > 0? '별로 였나요?' :'좋았나요?'}
      </h4>
      <div className="tag_container">
        {tagList.map((tag, index) => (
          <div className="tag">
            {tag}
            <button onClick={() => deleteTagItem(index)}>x</button>
          </div>
        ))}
        <input
          type="search"
          className="tag_input"
          value={tagItem}
          placeholder="태그를 작성해 주세요"
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </div>
      <textarea cols="57" rows="10" placeholder={"aa"} value={post}></textarea>{" "}
      <div className="review">
        <ImageUpload />
      </div>
      {/** 디자인업로드 폼 */}
      <div className="design">
        <div className="design_preview"></div>
      </div>
      <ButtonComp type="submit" style={{ float: "right" }} color="brown">
        작성
      </ButtonComp>
      <ButtonComp
        type="submit"
        style={{ float: "right" }}
        color="brown"
        onClick={goBack}
      >
        취소
      </ButtonComp>
    </div>
  );
};
export default ReviewWriteForm;
