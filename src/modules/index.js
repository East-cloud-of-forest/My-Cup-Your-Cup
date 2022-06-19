import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import boardReducer from "./Review/boardReducer";

const rootReducer = combineReducers({
  cartReducer,
  boardReducer,
});


export default rootReducer;
