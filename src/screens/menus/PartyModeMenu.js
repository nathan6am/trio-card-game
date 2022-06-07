import React from "react";

//Components
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaPlay } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

//Redux
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function PartyModeMenu() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Party Mode</h1>
      <MenuButton
        color="success"
        size="md"
        onClick={() => {
          dispatch(changeMenu("createLobby"));
        }}
      >
        <FaPlay className="button-icon mr-2" />
        Create Lobby
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("joinLobby"));
        }}
      >
        <FaEdit className="button-icon mr-2" />
        Join Lobby
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("play"));
        }}
      >
        <MdExitToApp className="button-icon mr-2" />
        Back
      </MenuButton>
    </div>
  );
}
