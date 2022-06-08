import React, { useState } from "react";
import CardSymbol, { GenerateFill } from "../../components/game/CardSymbol";
import MenuButton from "../../components/menu/MenuButton";
import {
  colorOptions,
  shapeOptions,
  fillOptions,
  getFill,
} from "../../util/cardOptions";
export default function CardSettings({ onSave, onCancel }) {
  const [colors, setColors] = useState(["red", "green", "blue"]);
  const [shapes, setShapes] = useState(["diamond", "squiggle", "oval"]);
  const [fills, setFills] = useState(["solid", "empty", "striped"]);

  const optionsValid =
    shapes.length === 3 && colors.length === 3 && fills.length === 3;

  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Customize Cards</h1>
      <div className="m-2 mb-5">
        <div className="flex flex-row items-center"></div>
        <label className="menu-label">
          <b>Colors</b> (Select 3)
        </label>
        <div className="grid gap-3 grid-cols-5 my-2">
          {colorOptions.map((option) => {
            return (
              <div
                onClick={() => {
                  if (colors.length === 3) {
                    setColors([option.key]);
                  } else {
                    setColors([...colors, option.key]);
                  }
                }}
                className={`rounded cursor-pointer ${
                  colors.includes(option.key)
                    ? "ring-4 ring-pastelBlue-500/[0.8]"
                    : null
                }`}
                key={option.key}
                id={option.key}
                style={{ width: 40, height: 40, backgroundColor: option.value }}
              ></div>
            );
          })}
        </div>

        <label className="menu-label">
          <b>Shapes</b> (Select 3)
        </label>
        <div className="grid grid-cols-4 gap-3 my-2">
          {shapeOptions.map((shape) => {
            return (
              <div
                id={shape}
                key={shape}
                onClick={() => {
                  if (shapes.length === 3) {
                    setShapes([shape]);
                  } else {
                    setShapes([...shapes, shape]);
                  }
                }}
                className={`w-[50px] h-[50px] bg-white/[0.4] flex items-center justify-center rounded cursor-pointer ${
                  shapes.includes(shape)
                    ? "ring-4 ring-pastelBlue-500/[0.8]"
                    : null
                }`}
              >
                <CardSymbol shape={shape} color="black" fill="empty" />
              </div>
            );
          })}
        </div>

        <label className="menu-label">
          <b>Fills</b> (Select 3)
        </label>

        <div className="grid gap-3 grid-cols-5 my-2">
          {fillOptions.map((fill) => {
            return (
              <div
                id={fill}
                key={fill}
                onClick={() => {
                  if (fills.length === 3) {
                    setFills([fill]);
                  } else {
                    setFills([...fills, fill]);
                  }
                }}
                className={`bg-white/[0.5] overflow-hidden mx-auto rounded cursor-pointer ${
                  fills.includes(fill)
                    ? "ring-4 ring-pastelBlue-500/[0.8]"
                    : null
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <defs>
                    <GenerateFill type={fill} color="black" />
                  </defs>
                  <rect width="100%" height="100%" fill={getFill(fill)} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row">
        <MenuButton onClick={onCancel} color={"danger"} size="sm">
          Cancel
        </MenuButton>
        <MenuButton
          disabled={!optionsValid}
          onClick={() => {
            onSave({ colors: colors, shapes: shapes, fills: fills });
          }}
          color={optionsValid ? "success" : "disabled"}
          size="sm"
        >
          Save Changes
        </MenuButton>
      </div>
    </div>
  );
}
