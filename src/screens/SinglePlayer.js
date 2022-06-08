import React, { useState, useEffect } from "react";
import CardGrid from "../components/game/CardGrid";
import { useSelector, useDispatch } from "react-redux";
import { verifySet } from "../util/gameLogic";
import { scoreSinglePlayerGame } from "../redux/actionCreators";

//Timer Hooks
import { useStopwatch, useTimer } from "react-timer-hook";
import { toSeconds } from "../util/timeUtil";

// Sound Effects Imports
import useSound from "use-sound";
import Success from "../sounds/Success.mp3";
import Fail from "../sounds/Fail.mp3";

function SinglePlayer() {
  const game = useSelector((state) => state.singlePlayerGame.game); // Game Object from redux store
  const time = new Date();
  const timeLimit = game.options.timeLimit;
  time.setSeconds(time.getSeconds() + timeLimit);

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

  //Sound effects
  const { volume, mute } = useSelector((state) => state.settings);
  const [playSuccess] = useSound(Success, { volume: mute ? 0 : volume });
  const [playFail] = useSound(Fail, { volume: mute ? 0 : volume });

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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="container md:p-5">
        <div className=" md:mx-3 text-white p-2 md:p-5 bg-black/[0.2] rounded-md flex flex-row justify-between">
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
                gameTimer.seconds < 10
                  ? "0" + gameTimer.seconds
                  : gameTimer.seconds
              }`}</p>
            )}
            <p className="mx-3">{`Average time per Trio: ${
              game.stats.averageTimeToFind || " - : - -"
            }`}</p>
          </div>
          <div>Get Hint</div>
        </div>
        <CardGrid
          timeLimit={timeLimit}
          percentTimeRemaining={
            toSeconds(
              limitTimer.hours,
              limitTimer.minutes,
              limitTimer.seconds
            ) / timeLimit
          }
          activeCards={activeCards}
          setActive={setActive}
          cards={game.cardsInPlay}
        />
      </div>
    </div>
  );
}

export default SinglePlayer;
