import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewModalComp from "../../components/Review/grid/ReviewModalComp";
import { boardRemove, boardSave } from "../../modules/Review/boardReducer";

const ReviewModalContainer = () => {
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
    <div>
      {boards.map((row, i) => (
        <ReviewModalComp
          boardId={row.boardId}
          boardImage={row.boardImage}
          boardTitle={row.boardTitle}
          boardRating={row.boardRating}
          boardContent={row.boardContent}
          key={i}
        />
      ))}
    </div>
  );
};

export default ReviewModalContainer;
