import React from "react";
import Card from "./Card";

const testCards = [
  {
    count: 1,
    shape: "squiggle",
    color: "green",
    fill: "empty",
    id: "1emptygreensquiggle",
  },
  {
    count: 1,
    shape: "diamond",
    color: "green",
    fill: "empty",
    id: "1emptygreendiamond",
  },
  {
    count: 3,
    shape: "hourglass",
    color: "purple",
    fill: "diagonalStriped",
    id: "3diagonalStripedpurplehourglass",
  },
  {
    count: 3,
    shape: "squiggle",
    color: "purple",
    fill: "diagonalStriped",
    id: "3diagonalStripedpurplesquiggle",
  },
  {
    count: 2,
    shape: "squiggle",
    color: "pink",
    fill: "empty",
    id: "2emptypinksquiggle",
  },
  {
    count: 1,
    shape: "diamond",
    color: "purple",
    fill: "solid",
    id: "1solidpurplediamond",
  },
  {
    count: 2,
    shape: "hourglass",
    color: "green",
    fill: "empty",
    id: "2emptygreenhourglass",
  },
  {
    count: 3,
    shape: "diamond",
    color: "green",
    fill: "diagonalStriped",
    id: "3diagonalStripedgreendiamond",
  },
  {
    count: 2,
    shape: "squiggle",
    color: "pink",
    fill: "solid",
    id: "2solidpinksquiggle",
  },
  {
    count: 3,
    shape: "hourglass",
    color: "pink",
    fill: "empty",
    id: "3emptypinkhourglass",
  },
  {
    count: 1,
    shape: "diamond",
    color: "pink",
    fill: "empty",
    id: "1emptypinkdiamond",
  },
  {
    count: 1,
    shape: "diamond",
    color: "pink",
    fill: "solid",
    id: "1solidpinkdiamond",
  },
];

export default function CardGrid({activeCards, setActive}) {
  let cards = testCards;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-5 lg:gap-6 overflow-hidden p-5">
      {cards.map((card, idx) => {
        return <Card card={card} key={card.id} active={activeCards.includes(card.id)} setActive={setActive}/>;
      })}
    </div>
  );
}
