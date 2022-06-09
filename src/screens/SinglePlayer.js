import React, { useState, useEffect } from "react";
import CardGrid from "../components/game/CardGrid";
import { useSelector, useDispatch } from "react-redux";
import { verifySet } from "../util/gameLogic";
import {
  scoreSinglePlayerGame,
  endSinglePlayerGame,
  restartSinglePlayerGame,
} from "../redux/actionCreators";
import SinglePlayerRecap from "../components/game/SinglePlayerRecap";
import InfoBar from "../components/game/InfoBar";
import toast from "react-hot-toast";
//Timer Hooks
import { useStopwatch, useTimer } from "react-timer-hook";
import { toSeconds } from "../util/timeUtil";

// Sound Effects Imports
import useSound from "use-sound";
import Success from "../sounds/Success.mp3";
import Fail from "../sounds/Fail.mp3";

function SinglePlayer() {
  const game = useSelector((state) => state.singlePlayerGame.game); // Game Object from redux store

  const timeLimit = game.options.timeLimit;
  const createExpiryStamp = () => {
    const time = new Date();
    const timeLimit = game.options.timeLimit;
    time.setSeconds(time.getSeconds() + timeLimit);
    return time;
  };

  const dispatch = useDispatch();

  const storedSettings = useSelector((state) => state.settings.storedSettings);

  const onRestart = () => {
    limitTimer.restart(createExpiryStamp(), true);
    gameTimer.reset();
    scoreTimer.reset();
    dispatch(restartSinglePlayerGame(storedSettings));
  };

  const onQuit = () => {
    dispatch(endSinglePlayerGame());
  };
  const scoreTimer = useStopwatch({ autoStart: true }); // Track time per score, resets after every score
  const gameTimer = useStopwatch({ autoStart: true }); // Tracks overall game time
  const limitTimer = useTimer({
    expiryTimestamp: createExpiryStamp(),
    autoStart: true,
    onExpire: () => {
      if (timeLimit) {
        dispatch(endSinglePlayerGame());
      }
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
      toast.success("Great Job!");
    } else {
      setActiveCards([]);
      playFail();
      toast.error("Invalid Trio");
    }
  }, [activeCards, scoreTimer, dispatch, playFail, playSuccess, toast]);

  return (
    <>
      {game.isOver ? (
        <SinglePlayerRecap onRestart={onRestart} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="container md:p-5 h-screen ">
            <InfoBar
              limitTimer={limitTimer}
              gameTimer={gameTimer}
              onQuit={onQuit}
              game={game}
              timeLimit={timeLimit}
            />
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
      )}
    </>
  );
}

export default SinglePlayer;
