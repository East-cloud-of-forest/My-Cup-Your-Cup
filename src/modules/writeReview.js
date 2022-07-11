// Create page에서 저장버튼 클릭시
const ADD_REVIEW_ITEM = "writeReview/ADD_REVIEW_ITEM";

// firestore 컬렉션에 존재하는 문서를 확인하고, 다음 아이디로 할당할 수 있게
export const addReviewItem = (payload) => ({
  type: ADD_REVIEW_ITEM,
  payload,
});

const initialState = {
  reviewItem: {},
};
const writeReview = (state = initialState, action) => {
  if (action.type === ADD_REVIEW_ITEM) {
    return {
      ...state,
      reviewItem: action.payload,
    };
  } else {
    return state;
  }
};

export default writeReview;
