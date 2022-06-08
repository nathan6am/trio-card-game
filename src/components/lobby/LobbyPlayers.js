import React from "react";

import { PulseLoader, PuffLoader, BeatLoader } from "react-spinners";

export default function LobbyPlayers({ players, currentUser, maxPlayers }) {
  const emptySlots = maxPlayers - players.length;

  let otherPlayers = players.filter(
    (player) => player.socketId !== currentUser.socketId
  );

  return (
    <div className="flex flex-col justify-center">
      <Player
        displayName={currentUser.displayName}
        readyState={currentUser.ready}
        isCurrentUser={true}
      />
      {otherPlayers.map((player, idx) => {
        return (
          <Player
            displayName={player.displayName}
            readyState={player.ready}
            id={idx + 1}
            key={idx}
          />
        );
      })}
      <PlayerPlaceHolders emptySlots={emptySlots} />
    </div>
  );
}

const PlayerPlaceHolders = ({ emptySlots }) => {
  return [...Array(emptySlots)].map((val, idx) => (
    <Placeholder id={idx + 1} key={idx} />
  ));
};

const Placeholder = () => {
  return (
    <div
      style={{ fontFamily: "futura-pt, sans-serif", fontWeight: 400 }}
      className={`m-2 font-sans shadow-lg  text-lg text-white text-center rounded-md text-md bg-gray-300 py-2 px-5 flex flex-row justify-between`}
    >
      <p>Waiting for player</p>
      <PulseLoader color="#ffffff" size="5" />
    </div>
  );
};

const Player = ({ displayName, readyState, isCurrentUser }) => {
  const getReadyStyles = (ready) =>
    ready ? "bg-pastelGreen-300" : "bg-pastelRed-200";

  return (
    <div
      style={{ fontFamily: "futura-pt, sans-serif", fontWeight: 400 }}
      className={`m-2  items-center font-sans shadow-lg text-lg text-white text-center rounded-md text-md ${getReadyStyles(
        readyState
      )} py-2 px-5 flex flex-row justify-between`}
    >
      <p className="font-bold">
        {displayName}
        {isCurrentUser ? <span className="font-normal"> (You)</span> : null}
      </p>
      {readyState ? (
        <div className="flex flex-row items-center">
          <p className="text-sm mr-1 ">Ready</p>
          <PuffLoader color="#00d174" size="25" />
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <p className="text-sm mr-1 ">Not Ready</p>
          <BeatLoader color="#ff3d30" size="4px" />
        </div>
      )}
    </div>
  );
};
