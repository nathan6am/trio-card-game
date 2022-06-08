import React from "react";

//Components
import MenuButton from "../../components/menu/MenuButton";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";

//Redux
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function Play() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">New Game</h1>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("solo-mode"));
        }}
      >
        <MdPerson className="button-icon mr-2" />
        Play Solo
      </MenuButton>

      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("party-mode"));
        }}
      >
        <MdPeopleAlt className="button-icon mr-2" />
        Play With Friends
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("home"));
        }}
      >
        <MdExitToApp className="button-icon mr-2" />
        Back
      </MenuButton>
    </div>
  );
}
