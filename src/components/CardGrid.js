import React from "react";
import Card from "./Card";
import TimerProgressBar from "./TimerProgressBar";
export default function CardGrid({
  activeCards,
  setActive,
  cards,
  timeLimit,
  percentTimeRemaining,
}) {
  return (
    <div className="flex flex-col mt-5">
      <div className="px-5">
        {timeLimit && <TimerProgressBar percent={percentTimeRemaining} />}
      </div>
      <div className="grid grid-cols-3 p-2 overflow-hidden sm:grid-cols-4 md:gap-5 sm:p-5 md:max-w-[80vw] lg:gap-6">
        {cards.map((card, idx) => {
          return (
            <Card
              card={card}
              key={card.id}
              active={activeCards.includes(card)}
              setActive={setActive}
            />
          );
        })}
      </div>
    </div>
  );
}
