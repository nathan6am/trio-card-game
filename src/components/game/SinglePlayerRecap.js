import React from "react";
import MenuContainer from "../menu/MenuContainer";
import MenuButton from "../menu/MenuButton";
import { FaPlay } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { exitSinglePlayer, changeMenu } from "../../redux/actionCreators";
export default function SinglePlayerRecap({ onRestart }) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.singlePlayerGame.game);
  const onExit = () => {
    dispatch(changeMenu("solo-mode"));
    dispatch(exitSinglePlayer());
  };
  return (
    <MenuContainer>
      <div className="flex flex-col">
        <h1 className="menu-header menu-title text-pastelRed-400">
          Game Over!
        </h1>
        <h2 className="text-center text-lg text-pastelBlue-500">
          Your Score:{" "}
          <span className="font-bold text-white">{game.stats.score}</span>
        </h2>
        <p className="text-pastelBlue-500 m-4 text-center">
          Average time per Trio:{" "}
          <span className="font-bold text-white">
            {game.stats.averageTimeToFind || "-"}s
          </span>
        </p>
        <MenuButton onClick={onRestart} color="success" size="md">
          <FaPlay className="inline text-xl  mr-2" />
          Play Again
        </MenuButton>
        <MenuButton onClick={onExit} color="danger" size="md">
          <MdExitToApp className="inline text-xl mb-1 mr-2" />
          Exit
        </MenuButton>
      </div>
    </MenuContainer>
  );
}
