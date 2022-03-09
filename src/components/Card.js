import React from "react";

import CardSymbol from "./CardSymbol";

export default function Card({ card }) {
  return (
    <div className="flex aspect-[7/5] shadow-lg sm:p-1 rounded-lg justify-center bg-neutral-50">
      <div className="flex items-center justify-center">
        {[...Array(card.count)].map((e, idx) => {
          return (
            <CardSymbol
              shape={card.shape}
              color={card.color}
              fill={card.fill}
            />
          );
        })}
      </div>
    </div>
  );
}
