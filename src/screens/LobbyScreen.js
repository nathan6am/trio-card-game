import React, { useEffect, useState } from "react";
import { useWebsocket } from "../socket";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMenu,
  updateLobby,
  updateLobbyGameState,
  leaveLobby,
} from "../redux/actionCreators";

import LobbyMenu from "../components/lobby/LobbyMenu";
import MultiPlayer from "./MultiPlayer";
import GameRecap from "../components/lobby/GameRecap";

export default function LobbyScreen() {
  const dispatch = useDispatch();
  const socket = useWebsocket();

  const user = useSelector((state) => state.user);
  const [recapShown, setRecapShown] = useState(false);
  const gameActive = useSelector((state) => state.lobby.gameActive);
  const lobby = useSelector((state) => state.lobby);

  const onExit = () => {
    socket.emit("lobby:leave", { user: user, lobbyId: lobby.id }, (success) => {
      if (success) {
        dispatch(changeMenu("party-mode"));
        dispatch(leaveLobby());
      } else {
        console.error("something went wrong");
      }
    });
  };

  const hideRecap = () => {
    setRecapShown(false);
  };

  useEffect(() => {
    socket.on("lobby:update", (lobby) => {
      if (!lobby) {
        console.error("something went wrong");
      }
      dispatch(updateLobby(lobby, user));
    });
    socket.on("lobby:admin-left", () => {
      dispatch(changeMenu("admin-left"));
      dispatch(leaveLobby());
    });
    socket.on("game:update", (game) => {
      dispatch(updateLobbyGameState(game));
    });
    socket.on("game:ended", (lobby) => {
      setRecapShown(true);
      dispatch(updateLobby(lobby, user));
    });
    socket.on("game:time-limit-reached", (game) => {
      dispatch(updateLobbyGameState(game));
    });
  }, []);

  return (
    <div className="flex-1 h-screen overflow-y-auto flex-col">
      {gameActive ? (
        <MultiPlayer onQuit={onExit} />
      ) : (
        <>
          {recapShown ? (
            <GameRecap hideRecap={hideRecap} onExit={onExit} />
          ) : (
            <LobbyMenu onExit={onExit} />
          )}
        </>
      )}
    </div>
  );
}
