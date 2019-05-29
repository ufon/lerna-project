import { combineReducers } from "redux";

import streamReducer from "./stream";
import authReducer from "./auth";

export default combineReducers({
  streamReducer,
  authReducer
});
