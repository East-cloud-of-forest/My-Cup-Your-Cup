const ReviewFormComp = () => {
  return (
    <div>
      <form action="">
        <h1>리뷰를 작성하세요</h1>
        <label htmlFor="name">이름</label>
        <input type="text" /> <br />
        <label htmlFor="image">이미지업로드</label> <br />
        <input type="file" /> <br />
        <label htmlFor="review">리뷰</label> <br />
        <textarea name="" id="" cols="30" rows="10"></textarea> <br />
        <label htmlFor="rating">만족도</label>
        <select name="" id="">
          <option>★★★★★</option>
          <option>★★★★</option>
          <option>★★★</option>
          <option>★★</option>
          <option>★</option>
        </select>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default ReviewFormComp;
