import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLobby, updateLobbyGameState } from "../redux/actionCreators";
import { useWebsocket } from "../socket";
import LobbyMenu from "./menus/LobbyMenu";
import MultiPlayer from "./MultiPlayer";
export default function LobbyScreen() {
  const socket = useWebsocket();
  const user = useSelector((state) => state.user);
  const gameActive = useSelector((state) => state.lobby.gameActive);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("lobby:update", (lobby) => {
      console.log("updated");
      console.log(user);
      dispatch(updateLobby(lobby, user));
    });
    socket.on("game:update", (game) => {
      console.log(game);
      dispatch(updateLobbyGameState(game));
    });
  }, []);
  return (
    <div className="flex-1 h-screen overflow-y-auto flex-col">
      {gameActive ? (
        <MultiPlayer />
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <div className=" p-5 mdp-10 w-[600px] rounded-lg l mt-10 menu-card shadow-lg flex items-center justify-center">
            <div className="w-[95%] md:w-[75%] min-h-[400px]">
              <LobbyMenu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
