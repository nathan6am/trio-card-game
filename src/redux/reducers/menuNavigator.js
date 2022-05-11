import { SET_ACTIVE_MENU } from "../actions";

const initialState = {
  activeMenu: "main",
  previousMenu: "main",
};

export default function (state = initialState, action) {
  const registeredMenus = [
    "main",
    "play",
    "setttings",
    "singlePlayer",
    "playOnline",
    "playWithFriends",
    "singleOptions",
    "lobbyOptions",
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
