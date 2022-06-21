import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
// import quantityReducer from "./setQuantity";
import boardReducer from "./Review/boardReducer";
import enteruser from './enteruser'
import firebaseData from './firebaseData'

const rootReducer = combineReducers({
  cartReducer,
  // quantityReducer,
  boardReducer,
  enteruser,
  firebaseData
});


export default rootReducer;
