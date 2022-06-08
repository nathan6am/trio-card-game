import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { MdContentCopy, MdExitToApp } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import LobbyPlayers from "./LobbyPlayers";
import MenuButton from "../menu/MenuButton";
import { useWebsocket } from "../../socket";

import { changeMenu, leaveLobby } from "../../redux/actionCreators";
export default function LobbyMenu() {
  const dispatch = useDispatch();
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);
  const lobbyAdmin = lobby.users.find((user) => user.isAdmin);
  const isAdmin = lobbyAdmin && user.socketId === lobbyAdmin.socketId;
  const playersReady =
    lobby.users.length > 1 && lobby.users.every((user) => user.ready);
  const [tooltipText, setTooltipText] = useState("Copy code to clipboard");
  const socket = useWebsocket();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${lobby.id}`);
    setTooltipText("Copied to clipboard!");
  };
  const onExit = () => {
    socket.emit("lobby:leave", { user: user, lobbyId: lobby.id }, (success) => {
      if (success) {
        dispatch(changeMenu("party-mode"));
        dispatch(leaveLobby());
      }
    });
  };
  return (
    <div className="flex flex-grow items-center justify-center">
      <div className=" p-5 md:p-10 w-[600px] mt-10 rounded-lg l pt-10 menu-card shadow-lg flex items-center justify-center relative">
        <div
          onClick={onExit}
          className="absolute top-3 right-5  cursor-pointer text-pastelRed-400 hover:text-pastelRed-300"
        >
          Exit to Menu <MdExitToApp className="text-3xl inline" />
        </div>
        <div className="w-[95%] md:w-[75%] min-h-[400px]">
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
              <h1 className="menu-header menu-title mt-5">
                Realtime Multiplayer
              </h1>
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

              <LobbyPlayers
                players={lobby.users}
                currentUser={user}
                maxPlayers={lobby.game.options.maxPlayers}
              />
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
                {playersReady ? (
                  <>
                    {isAdmin ? (
                      <MenuButton
                        color="success"
                        size="md"
                        onClick={() => {
                          socket.emit(
                            "game:start",
                            lobby.id,
                            function (success) {
                              console.log(success);
                            }
                          );
                        }}
                      >
                        Start Game
                      </MenuButton>
                    ) : (
                      <p className="menu-label text-center my-3 ">
                        The lobby creator will start the game
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-row items-center justify-center my-3">
                    <p className="menu-label text-center mr-2">
                      {lobby.users.length < 2
                        ? "Waiting for players to join"
                        : "Not all players are ready"}
                    </p>
                    <PulseLoader color="#008bf0" size="5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
