import React, { useState, useRef, useEffect } from "react";
import MenuButton from "../../components/MenuButton";
import ReactCodeInput from "react-code-input";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMenu,
  changeDisplayName,
  joinLobby,
} from "../../redux/actionCreators";
import { useWebsocket } from "../../socket";
import { MdExitToApp } from "react-icons/md";
export default function JoinLobbyMenu() {
  const user = useSelector((state) => state.user);
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
      <h1 className="menu-header menu-title">Welcome</h1>
      <div className="m-2">
        <label className="menu-label">Enter 6-Digit Lobby Code:</label>
        <input
          autoFocus
          ref={inputRef}
          maxLength={6}
          autoCapitalize="on"
          autoComplete="off"
          className="menu-text-input"
          type="text"
          name="name"
          onChange={handleChange}
          value={lobbyId}
        />
      </div>
      <MenuButton
        color={"success"}
        size="md"
        onClick={() => {
          socket.emit(
            "lobby:join",
            {
              user: user,
              lobbyId: lobbyId,
            },
            function (lobby) {
              if (!lobby) {
                console.error("unabletojoinlobby");
              } else {
                dispatch(joinLobby(lobby, user));
              }
            }
          );
        }}
      >
        Join Lobby
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("playPartyMode"));
        }}
      >
        <MdExitToApp className="button-icon mr-2" flipHorizontal />
        Back
      </MenuButton>
    </div>
  );
}
