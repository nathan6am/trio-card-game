import React from "react";

//Components
import MenuButton from "../../components/MenuButton";
import { FaGlobe } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";

//Redux
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function PlayMenu() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">New Game</h1>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("singlePlayer"));
        }}
      >
        <MdPerson className="button-icon mr-2" />
        Play Solo
      </MenuButton>

      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("playPartyMode"));
        }}
      >
        <MdPeopleAlt className="button-icon mr-2" />
        Play With Friends
      </MenuButton>

      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new multi player");
        }}
      >
        <FaGlobe className="button-icon mr-2" />
        Play Online
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("main"));
        }}
      >
        <MdExitToApp className="button-icon mr-2" flipHorizontal />
        Back
      </MenuButton>
    </div>
  );
}
