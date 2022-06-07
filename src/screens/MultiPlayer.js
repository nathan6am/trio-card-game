import React, { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import { useSelector, useDispatch } from "react-redux";
import { verifySet } from "../services/gameLogic";
import { scoreSinglePlayerGame } from "../redux/actionCreators";
import { useWebsocket } from "../socket";
//Timer Hooks
import { useStopwatch, useTimer } from "react-timer-hook";
import { toSeconds } from "../services/timeUtil";
import { updateLobby } from "../redux/actionCreators";
// Sound Effects Imports
import useSound from "use-sound";
import Success from "../sounds/Success.mp3";
import Fail from "../sounds/Fail.mp3";
import TimerProgressBar from "../components/TimerProgressBar";

export default function MultiPlayer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const lobby = useSelector((state) => state.lobby);
  const game = lobby.game;
  const socket = useWebsocket();
  const [playSuccess] = useSound(Success);
  const [playFail] = useSound(Fail);

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
    if (activeCards.length !== 3) return;
    console.log(verifySet(activeCards));
    if (verifySet(activeCards)) {
      console.log("valid");
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
  }, [activeCards]);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="container sm:p-5">
        {/* <div className="p-5">
          <p>{`Score: ${game.stats.score} Deck: ${game.deck.length} Time: ${
            gameTimer.minutes
          }:${
            gameTimer.seconds < 10 ? "0" + gameTimer.seconds : gameTimer.seconds
          }`}</p>
          <p>{`avg: ${game.stats.averageTimeToFind}`}</p>
          {game.isOver ? <p>over</p> : <p>not over</p>}
          <TimerProgressBar
            percent={
              toSeconds(
                limitTimer.hours,
                limitTimer.minutes,
                limitTimer.seconds
              ) / 300
            }
          />
        </div> */}
        <CardGrid
          activeCards={activeCards}
          setActive={setActive}
          cards={game.cardsInPlay}
        />
      </div>
    </div>
  );
}
