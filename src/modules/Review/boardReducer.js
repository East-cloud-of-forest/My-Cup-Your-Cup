// 액션 타입
const MODE_REMOVE = "REMOVE";
const MODE_SAVE = "SAVE";
const MODE_SELECT_ROW = "SELECT_ROW";

// 액션 함수
export const boardSave = (saveData) => ({
  type: MODE_SAVE,
  saveData: {
    boardId: saveData.boardId,
    boardImage: saveData.boardImage,
    boardTitle: saveData.boardTitle,
    boardRating: saveData.boardRating,
    boardContent: saveData.boardContent,
  },
});
export const boardRemove = (boardId) => ({
  type: MODE_REMOVE,
  boardId: boardId,
});
export const boardSelectRow = (boardId) => ({
  type: MODE_SELECT_ROW,
  boardId: boardId,
});

// state
const initialState = {
  boards: [
    {
      boardId: 1,
      boardImage:
        "https://cdn.pixabay.com/photo/2022/02/10/03/04/tumbler-7004528_960_720.jpg",
      boardTitle: "제목1",
      boardContent: "내용내용내용1",
      boardRating: "⭐⭐⭐⭐⭐",
    },
    {
      boardId: 2,
      boardImage:
        "https://cdn.pixabay.com/photo/2021/07/08/04/49/tumbler-6395841_960_720.jpg",
      boardTitle: "제목2",
      boardContent: "내용내용내용2",
      boardRating: "⭐⭐⭐⭐",
    },
    {
      boardId: 3,
      boardImage:
        "https://cdn.pixabay.com/photo/2021/11/11/02/49/tumbler-6785273_960_720.jpg",
      boardTitle: "제목3",
      boardContent: "내용내용내용3",
      boardRating: "⭐⭐⭐",
    },
    {
      boardId: 4,
      boardImage:
        "https://cdn.pixabay.com/photo/2016/06/24/12/29/starbuck-1477160_960_720.jpg",
      boardTitle: "제목4",
      boardContent: "내용내용내용4",
      boardRating: "⭐⭐",
    },
    {
      boardId: 5,
      boardImage:
        "https://cdn.pixabay.com/photo/2016/06/24/12/29/starbuck-1477160_960_720.jpg",
      boardTitle: "제목5",
      boardContent: "내용내용내용5",
      boardRating: "⭐⭐⭐⭐",
    },
  ],
  lastId: 5,
  selectRowData: {},
};

// 리듀서 함수
function boardReducer(state = initialState, action) {
  switch (
    action.type // 클릭한 boardId 를 가지지 않은 data 만 return
  ) {
    case MODE_REMOVE:
      return {
        ...state,
        boards: state.boards.filter((row) => row.boardId !== action.boardId),
      };
    case MODE_SAVE:
      if (action.saveData.boardId === "") {
        // boardId 가 없다면 신규 데이터 저장
        return {
          lastId: state.lastId + 1,
          boards: state.boards.concat({
            ...action.saveData,
            boardId: state.lastId + 1,
          }),
          selectRowData: {},
        };
      } else {
        // boardId 가 있다면 기존 데이터 수정
        return {
          ...state,
          boards: state.boards.map((data) =>
            data.boardId === action.saveData.boardId
              ? { ...action.saveData }
              : data
          ),
          selectRowData: {},
        };
      }

    case MODE_SELECT_ROW:
      return {
        // 클릭한 셀의 boardId 를 가진 state 만 찾아서 return
        ...state,
        selectRowData: state.boards.find(
          (row) => row.boardId === action.boardId
        ),
      };
    default:
      return state;
  }
}

export default boardReducer;
