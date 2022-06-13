import React from "react";

import MenuButton from "../../components/menu/MenuButton";
import { MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";
export default function Rules() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <div className="overflow-y-scroll max-h-[360px] bg-white/[0.5] p-1 mb-3">
        <h1 className="menu-title menu-header ">Rules</h1>
        <p className="my-2">
          Trio is a real time multiplayer matching card game. There are 12 cards
          in play at any given time. Each card is unique and has 4
          characteristics that can be one of three options.
        </p>
        <p className="my-2">
          The characteristics are color, fill shape, and number of symbols. The
          object of the game is to find “trios” of 3 cards for which, when
          looked at individually, each characteristic is either all the same or
          all different between the three cards.{" "}
        </p>
        <p className="my-2">
          As long as each characteristic meets this condition the trio is valid.
          For example, you can have a valid trio of cards where each color is
          the same, each shape is different, etc.
        </p>
        <h1 className="menu-title menu-header mt-4">Game Modes</h1>
        <p className="my-2">
          In standard mode, cards are removed once a player finds a trio. The
          game is played until there are no remaining cards in the deck and no
          valid trios in the field of play. The player with the most trios found
          wins.
        </p>
        <p className="my-2">
          In timed mode, cards are shuffled back into the deck after a player
          finds a trio. The game is played until the timer expires. The player
          with the most trios found wins.
        </p>
      </div>
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
