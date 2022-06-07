import React, { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import { useSelector, useDispatch } from "react-redux";
import { verifySet } from "../services/gameLogic";
import { scoreSinglePlayerGame } from "../redux/actionCreators";

//Timer Hooks
import { useStopwatch, useTimer } from "react-timer-hook";
import { toSeconds } from "../services/timeUtil";

// Sound Effects Imports
import useSound from "use-sound";
import Success from "../sounds/Success.mp3";
import Fail from "../sounds/Fail.mp3";
import TimerProgressBar from "../components/TimerProgressBar";

function SinglePlayer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);

  const dispatch = useDispatch();
  const scoreTimer = useStopwatch({ autoStart: true }); // Track time per score, resets after every score
  const gameTimer = useStopwatch({ autoStart: true }); // Tracks overall game time
  const limitTimer = useTimer({
    expiryTimestamp: time,
    autoStart: true,
    onExpire: () => {
      console.log("expired");
    },
  });
  const game = useSelector((state) => state.singlePlayerGame.game); // Game Object from redux store

  //Sound effects
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

  //Trigger verification/scoring when 3 cards are selected
  useEffect(() => {
    if (activeCards.length !== 3) return;
    console.log(verifySet(activeCards));
    if (verifySet(activeCards)) {
      console.log("valid");
      const timeToFind = toSeconds(
        scoreTimer.hours,
        scoreTimer.minutes,
        scoreTimer.seconds
      );
      scoreTimer.reset();
      dispatch(scoreSinglePlayerGame(activeCards, timeToFind));
      setActiveCards([]);
      playSuccess();
    } else {
      setActiveCards([]);
      playFail();
    }
  }, [activeCards]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="container sm:p-5">
        <div className="p-5">
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
        </div>
        <CardGrid
          activeCards={activeCards}
          setActive={setActive}
          cards={game.cardsInPlay}
        />
      </div>
    </div>
  );
}

export default SinglePlayer;
