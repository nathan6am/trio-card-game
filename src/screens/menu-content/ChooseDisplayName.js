import React, { useState, useRef } from "react";

//Components
import MenuButton from "../../components/menu/MenuButton";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { changeMenu, changeDisplayName } from "../../redux/actionCreators";

//Util
import isTextClean from "../../util/profanityFilter";

export default function ChooseDisplayName() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const handleChange = (e) => {
    if (!isNameValid) setIsNameValid(true);
    const { value, maxLength } = e.target;
    const text = value.slice(0, maxLength);
    setDisplayName(text);
  };

  const onSubmit = () => {
    setLoading(true);
    isTextClean(displayName)
      .then((isBad) => {
        if (isBad) {
          setIsNameValid(false);
          setDisplayName("");
          inputRef.current.focus();
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(changeDisplayName(displayName));
          dispatch(changeMenu("home"));
        }
      })
      .catch((e) => console.error(e.message));
  };

  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Welcome</h1>
      <div className="m-2">
        <label className="menu-label">Choose a display name:</label>
        <input
          autoFocus
          ref={inputRef}
          maxLength={16}
          autoCapitalize="on"
          autoComplete="off"
          className="menu-text-input"
          type="text"
          name="name"
          placeholder="Display name"
          onChange={handleChange}
          value={displayName}
        />
        {!isNameValid ? (
          <p className="text-red-700">
            You didn't think we'd let you use that name, did you?
          </p>
        ) : null}
      </div>
      <MenuButton
        loading={loading}
        color={displayName ? "success" : "disabled"}
        size="md"
        disabled={!displayName}
        onClick={onSubmit}
      >
        Continue
      </MenuButton>
    </div>
  );
}
