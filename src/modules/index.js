import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import review from "./review";
import enteruser from './enteruser'
import firebaseData from './firebaseData'
import loading from './loading'
import uploadDesign from "./uploadDesign";

const rootReducer = combineReducers({
  cartReducer,
  review,
  enteruser,
  firebaseData,
  loading,
  uploadDesign,

});


export default rootReducer;
