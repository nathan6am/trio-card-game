import React, { useState } from "react";
import CardSymbol, { GenerateFill } from "../../components/CardSymbol";
import MenuButton from "../../components/MenuButton";
export default function CardSettings({ onSave, onCancel }) {
  const [colors, setColors] = useState(["red", "green", "blue"]);
  const [shapes, setShapes] = useState(["diamond", "squiggle", "oval"]);
  const [fills, setFills] = useState(["solid", "empty", "striped"]);
  const colorOptions = [
    { key: "red", value: "#FF0000" },
    { key: "green", value: "#27ae60" },
    { key: "blue", value: "#0000FF" },
    { key: "pink", value: "#FFC0CB" },
    { key: "purple", value: "#800080" },
    { key: "orange", value: "#f38701" },
    { key: "yellow", value: "#FDDA0D" },
    { key: "black", value: "#000000" },
  ];

  const shapeOptions = [
    "diamond",
    "squiggle",
    "oval",
    "hourglass",
    "triangle",
    "rectangle",
  ];
  const fillOptions = [
    "solid",
    "empty",
    "striped",
    "diagonalStriped",
    "checkered",
    "dots",
  ];
  const getFill = (type) => {
    switch (type) {
      case "solid":
        return "#000000";

      case "empty":
        return "none";

      default:
        return `url(#${type}_black)`;
    }
  };
  const optionsValid =
    shapes.length === 3 && colors.length === 3 && fills.length === 3;
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">Customize Cards</h1>
      <div className="m-2 mb-5">
        <div className="flex flex-row items-center"></div>
        <label className="menu-label">Colors (Select 3)</label>
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
                  colors.includes(option.key) ? "ring-4 ring-white/[0.7]" : null
                }`}
                key={option.key}
                id={option.key}
                style={{ width: 40, height: 40, backgroundColor: option.value }}
              ></div>
            );
          })}
        </div>

        <label className="menu-label">Shapes (Select 3)</label>
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
                  shapes.includes(shape) ? "ring-4 ring-white/[0.8]" : null
                }`}
              >
                <CardSymbol shape={shape} color="black" fill="empty" />
              </div>
            );
          })}
        </div>

        <label className="menu-label">Fills (Select 3)</label>

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
                  fills.includes(fill) ? "ring-4 ring-white/[0.8]" : null
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
