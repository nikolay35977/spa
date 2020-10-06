import {applyMiddleware, combineReducers, createStore} from "redux";
import TextReducer from "./TextReducer";
import thunkMiddleware from "redux-thunk";


let reduser = combineReducers({
    Text: TextReducer
});

const store = createStore(reduser, applyMiddleware(thunkMiddleware));

export default store;