import React from "react";
import useSound from "use-sound";
import rolloverClick from "../../sounds/RolloverClick.mp3";
import select from "../../sounds/Select.mp3";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
const buttonConfig = {
  primary: `bg-pastelBlue-400 hover:bg-pastelBlue-300 border-pastelBlue-500 hover:border-pastelBlue-400`,
  secondary:
    "bg-gray-500 hover:bg-gray-400 border-gray-700 hover:border-gray-500",
  success:
    "bg-pastelGreen-500 hover:bg-pastelGreen-400 border-pastelGreen-600 hover:border-pastelGreen-500",
  danger:
    "bg-pastelRed-300 hover:bg-pastelRed-200 border-pastelRed-500 hover:border-pastelRed-400",
  disabled: "bg-gray-400 border-gray-600",

  sizes: {
    sm: "py-1 px-4",
    md: "py-2 px-5",
    lg: "py-4 px-5",
  },
};

const MenuButton = ({ children, color, onClick, size, disabled, loading }) => {
  const { volume, mute } = useSelector((state) => state.settings);
  const [playRolloverClick] = useSound(rolloverClick, {
    volume: mute ? 0 : volume,
  });
  const [playSelect] = useSound(select, { volume: mute ? 0 : volume });
  return (
    <button
      disabled={disabled}
      style={{ fontFamily: "futura-pt, sans-serif", fontWeight: 400 }}
      className={`m-2 font-sans shadow-lg border-b-4 text-lg text-white text-center rounded-md text-md ${buttonConfig[color]} ${buttonConfig.sizes[size]}`}
      onClick={() => {
        playSelect();
        onClick();
      }}
      onMouseEnter={() => {
        if (!disabled) {
          playRolloverClick();
        }
      }}
    >
      {loading ? (
        <div className="flex flex-1 items-center justify-center my-1">
          <ClipLoader color={"#ffffff"} loading={loading} size={20} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default MenuButton;
