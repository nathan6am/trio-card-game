import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMenu,
  updateLobby,
  updateLobbyGameState,
  leaveLobby,
} from "../redux/actionCreators";
import { useWebsocket } from "../socket";
import LobbyMenu from "./menus/LobbyMenu";
import MultiPlayer from "./MultiPlayer";
import GameRecap from "./GameRecap";
export default function LobbyScreen() {
  const socket = useWebsocket();
  const user = useSelector((state) => state.user);
  const gameActive = useSelector((state) => state.lobby.gameActive);
  const game = useSelector((state) => state.lobby.game);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("lobby:update", (lobby) => {
      dispatch(updateLobby(lobby, user));
    });
    socket.on("lobby:admin-left", () => {
      dispatch(changeMenu("adminLeft"));
      dispatch(leaveLobby());
    });
    socket.on("game:update", (game) => {
      dispatch(updateLobbyGameState(game));
    });
    socket.on("game:time-limit-reached", (game) => {
      dispatch(updateLobbyGameState(game));
    });
  }, []);
  return (
    <div className="flex-1 h-screen overflow-y-auto flex-col">
      {gameActive ? (
        <>{game.isOver ? <GameRecap /> : <MultiPlayer />}</>
      ) : (
        <LobbyMenu />
      )}
    </div>
  );
}
