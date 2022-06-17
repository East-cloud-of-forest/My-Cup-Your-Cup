import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewComp from "../../components/Review/grid/ReviewComp";
import { boardRemove, boardSave } from "../../modules/Review/boardReducer";

const ReviewContainer = () => {
  const { boards } = useSelector((state) => state.boardReducer);
  const dispatch = useDispatch();

  const onRemove = useCallback(
    (boardId) => dispatch(boardRemove(boardId)),
    [dispatch]
  );
  const onSave = useCallback(
    (saveData) => dispatch(boardSave(saveData)),
    [dispatch]
  );

  return (
    <div
      style={{
        display: "flex",
        paddingRight: "20px",
        width: "1400px",
        flexWrap: "wrap",
      }}
    >
      {boards.map((row) => (
        <ReviewComp
          boardId={row.boardId}
          boardImage={row.boardImage}
          boardTitle={row.boardTitle}
          boardRating={row.boardRating}
        />
      ))}
    </div>
  );
};

export default ReviewContainer;
