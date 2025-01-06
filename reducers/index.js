import userReducer from "./userReducer";
import busReducer from "./busReducer";
import { combineReducers } from "redux";

export default combineReducers({
    user: userReducer,
    bus: busReducer
});