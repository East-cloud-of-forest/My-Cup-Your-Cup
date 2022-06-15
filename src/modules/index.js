import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";
import quantityReducer from "./setQuantity";
const rootReducer = combineReducers({
    cartReducer,
    quantityReducer,

})

export default rootReducer;