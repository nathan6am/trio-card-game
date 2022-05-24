import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaInfoCircle, FaPlay, FaGlobe } from "react-icons/fa";
import { MdPerson, MdPeopleAlt, MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";
import Select from "react-select";
import Switch from "react-switch";
import CardOptionsModal from "../../components/CardOptionsModal";

export default function CreateLobbyMenu() {
  const dispatch = useDispatch();
  const [cardOptionsOpen, setCardOptionsOpen] = useState(false);
  const modeOptions = [
    { value: "standard", label: "Standard" },
    { value: "timed", label: "Timed" },
  ];

  const [gameMode, setGameMode] = useState("standard");
  const [timeLimitIndex, setTimeLimitIndex] = useState(0);
  const [tiebreakEnabled, setTiebreakEnabled] = useState(false);
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);

  const timeLimitOptions = [{ value: 0, label: "unlimited" }];
  const getGameOptions = () => {
    return {
      gameMode: gameMode,
      timeLimit: timeLimitEnabled,
      tiebreakEnabled: tiebreakEnabled,
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
        <h1 className="menu-header menu-title">New Lobby</h1>
        <div className="m-2 mb-5">
          <div className="flex flex-row items-center">
            <h3 className="menu-label mr-2">Game Mode</h3>
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
        <div className="input-row">
          <h3 className="menu-label">Enable Tiebreaker</h3>

          <Switch
            onChange={() => {
              setTiebreakEnabled(!tiebreakEnabled);
            }}
            checked={tiebreakEnabled}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor={"#c1c1c1"}
            onColor={"#4cf0a9"}
          />
        </div>
        <div className="">
          <h3 className="menu-label">Time Limit</h3>

          <Switch
            onChange={() => {
              setTimeLimitEnabled(!timeLimitEnabled);
            }}
            checked={timeLimitEnabled}
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
        <MenuButton color="success" size="md" onClick={() => {}}>
          <FaPlay className="button-icon" />
          Create Lobby
        </MenuButton>
        <MenuButton
          color="danger"
          size="md"
          onClick={() => {
            dispatch(changeMenu("playPartyMode"));
          }}
        >
          <MdExitToApp className="button-icon mr-2" flipHorizontal />
          Back
        </MenuButton>
      </div>
    </div>
  );
}
