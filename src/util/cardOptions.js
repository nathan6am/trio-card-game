export const colorOptions = [
  { key: "red", value: "#FF0000" },
  { key: "green", value: "#27ae60" },
  { key: "blue", value: "#0000FF" },
  { key: "pink", value: "#FFC0CB" },
  { key: "purple", value: "#800080" },
  { key: "orange", value: "#f38701" },
  { key: "yellow", value: "#FDDA0D" },
  { key: "black", value: "#000000" },
];

export const shapeOptions = [
  "diamond",
  "squiggle",
  "oval",
  "hourglass",
  "triangle",
  "rectangle",
];
export const fillOptions = [
  "solid",
  "empty",
  "striped",
  "diagonalStriped",
  "checkered",
  "dots",
];
export const getFill = (type) => {
  switch (type) {
    case "solid":
      return "#000000";

    case "empty":
      return "none";

    default:
      return `url(#${type}_black)`;
  }
};
