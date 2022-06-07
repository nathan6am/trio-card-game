import { SET_ACTIVE_MENU } from "../actions";

const initialState = {
  activeMenu: "landing",
  previousMenu: "landing",
};

export default function (state = initialState, action) {
  const registeredMenus = [
    "main",
    "play",
    "setttings",
    "singlePlayer",
    "playOnline",
    "playPartyMode",
    "singleOptions",
    "createLobby",
    "joinLobby",
    "adminLeft",
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
