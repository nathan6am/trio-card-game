import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainMenu from "./menus/MainMenu";
import PlayMenu from "./menus/PlayMenu";
import SinglePlayerMenu from "./menus/SinglePlayerMenu";
import LandingMenu from "./menus/LandingMenu";
import SinglePlayer from "./SinglePlayer";
import PartyModeMenu from "./menus/PartyModeMenu";
import JoinLobbyMenu from "./menus/JoinLobbyMenu";
import CreateLobbyMenu from "./menus/CreateLobbyMenu";
import LobbyMenu from "./menus/LobbyMenu";
export default function Home() {
  const displayName = useSelector((state) => state.user.displayName);
  return (
    <div className="flex-1 h-screen overflow-y-auto flex-col">
      <>
        <div className="flex items-center justify-center p-10">
          <img src={require("../img/logo.png")} width="600" />
        </div>
        {displayName ? (
          <h2 className="text-center">{`Hi, ${displayName}`}</h2>
        ) : null}
        <div className="flex flex-grow items-start justify-center">
          <div className="p-10 w-[400px] rounded-lg l mt-10 menu-card shadow-lg flex items-center justify-center">
            <div className="w-[90%] min-h-[300px]">
              <ActiveMenu />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

const ActiveMenu = () => {
  const menuToDisplay = useSelector((state) => state.menu.activeMenu);
  switch (menuToDisplay) {
    case "landing":
      return <LandingMenu />;
    case "main":
      return <MainMenu />;
    case "play":
      return <PlayMenu />;
    case "singlePlayer":
      return <SinglePlayerMenu />;
    case "playPartyMode":
      return <PartyModeMenu />;
    case "createLobby":
      return <CreateLobbyMenu />;
    case "joinLobby":
      return <JoinLobbyMenu />;
    default:
      return <MainMenu />;
  }
};
