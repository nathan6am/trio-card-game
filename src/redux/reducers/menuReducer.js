import { SET_ACTIVE_MENU } from "../actions";

const initialState = {
  activeMenu: "choose-name",
  previousMenu: "choose-name",
};

export default function (state = initialState, action) {
  const registeredMenus = [
    "home",
    "choose-name",
    "play",
    "setttings",
    "solo-mode",
    "party-mode",
    "join-lobby",
    "create-lobby",
    "admin-left",
    "settings",
    "rules",
  ];
  switch (action.type) {
    case SET_ACTIVE_MENU:
      const menu = registeredMenus.find((menu) => menu === action.payload);
      if (!menu) throw new Error("Invalid menuId");
      return {
        activeMenu: menu,
        previousMenu: state.activeMenu,
      };

    default:
      return state;
  }
}
