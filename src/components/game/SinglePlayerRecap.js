import React from "react";
import MenuContainer from "../menu/MenuContainer";
import MenuButton from "../menu/MenuButton";
import { FaPlay } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
export default function SinglePlayerRecap() {
  const game = useSelector((state) => state.singlePlayerGame.game);
  const storedSettings = useSelector(
    (state) => state.settings.savedGameSettings
  );

  return (
    <MenuContainer>
      <div className="flex flex-col">
        <h1 className="menu-header menu-title">Game Over!</h1>
        <h2>Your Score: {game.stats.score}</h2>
        <p>Average time per Trio: {game.stats.averageTimeToFind}s</p>
        <MenuButton color="success" size="md">
          <FaPlay className="inline text-xl  mr-2" />
          Play Again
        </MenuButton>
        <MenuButton color="danger" size="md">
          <MdExitToApp className="inline text-xl mb-1 mr-2" />
          Exit
        </MenuButton>
      </div>
    </MenuContainer>
  );
}
