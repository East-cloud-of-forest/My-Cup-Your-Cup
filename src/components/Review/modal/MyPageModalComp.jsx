import "./MyPageModal.scss";

const MyPageModalComp = () => {
  return (
    <div className="review_modal">
      <div className="user_review_image"></div>
      <div>
        <h1 className="review_h1">고객이 작성한 제목</h1>
        <ul className="review_profile">
          <li>
            <img src="" alt="" />
          </li>
          <li>user1</li>
          <li>조회수 0000</li>
          <li>2022-05-31</li>
          <li>★★★★★</li>
        </ul>{" "}
        <br />
        <p className="review_write">
          고객이 작성한 내용입니다.고객이 작성한 내용입니다.고객이 작성한
          내용입니다.고객이 작성한 내용입니다.고객이 작성한 내용입니다.고객이
          작성한 내용입니다.
        </p>
        <ul className="hashTag">
          <li>
            <a href="">#태그</a>
          </li>
          <li>
            <a href="">#태그</a>
          </li>
          <li>
            <a href="">#태그</a>
          </li>
        </ul>
        {/** */}
        <ul className="review_btn">
          <li>
            <button>
              ♥<span>4</span>
            </button>
          </li>
          <li>
            <button>공유</button>
          </li>
          <li>
            <button>제작하러 가기</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MyPageModalComp;
