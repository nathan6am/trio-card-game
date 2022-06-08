import React from "react";
import { MdExitToApp } from "react-icons/md";
export default function MpInfoBar({
  game,
  limitTimer,
  onQuit,
  timeLimit,
  user,
}) {
  return (
    <div className="flex flex-col md:flex-row ">
      {timeLimit && (
        <p className="m-10 text-white">{`Time Remaining: ${
          limitTimer.minutes
        }:${
          limitTimer.seconds < 10
            ? "0" + limitTimer.seconds
            : limitTimer.seconds
        }`}</p>
      )}
      <div
        onClick={onQuit}
        className="cursor-pointer text-pastelRed-400 hover:text-pastelRed-300 m-10"
      >
        Quit Game <MdExitToApp className="text-3xl inline" />
      </div>
    </div>
  );
}
