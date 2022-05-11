import { combineReducers } from "redux";

import menuNavigator from "./menuNavigator.js";

const rootReducer = combineReducers({
  menu: menuNavigator,
});

export default rootReducer;
