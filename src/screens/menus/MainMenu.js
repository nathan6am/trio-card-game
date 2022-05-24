import React from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaScroll, FaPlay } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function MainMenu() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-pastelRed-300 text-2xl mb-3 menu-title">
        Main Menu
      </h1>
      <MenuButton
        color="success"
        size="md"
        onClick={() => {
          dispatch(changeMenu("play"));
        }}
      >
        <FaPlay className="inline text-xl  mr-2" />
        Play Now
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new single player");
        }}
      >
        <FaEdit className="inline text-xl mb-1 mr-2" />
        Change Name
      </MenuButton>

      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new multi player");
        }}
      >
        <FaScroll className="inline text-xl mb-1 mr-2" />
        How to Play
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new multi player");
        }}
      >
        <MdSettings className="inline text-xl mb-1 mr-2" />
        Settings
      </MenuButton>
    </div>
  );
}
