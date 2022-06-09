import React from "react";
import { MdExitToApp } from "react-icons/md";
export default function InfoBar({
  game,
  limitTimer,
  onQuit,
  gameTimer,
  timeLimit,
}) {
  return (
    <div className=" md:mx-5 text-white p-2 md:p-5 bg-black/[0.2] rounded-md flex flex-row justify-between w-[80vw]">
      <div className="flex flex-col md:flex-row ">
        <p className="mx-3">{`Trios found: ${game.stats.score}`}</p>
        {timeLimit ? (
          <p className="mx-3">{`Time Remaining: ${limitTimer.minutes}:${
            limitTimer.seconds < 10
              ? "0" + limitTimer.seconds
              : limitTimer.seconds
          }`}</p>
        ) : (
          <p className="mx-3">{`Time Elapsed: ${gameTimer.minutes}:${
            gameTimer.seconds < 10 ? "0" + gameTimer.seconds : gameTimer.seconds
          }`}</p>
        )}
        <p className="mx-3">{`Average time per Trio: ${
          game.stats.averageTimeToFind || " - : - -"
        }`}</p>
      </div>
      <div
        onClick={onQuit}
        className="cursor-pointer text-pastelRed-400 hover:text-pastelRed-300"
      >
        Quit Game <MdExitToApp className="text-3xl inline" />
      </div>
    </div>
  );
}
