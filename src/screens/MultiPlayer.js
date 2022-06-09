import React, { useState, useEffect } from "react";
import CardGrid from "../components/game/CardGrid";
import { useSelector, useDispatch } from "react-redux";
import { verifySet } from "../util/gameLogic";
import { useWebsocket } from "../socket";
//Timer Hooks
import { useStopwatch, useTimer } from "react-timer-hook";
import { toSeconds } from "../util/timeUtil";
import MpInfoBar from "../components/lobby/MpInfoBar";
// Sound Effects Imports
import useSound from "use-sound";
import Success from "../sounds/Success.mp3";
import Fail from "../sounds/Fail.mp3";
import Countdown from "../sounds/Countdown.mp3";
export default function MultiPlayer({ onQuit }) {
  const dispatch = useDispatch();
  const [hasStarted, setHasStarted] = useState(false);
  const { volume, mute } = useSelector((state) => state.settings);
  const user = useSelector((state) => state.user);
  const lobby = useSelector((state) => state.lobby);
  const game = lobby.game;
  const startTime = new Date();
  const timeLimit = game.options.timeLimit;
  startTime.setSeconds(startTime.getSeconds() + 5);
  const endTime = new Date();
  endTime.setSeconds(endTime.getSeconds() + 5 + timeLimit);

  const startCountdown = useTimer({
    expiryTimestamp: startTime,
    onExpire: () => {
      setHasStarted(true);
    },
  });
  const secondsToStart = startCountdown.seconds;
  const gameTimer = useTimer({
    expiryTimestamp: endTime,
    autoStart: true,
  });
  const socket = useWebsocket();
  const [playSuccess] = useSound(Success, { volume: mute ? 0 : volume });
  const [playFail] = useSound(Fail, { volume: mute ? 0 : volume });
  const [playCountdown] = useSound(Countdown, { volume: mute ? 0 : volume });
  //Manage Selected Cards
  const [activeCards, setActiveCards] = useState([]);
  const setActive = (id) => {
    if (activeCards.includes(id)) {
      setActiveCards(activeCards.filter((card) => card !== id));
    } else {
      setActiveCards([...activeCards, id]);
    }
  };
  useEffect(() => {
    if (secondsToStart === 3) playCountdown();
  }, [secondsToStart]);

  useEffect(() => {
    if (activeCards.length !== 3) return;
    if (verifySet(activeCards)) {
      socket.emit(
        "game:score",
        {
          lobbyId: lobby.id,
          user: user,
          setToScore: activeCards,
        },
        function (success) {
          if (success) {
            setActiveCards([]);
            playSuccess();
          } else {
            setActiveCards([]);
          }
        }
      );
    } else {
      setActiveCards([]);
      playFail();
    }
  }, [activeCards, lobby, playFail, playSuccess, socket, user]);
  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="container">
        {hasStarted ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row justify-between w-full mx-10">
              <ScoreBoard scores={game.scores} user={user} />
              <MpInfoBar
                limitTimer={gameTimer}
                user={user}
                game={game}
                timeLimit={timeLimit}
                onQuit={onQuit}
              />
            </div>
            <CardGrid
              percentTimeRemaining={
                toSeconds(
                  gameTimer.hours,
                  gameTimer.minutes,
                  gameTimer.seconds
                ) / timeLimit
              }
              timeLimit={timeLimit}
              activeCards={activeCards}
              setActive={setActive}
              cards={game.cardsInPlay}
            />
          </div>
        ) : (
          <div className="container">
            <div className="flex w-full h-full justify-center items-center flex-col">
              <h1 className="menu-header menu-title text-4xl text-pastelRed-400 text-center">
                Get Ready!
              </h1>
              <h1 className="menu-header menu-title text-8xl text-pastelRed-400 text-center">
                {startCountdown.seconds}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreBoard({ scores, user }) {
  return (
    <div className="w-60 flex flex-col bg-black/[0.2] rounded p-4 m-4 px-10">
      <h1 className="menu-header menu-title  text-white text-xl">Scores</h1>
      {scores.map((score) => {
        return (
          <p key={score.user.socketId} className="text-white">{`${
            score.user.socketId === user.socketId
              ? score.user.displayName + " (You)"
              : score.user.displayName
          }: ${score.score}`}</p>
        );
      })}
    </div>
  );
}
