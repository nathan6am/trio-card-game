import React from "react";
import { useSelector, useDispatch } from "react-redux";

const rankResults = (scores) => {
  let ranked = scores.sort((a, b) => (a.score < b.score ? 1 : -1));
  return ranked;
};
export default function GameRecap() {
  const game = useSelector((state) => state.lobby.game);
  const ranked = rankResults(game.scores);
  return (
    <div>
      {ranked.map((score) => {
        return (
          <p key={score.user.socketId} id={score.user.socketId}>
            {`${score.user.displayName}: ${score.score}`}
          </p>
        );
      })}
    </div>
  );
}
