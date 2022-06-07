import React, { useState, useEffect } from "react";

import { MdContentCopy } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import LobbyPlayers from "../../components/LobbyPlayers";
import MenuButton from "../../components/MenuButton";
import { useWebsocket } from "../../socket";
export default function LobbyMenu() {
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);
  const [tooltipText, setTooltipText] = useState("Copy code to clipboard");
  const socket = useWebsocket();
  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${lobby.id}`);
    setTooltipText("Copied to clipboard!");
  };
  return (
    <div>
      <ReactTooltip
        effect="solid"
        place="right"
        getContent={(dataTip) => {
          return tooltipText;
        }}
        afterHide={() => {
          setTooltipText("Copy code to clipboard");
        }}
      />
      <div className="flex flex-col">
        <h1 className="menu-header menu-title">Realtime Multiplayer</h1>
        <div
          data-tip={tooltipText}
          onClick={handleCopyCode}
          className="transition ease-in-out transition-all px-2 pt-2 pb-1 rounded-xl border-2 border-pastelGreen-300 bg-white/50 group flex flex-row justify-center hover:bg-pastelGreen-100"
        >
          <h3 className="menu-label text-lg text-center ml-8 text-gray-800">
            Lobby Code:{" "}
            <span className="text-gray-900 text-lg">
              <b>{lobby.id}</b>
            </span>
          </h3>

          <a className="text-gray-800 justify-self-end">
            <MdContentCopy className="transition ease-in-out transition-all opacity-0 inline button-icon mt-1 ml-2  group-hover:opacity-100" />
          </a>
        </div>
        <p className="menu-label text-center text-sm  mt-2">
          Share this code with other players and ask them to join!
        </p>
        <a
          onClick={() => {
            console.log(lobby);
          }}
        >
          log
        </a>
        <LobbyPlayers players={lobby.users} currentUser={user} maxPlayers={5} />
        <div className="mt-10 px-5 justify-center flex flex-col">
          {!user.ready ? (
            <MenuButton
              color="success"
              size="md"
              onClick={() => {
                socket.emit(
                  "lobby:set-ready",
                  {
                    user: user,
                    lobbyId: lobby.id,
                    readyState: true,
                  },
                  function (success) {
                    console.log(success);
                  }
                );
              }}
            >
              Ready Up
            </MenuButton>
          ) : (
            <MenuButton
              color="danger"
              size="md"
              onClick={() => {
                socket.emit(
                  "lobby:set-ready",
                  {
                    user: user,
                    lobbyId: lobby.id,
                    readyState: false,
                  },
                  function (success) {
                    console.log(success);
                  }
                );
              }}
            >
              Not Ready
            </MenuButton>
          )}
          <MenuButton
            color="success"
            size="md"
            onClick={() => {
              socket.emit("game:start", lobby.id, function (success) {
                console.log(success);
              });
            }}
          >
            Start Game
          </MenuButton>
        </div>
      </div>
    </div>
  );
}
