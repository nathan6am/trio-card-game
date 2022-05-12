import React from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaScroll, FaPlay, FaGlobe } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function SinglePlayerMenu() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-pastelRed-300 text-2xl mb-3 menu-title">
        Play Solo
      </h1>
      <MenuButton
        color="success"
        size="md"
        onClick={() => {
          dispatch(changeMenu("play"));
        }}
      >
        <FaPlay className="inline text-xl  mr-2" />
        Start Game
      </MenuButton>
      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("play"));
        }}
      >
        <MdExitToApp className="inline text-xl mb-1 mr-2" flipHorizontal />
        Back
      </MenuButton>
    </div>
  );
}
