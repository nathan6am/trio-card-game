import * as actionTypes from "./actions.js";

export const changeMenu = (menuId) => {
  return {
    type: actionTypes.SET_ACTIVE_MENU,
    payload: menuId,
  };
};

export const previousMenu = () => {
  return {
    type: actionTypes.PREVIOUS_MENU,
    payload: null,
  };
};
