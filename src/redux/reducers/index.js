import { combineReducers } from "redux";

import menuNavigator from "./menuNavigator.js";
import userReducer from "./userReducer.js";
import singlePlayerGame from "./singlePlayerGame.js";
const rootReducer = combineReducers({
  menu: menuNavigator,
  user: userReducer,
  singlePlayerGame: singlePlayerGame,
});

export default rootReducer;
