import React from "react";
import useSound from "use-sound";
import rolloverClick from "../sounds/RolloverClick.mp3";
import select from "../sounds/Select.mp3";

const buttonConfig = {
  primary:
    "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500",
  secondary:
    "bg-gray-500 hover:bg-gray-400 border-gray-700 hover:border-gray-500",
  success:
    "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500",
  danger: "bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500",

  sizes: {
    sm: "py-1 px-4",
    md: "py-2 px-5",
    lg: "py-4 px-5",
  },
};

const MenuButton = ({ children, color, onClick, size }) => {
  const [playRolloverClick] = useSound(rolloverClick);
  const [playSelect] = useSound(select);
  return (
    <button
      className={`m-2 font-sans shadow-2xl border-b-4  text-white text-center rounded-md text-md ${buttonConfig[color]} ${buttonConfig.sizes[size]}`}
      onClick={() => {
        playSelect();
        onClick();
      }}
      onMouseEnter={playRolloverClick}
    >
      {children}
    </button>
  );
};

export default MenuButton;
