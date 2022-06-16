import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import quantityReducer from "./setQuantity";
import boardReducer from "./Review/boardReducer";
const rootReducer = combineReducers({
  cartReducer,
  quantityReducer,
  boardReducer,
});

export default rootReducer;
