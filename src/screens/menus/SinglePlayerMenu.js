import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaInfoCircle, FaPlay, FaGlobe } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import IncrementSelector from "../../components/IncrementSelector";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";
import Select from "react-select";
import Switch from "react-switch";
import CardSettings from "./CardSettings";
import {
  createSinglePlayerGame,
  startSinglePlayerGame,
} from "../../redux/actionCreators";
export default function SinglePlayerMenu() {
  const dispatch = useDispatch();
  const [cardOptionsOpen, setCardOptionsOpen] = useState(false);
  const [cardOptions, setCardOptions] = useState({});
  const onSave = (options) => {
    setCardOptions(options);
    setCardOptionsOpen(false);
  };
  const modeOptions = [
    { value: "standard", label: "Standard" },
    { value: "zen", label: "Zen" },
    { value: "timed", label: "Timed" },
  ];
  const [gameMode, setGameMode] = useState("standard");
  const [timeLimitIndex, setTimeLimitIndex] = useState(2);
  const timeLimitOptions = [
    { value: 60, label: "1 minute" },
    { value: 180, label: "3 minutes" },
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
  ];
  const onIncrement = () => {
    if (timeLimitIndex === 4) return;
    setTimeLimitIndex(timeLimitIndex + 1);
  };
  const onDecrement = () => {
    if (timeLimitIndex === 0) return;
    setTimeLimitIndex(timeLimitIndex - 1);
  };
  const [hintsEnabled, setHintsEnabled] = useState(false);

  const getGameOptions = () => {
    return {
      gameMode: gameMode,
      timeLimit: gameMode === "timed" && timeLimitOptions[timeLimitIndex].value,
      hintsEnabled: hintsEnabled,
    };
  };
  return (
    <>
      {cardOptionsOpen ? (
        <CardSettings onSave={onSave} onCancel={setCardOptionsOpen} />
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="menu-header menu-title">Play Solo</h1>
            <div className="m-2 mb-5">
              <div className="flex flex-row items-center">
                <h3 className="menu-label mr-2">Game Mode</h3>
                <a
                  className="text-pastelBlue-500 hover:text-pastelBlue-300 cursor-pointer"
                  onClick={() => {
                    console.log("show info");
                  }}
                >
                  <FaInfoCircle className="mb-[2px]" />
                </a>
              </div>

              <Select
                options={modeOptions}
                defaultValue={modeOptions[0]}
                value={modeOptions.find((option) => option.value === gameMode)}
                onChange={(option) => {
                  setGameMode(option.value);
                }}
              />
            </div>
            {gameMode === "timed" && (
              <div className="m-2">
                <h3 className="menu-label">Time Limit</h3>
                <IncrementSelector
                  value={timeLimitOptions[timeLimitIndex].label}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                />
              </div>
            )}
            <div className="flex flex-row justify-between m-2 mb-5">
              <h3 className="menu-label">Allow Hints</h3>

              <Switch
                onChange={() => {
                  setHintsEnabled(!hintsEnabled);
                }}
                checked={hintsEnabled}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor={"#c1c1c1"}
                onColor={"#4cf0a9"}
              />
            </div>
            <div className="m-2 mb-5">
              <a
                className="text-pastelRed-300 hover:text-pastelRed-200 cursor-pointer flex flex-row items-center"
                onClick={() => {
                  setCardOptionsOpen(true);
                }}
              >
                <span className="text-2xl">
                  <FaEdit className="mr-2" />
                </span>
                Customize Cards
              </a>
            </div>
            <MenuButton
              color="success"
              size="md"
              onClick={() => {
                dispatch(createSinglePlayerGame(getGameOptions(), cardOptions));
                dispatch(startSinglePlayerGame());
              }}
            >
              <FaPlay className="inline text-xl  mr-2" />
              Start Game
            </MenuButton>
            <MenuButton
              color="danger"
              size="md"
              onClick={() => {
                dispatch(changeMenu("play"));
              }}
            >
              <MdExitToApp
                className="inline text-xl mb-1 mr-2"
                flipHorizontal
              />
              Back
            </MenuButton>
          </div>
        </div>
      )}
    </>
  );
}
