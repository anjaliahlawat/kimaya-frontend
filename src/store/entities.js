import { combineReducers } from "redux";
import authenticationReducer from "./login";
import registerReducer from "./register";

export default combineReducers({
  authentication: authenticationReducer,
  register: registerReducer,
});