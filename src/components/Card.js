import React from "react";

import CardSymbol from "./CardSymbol";

export default function Card({ card, setActive, active }) {
  return (
    <div
      className={`flex aspect-[7/5] shadow-lg sm:p-1 m-2 sm:m-0 rounded-lg justify-center bg-neutral-50 hover:bg-neutral-200 ${
        active ? "ring-4 ring-pastelGreen-300 " : ""
      }`}
      id={card.id}
      onClick={() => setActive(card)}
    >
      <div className="flex items-center justify-center">
        {[...Array(card.count)].map((e, idx) => {
          return (
            <CardSymbol
              shape={card.shape}
              color={card.color}
              fill={card.fill}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
