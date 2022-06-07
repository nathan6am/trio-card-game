import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import { FaEdit, FaInfoCircle, FaPlay } from "react-icons/fa";
import IncrementSelector from "../../components/IncrementSelector";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../../redux/actionCreators";
import Select from "react-select";
import Switch from "react-switch";
import CardOptionsModal from "../../components/CardOptionsModal";
import { useWebsocket } from "../../socket";
import { joinLobby } from "../../redux/actionCreators";
export default function CreateLobbyMenu() {
  const dispatch = useDispatch();
  const [cardOptionsOpen, setCardOptionsOpen] = useState(false);
  const modeOptions = [
    { value: "standard", label: "Standard" },
    { value: "timed", label: "Timed" },
  ];

  const user = useSelector((state) => state.user);
  const [gameMode, setGameMode] = useState("standard");
  const [timeLimitIndex, setTimeLimitIndex] = useState(2);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const socket = useWebsocket();
  const timeLimitOptions = [
    { value: 60, label: "1 minute" },
    { value: 180, label: "3 minutes" },
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
  ];
  const getGameOptions = () => {
    return {
      gameMode: gameMode,
      timeLimit: timeLimitOptions[timeLimitIndex].value,
    };
  };
  const onIncrement = () => {
    if (timeLimitIndex === 4) return;
    setTimeLimitIndex(timeLimitIndex + 1);
  };
  const onDecrement = () => {
    if (timeLimitIndex === 0) return;
    setTimeLimitIndex(timeLimitIndex - 1);
  };
  const createLobby = () => {
    socket.emit(
      "lobby:create",
      {
        user: user,
        options: {
          gameOptions: {
            mode: gameMode,
            maxPlayers: maxPlayers,
            timeLimit: timeLimitOptions[timeLimitIndex].value,
          },
        },
      },
      function (lobby) {
        if (!lobby) {
          console.error("Unable to create lobby");
        } else {
          console.log(lobby);
          dispatch(joinLobby(lobby, user));
        }
      }
    );
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

        <div className="m-3">
          <h3 className="menu-label">Max Players</h3>
          <IncrementSelector
            value={`${maxPlayers} Players`}
            onIncrement={() => {
              if (maxPlayers < 6) {
                setMaxPlayers(maxPlayers + 1);
              }
            }}
            onDecrement={() => {
              if (maxPlayers > 2) {
                setMaxPlayers(maxPlayers - 1);
              }
            }}
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
        <MenuButton color="success" size="md" onClick={createLobby}>
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
