import React from "react";
import { useSelector } from "react-redux";
import MainMenu from "./menus/MainMenu";
import PlayMenu from "./menus/PlayMenu";
import SinglePlayerMenu from "./menus/SinglePlayerMenu";
export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img
          src={require("../img/logo.png")}
          width="600
        "
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="p-10 w-[400px] rounded-lg l mt-10 menu-card shadow-lg flex items-center justify-center">
          <div className="w-[90%] min-h-[300px]">
            <ActiveMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

const ActiveMenu = () => {
  const menuToDisplay = useSelector((state) => state.menu.activeMenu);
  switch (menuToDisplay) {
    case "main":
      return <MainMenu />;
    case "play":
      return <PlayMenu />;
    case "singlePlayer":
      return <SinglePlayerMenu />;
    default:
      return <MainMenu />;
  }
};
