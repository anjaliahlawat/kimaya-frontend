import { combineReducers } from "redux";
import authenticationReducer from "./login";
import registerReducer from "./register";
import studentListsReducer from "./studentList";
import studentProfileReducer from "./studentProfile";
import settingsReducer from "./settings";

export default combineReducers({
  authentication: authenticationReducer,
  register: registerReducer,
  studentLists: studentListsReducer,
  studentProfile: studentProfileReducer,
  settings: settingsReducer,
});