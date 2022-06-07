import { combineReducers } from "redux";

import menuNavigator from "./menuNavigator.js";
import userReducer from "./userReducer.js";
import singlePlayerGame from "./singlePlayerGame.js";
import lobbyReducer from "./lobbyReducer.js";
const rootReducer = combineReducers({
  menu: menuNavigator,
  user: userReducer,
  singlePlayerGame: singlePlayerGame,
  lobby: lobbyReducer,
});

export default rootReducer;
