import React, { useState } from "react";
import CardGrid from "../components/CardGrid";

const Menu = () => {
  const defaultSettings = {
    timeLimit: null,
    deckOptions: {
      colors: ["pink", "blue", "green"],
      shapes: ["diamond", "squiggle", "oval"],
      fills: ["empty", "solid", "striped"],
    },
    gameMode: "standard",
  };
  const [settings, setSettings] = useState(defaultSettings);
  
  return (
    <>
      <button></button>
    </>
  );
};

function SinglePlayer() {
  const [activeCards, setActiveCards] = useState([])

  const setActive = (id) => {
    console.log(id)
    setActiveCards([...activeCards, id])
  }
  return <CardGrid activeCards={activeCards} setActive={setActive}/>;
}

export default SinglePlayer;
