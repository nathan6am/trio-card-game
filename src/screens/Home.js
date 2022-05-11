import React from "react";
import { useSelector } from "react-redux";
import MainMenu from "./menus/MainMenu";
import PlayMenu from "./menus/PlayMenu";

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
        <div className="p-10 w-[500px] rounded-lg l mt-10  flex items-center justify-center">
          <div className="w-[70%] min-h-[300px]">
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
    default:
      return <MainMenu />;
  }
};
