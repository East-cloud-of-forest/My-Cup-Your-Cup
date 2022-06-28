import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
// import quantityReducer from "./setQuantity";
import review from "./review";
import enteruser from './enteruser'
import firebaseData from './firebaseData'
import loading from './loading'

const rootReducer = combineReducers({
  cartReducer,
  // quantityReducer,
  review,
  enteruser,
  firebaseData,
  loading
});


export default rootReducer;
