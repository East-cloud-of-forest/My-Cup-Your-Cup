import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import ReduxThunk from 'redux-thunk'
//import { composeWithDevTools } from "redux-devtools-extension";


export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
