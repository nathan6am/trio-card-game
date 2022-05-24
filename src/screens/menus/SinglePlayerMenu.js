import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaInfoCircle, FaPlay, FaGlobe } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";
import Select from "react-select";
import Switch from "react-switch";
import CardOptionsModal from "../../components/CardOptionsModal";
import {
  createSinglePlayerGame,
  startSinglePlayerGame,
} from "../../redux/actionCreators";
export default function SinglePlayerMenu() {
  const dispatch = useDispatch();
  const [cardOptionsOpen, setCardOptionsOpen] = useState(false);
  const modeOptions = [
    { value: "standard", label: "Standard" },
    { value: "zen", label: "Zen" },
    { value: "timed", label: "Timed" },
  ];
  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
    { value: "impossible", label: "Impossible" },
  ];
  const [gameMode, setGameMode] = useState("standard");
  const [difficulty, setDifficulty] = useState("easy");
  const [hintsEnabled, setHintsEnabled] = useState(false);

  const getGameOptions = () => {
    return {
      gameMode: gameMode,
      timeLimit: null,
      hintsEnabled: hintsEnabled,
    };
  };
  return (
    <div>
      <CardOptionsModal
        isOpen={cardOptionsOpen}
        toggle={() => {
          setCardOptionsOpen(!cardOptionsOpen);
        }}
      />
      <div className="flex flex-col">
        <h1 className="text-center text-pastelRed-300 text-2xl mb-3 menu-title">
          Play Solo
        </h1>
        <div className="m-2 mb-5">
          <div className="flex flex-row items-center">
            <h3 className="mb-1 text-pastelRed-300 mr-2">Game Mode</h3>
            <a
              className="text-pastelRed-300 hover:text-pastelRed-200 cursor-pointer"
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
        {gameMode === "timeAttack" ? (
          <div className="m-2 mb-5">
            <h3 className="mb-1 text-pastelRed-300">Difficulty</h3>

            <Select
              options={difficultyOptions}
              defaultValue={difficultyOptions[0]}
              value={difficultyOptions.find(
                (option) => option.value === difficulty
              )}
              onChange={(option) => {
                setDifficulty(option.value);
              }}
            />
          </div>
        ) : null}
        <div className="flex flex-row justify-between m-2 mb-5">
          <h3 className="mb-1 text-pastelRed-300">Allow Hints</h3>

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
            dispatch(createSinglePlayerGame(getGameOptions()));
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
          <MdExitToApp className="inline text-xl mb-1 mr-2" flipHorizontal />
          Back
        </MenuButton>
      </div>
    </div>
  );
}
