import React, { useState } from "react";

//Components
import MenuButton from "../../components/menu/MenuButton";
import { MdExitToApp } from "react-icons/md";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { changeMenu, joinLobby } from "../../redux/actionCreators";

//Hooks
import { useWebsocket } from "../../socket";

export default function JoinLobby() {
  const dispatch = useDispatch();
  const socket = useWebsocket();
  const user = useSelector((state) => state.user);

  const [lobbyId, setLobbyId] = useState("");
  const [joinFailed, setJoinFailed] = useState(false);

  const handleChange = (e) => {
    const exp = /^[0-9\b]+$/;
    const { value, maxLength } = e.target;
    if (e.target.value === "" || exp.test(e.target.value)) {
      const text = value.slice(0, maxLength);
      setLobbyId(text);
    }
  };

  const handleJoin = () => {
    socket.emit(
      "lobby:join",
      { user: user, lobbyId: lobbyId },
      function (lobby) {
        if (!lobby) {
          setJoinFailed(true);
        } else {
          dispatch(joinLobby(lobby, user));
        }
      }
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Welcome</h1>
      <div className="m-2">
        <label className="menu-label">Enter 6-Digit Lobby Code:</label>
        <input
          autoFocus
          maxLength={6}
          autoCapitalize="on"
          autoComplete="off"
          className="menu-text-input"
          type="text"
          name="name"
          onChange={handleChange}
          value={lobbyId}
        />
        {joinFailed && (
          <label className="menu-label text-pastelRed-500">
            Lobby code is not valid.
          </label>
        )}
      </div>
      <MenuButton color={"success"} size="md" onClick={handleJoin}>
        Join Lobby
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("party-mode"));
        }}
      >
        <MdExitToApp className="button-icon mr-2" />
        Back
      </MenuButton>
    </div>
  );
}
