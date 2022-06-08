import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdExitToApp } from "react-icons/md";
import { FaPlay, FaYoutube } from "react-icons/fa";
import MenuButton from "../menu/MenuButton";
import MenuContainer from "../menu/MenuContainer";
const rankResults = (scores) => {
  let ranked = scores.sort((a, b) => (a.score < b.score ? 1 : -1));
  return ranked;
};
export default function GameRecap() {
  const game = useSelector((state) => state.lobby.game);
  let user = useSelector((state) => state.user);
  const ranked = rankResults(game.scores);
  let winners = [];
  ranked.forEach((score, idx) => {
    let topScore;
    if (idx === 0) {
      topScore = score.score;
      winners.push(score);
    } else {
      if (score.score === topScore) winners.push(score);
    }
  });

  return (
    <MenuContainer>
      <div className="flex flex-col">
        {winners.length > 1 ? (
          <h2 className="menu-header menu-title">
            {winners
              .map((score) => {
                if (score.user.socketId === user.socketId) return "You";
                return score.user.displayName;
              })
              .join(" and ")}{" "}
            tied for the win.
          </h2>
        ) : (
          <h2 className="menu-header menu-title">
            {winners[0].user.socketId === user.socketId
              ? "Great job! You won!"
              : winners[0].user.displayName + " won!"}
          </h2>
        )}
        <div className="p-5 bg-black/[0.2] m-3 rounded">
          <h2 className="text-center text-xl text-white">Results</h2>
          {ranked.map((score) => {
            return (
              <p
                className="text-white text-lg m-2"
                key={score.user.socketId}
                id={score.user.socketId}
              >
                {score.user.socketId === user.socketId ? (
                  <>
                    <b>{score.user.displayName}</b> (You)
                  </>
                ) : (
                  score.user.displayName
                )}
                : <b className="text-pastelBlue-500">{score.score}</b>
              </p>
            );
          })}
        </div>

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
