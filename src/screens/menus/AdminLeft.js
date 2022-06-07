import React, { useState, useRef, useEffect } from "react";

import MenuButton from "../../components/MenuButton";

import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";

export default function AdminLeft() {
  const dispactch = useDispatch();
  return (
    <div className="flex flex-col">
      <p className="text-center text-pastelRed-500 my-10">
        The creator of the lobby has left the game.
      </p>
      <MenuButton
        color={"success"}
        size="md"
        onClick={() => {
          dispactch(changeMenu("playPartyMode"));
        }}
      >
        Continue to menu
      </MenuButton>
    </div>
  );
}
