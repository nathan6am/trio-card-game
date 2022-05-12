import React from "react";
import useSound from "use-sound";
import rolloverClick from "../sounds/RolloverClick.mp3";
import select from "../sounds/Select.mp3";

const buttonConfig = {
  primary: `bg-pastelBlue-300 hover:bg-pastelBlue-200 border-pastelBlue-500 hover:border-pastelBlue-400`,
  secondary:
    "bg-gray-500 hover:bg-gray-400 border-gray-700 hover:border-gray-500",
  success:
    "bg-pastelGreen-400 hover:bg-pastelGreen-300 border-pastelGreen-600 hover:border-pastelGreen-500",
  danger:
    "bg-pastelRed-300 hover:bg-pastelRed-200 border-pastelRed-500 hover:border-pastelRed-400",

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
      style={{ fontFamily: "futura-pt, sans-serif", fontWeight: 400 }}
      className={`m-2 font-sans shadow-2xl border-b-4  text-lg text-white text-center rounded-md text-md ${buttonConfig[color]} ${buttonConfig.sizes[size]}`}
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