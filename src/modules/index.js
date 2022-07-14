import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import review from "./review";
import enteruser from './enteruser'
import loading from './loading'
import uploadDesign from "./uploadDesign";
import writeReview from "./writeReview";
import searchResult from "./searchResult";

const rootReducer = combineReducers({
  cartReducer,
  review,
  enteruser,
  loading,
  uploadDesign,
  writeReview,
  searchResult
});


export default rootReducer;
