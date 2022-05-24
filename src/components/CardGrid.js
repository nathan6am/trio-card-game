import React from "react";
import Card from "./Card";

export default function CardGrid({ activeCards, setActive, cards }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-5 md:gap-5 lg:gap-6 overflow-hidden p-5">
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
  );
}
