import React from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaScroll, FaPlay, FaGlobe } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function PlayMenu() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-pastelRed-300 text-2xl mb-3 menu-title">
        New Game
      </h1>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          dispatch(changeMenu("singlePlayer"));
        }}
      >
        <MdPerson className="inline text-xl mb-1 mr-2" />
        Play Solo
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new multi player");
        }}
      >
        <MdPeopleAlt className="inline text-xl mb-1 mr-2" />
        Play With Friends
      </MenuButton>
      <MenuButton
        color="primary"
        size="md"
        onClick={() => {
          console.log("new multi player");
        }}
      >
        <FaGlobe className="inline text-xl mb-1 mr-2" />
        Play Online
      </MenuButton>
      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("main"));
        }}
      >
        <MdExitToApp className="inline text-xl mb-1 mr-2" flipHorizontal />
        Back
      </MenuButton>
    </div>
  );
}
