import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import boardReducer from "./Review/boardReducer";
import enteruser from './enteruser'

const rootReducer = combineReducers({
  cartReducer,
  boardReducer,
  enteruser
});


export default rootReducer;
