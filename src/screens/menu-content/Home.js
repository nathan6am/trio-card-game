import React from "react";
import MenuButton from "../../components/menu/MenuButton";
import { FaEdit, FaScroll, FaPlay } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Main Menu</h1>
      <MenuButton
        color="success"
        size="md"
        onClick={() => {
          dispatch(changeMenu("play"));
        }}
      >
        <FaPlay className="button-icon" />
        Play Now
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("choose-name"));
        }}
      >
        <FaEdit className="button-icon" />
        Change Name
      </MenuButton>

      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("open rules");
        }}
      >
        <FaScroll className="button-icon" />
        How to Play
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("settings"));
        }}
      >
        <MdSettings className="button-icon" />
        Settings
      </MenuButton>
    </div>
  );
}
