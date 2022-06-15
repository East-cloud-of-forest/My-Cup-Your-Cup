import { combineReducers } from "redux";

// 리덕스 모듈
import cartReducer from "./addCart";

const rootReducer = combineReducers({
    cartReducer,


})

export default rootReducer;