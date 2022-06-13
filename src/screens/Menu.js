import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuContainer from "../components/menu/MenuContainer";
import {
  ChooseDisplayName,
  AdminLeft,
  CreateLobby,
  Home,
  JoinLobby,
  PartyMode,
  Play,
  SoloMode,
  Settings,
  Rules,
} from "../screens/menu-content";
export default function Menu() {
  const displayName = useSelector((state) => state.user.displayName);
  return (
    <div className="flex-1 h-screen overflow-y-auto flex-col">
      <>
        <div className="flex items-center justify-center p-7">
          <img src={require("../img/logo.png")} width="500" />
        </div>
        {displayName ? (
          <h2 className="text-center text-pastelBlue-500 text-lg">{`Hi, ${displayName}`}</h2>
        ) : null}
        <MenuContainer>
          <MenuContent />
        </MenuContainer>
      </>
    </div>
  );
}

const MenuContent = () => {
  const menuToDisplay = useSelector((state) => state.menu.activeMenu);
  switch (menuToDisplay) {
    case "choose-name":
      return <ChooseDisplayName />;
    case "home":
      return <Home />;
    case "settings":
      return <Settings />;
    case "play":
      return <Play />;
    case "solo-mode":
      return <SoloMode />;
    case "party-mode":
      return <PartyMode />;
    case "create-lobby":
      return <CreateLobby />;
    case "join-lobby":
      return <JoinLobby />;
    case "admin-left":
      return <AdminLeft />;
    case "rules":
      return <Rules />;
    default:
      return <Home />;
  }
};
