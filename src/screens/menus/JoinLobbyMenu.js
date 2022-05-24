import React, { useState, useRef, useEffect } from "react";
import MenuButton from "../../components/MenuButton";
import ReactCodeInput from "react-code-input";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu, changeDisplayName } from "../../redux/actionCreators";
import { useWebsocket } from "../../socket";
export default function JoinLobbyMenu() {
  const displayName = useSelector((state) => state.user.displayName);
  const socketId = useSelector((state) => state.user.socketId);
  const socket = useWebsocket();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    return () => {};
  }, []);
  const [lobbyId, setLobbyId] = useState("");

  const handleChange = (e) => {
    const { value, maxLength } = e.target;
    const text = value.slice(0, maxLength);

    setLobbyId(text);
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-pastelRed-300 text-2xl mb-3 menu-title">
        Welcome
      </h1>
      <div className="m-2">
        <label className="text-pastelRed-300 mb-2">
          Enter 6-Digit Lobby Code:
        </label>
        <input
          autoFocus
          ref={inputRef}
          maxLength={16}
          autoCapitalize="on"
          autoComplete="off"
          className="appearance-none caret-pastelRed-300 border rounded w-full mt-2 mb-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Display name"
          onChange={handleChange}
          value={lobbyId}
        />
      </div>
      <MenuButton
        color={"success"}
        size="md"
        onClick={() => {
          socket.emit(
            "lobby:create",
            {
              socketId: socketId,
              displayName: displayName,
            },
            function (lobby) {
              console.log(lobby);
            }
          );
        }}
      >
        Create
      </MenuButton>
      <MenuButton
        color={"success"}
        size="md"
        onClick={() => {
          socket.emit(
            "lobby:join",
            {
              user: {
                socketId: socketId,
                displayName: displayName,
              },
              lobbyId: lobbyId,
            },
            function (lobby) {
              console.log(lobby);
            }
          );
        }}
      >
        Continue
      </MenuButton>
    </div>
  );
}
