import React, { useState } from "react";

//Components
import MenuButton from "../../components/menu/MenuButton";
import { MdSave, MdCancel, MdVolumeUp, MdVolumeMute } from "react-icons/md";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { changeMenu, updateSettings } from "../../redux/actionCreators";

export default function Settings() {
  const dispatch = useDispatch();
  const currentSettings = useSelector((state) => state.settings);
  const [volume, setVolume] = useState(currentSettings.volume * 100);
  const [mute, setMute] = useState(currentSettings.mute);
  const [theme, setTheme] = useState(currentSettings.theme);
  const themeOptions = ["blue-bg", "dark-bg", "offwhite-bg", "dark-solid-bg"];
  const onSave = () => {
    dispatch(updateSettings({ volume, mute, theme }));
    dispatch(changeMenu("home"));
  };
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Settings</h1>
      <div className="flex flex-col">
        <div className="m-2">
          <label className="menu-label">Volume</label>
          <div className="flex flex-row items-center ">
            <input
              type="range"
              className="bg-Pastelblue-500 w-full mr-2"
              disabled={mute}
              max={100}
              min={0}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            {mute ? (
              <a
                onClick={() => {
                  setMute(false);
                }}
              >
                <MdVolumeMute className="text-pastelBlue-500 text-2xl cursor-pointer" />
              </a>
            ) : (
              <a
                onClick={() => {
                  setMute(true);
                }}
              >
                <MdVolumeUp className="text-pastelBlue-500 text-2xl cursor-pointer" />
              </a>
            )}
          </div>
          <label className="menu-label">Theme</label>
          <div className="flex flex-row p-3 bg-black/[0.3] rounded my-2">
            {themeOptions.map((option, idx) => {
              return (
                <div
                  onClick={() => {
                    setTheme(option);
                  }}
                  id={option}
                  key={idx}
                  className={`${option} h-10 w-10 m-2 rounded ${
                    theme == option ? "ring-4 ring-pastelBlue-500/[0.8] " : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <MenuButton color="success" size="md" onClick={onSave}>
        <MdSave className="button-icon mr-2" />
        Save
      </MenuButton>

      <MenuButton
        color="danger"
        size="md"
        onClick={() => {
          dispatch(changeMenu("home"));
        }}
      >
        <MdCancel className="button-icon mr-2" />
        Cancel
      </MenuButton>
    </div>
  );
}
