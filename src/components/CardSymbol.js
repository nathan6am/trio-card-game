import React from "react";

const paths = {
  hourglass: "M 0 0 L 50 0 L 25 50 L 50 100 L 0 100 L 25 50 Z",

  triangle: "M 25 0 L 50 100 L 0 100 Z",

  rectangle: "M 50 0 L 50 100 L 0 100 L 0 0 Z",

  diamond: "M25 0 L50 50 L25 100 L0 50 Z",

  squiggle:
    "M38.4,63.4c0,16.1,11,19.9,10.6,28.3c-0.5,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",

  oval: "M25,99.5C14.2,99.5,5.5,90.8,5.5,80V20C5.5,9.2,14.2,0.5,25,0.5S44.5,9.2,44.5,20v60 C44.5,90.8,35.8,99.5,25,99.5z",
};

const colorCodes = {
  red: "#FF0000",
  pink: "#FFC0CB",
  green: "#27ae60",
  blue: "#0000FF",
  purple: "#800080",
};

const GenerateFill = ({ type, color }) => {
  switch (type) {
    case "solid":
      return null;

    case "empty":
      return null;

    case "striped":
      return (
        <pattern
          id={`${type}_${color}`}
          patternUnits="userSpaceOnUse"
          width="5"
          height="5"
          style={{ stroke: colorCodes[color], strokeWidth: 2 }}
        >
          <path d="M 0,5 H5" />
        </pattern>
      );

    case "diagonalStriped":
      return (
        <pattern
          id={`${type}_${color}`}
          width="5"
          height="5"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            style={{ stroke: colorCodes[color], strokeWidth: 2 }}
          />
        </pattern>
      );

    case "checkered":
      return (
        <pattern
          id={`${type}_${color}`}
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            width="10"
            height="10"
            y="0"
            fill={colorCodes[color]}
          ></rect>
          <rect
            x="10"
            width="10"
            height="10"
            y="10"
            fill={colorCodes[color]}
          ></rect>
        </pattern>
      );

    default:
      return "none";
  }
};

export default function CardSymbol({ shape, fill, color }) {
  const getFill = (type) => {
    switch (type) {
      case "solid":
        return colorCodes[color];

      case "empty":
        return "none";

      default:
        return `url(#${fill}_${color})`;
    }
  };
  return (
    <svg viewBox="-5 -5 59 109" height="75%">
      <path
        stroke={colorCodes[color]}
        strokeWidth={2}
        d={paths[shape]}
        fill={getFill(fill)}
      ></path>
      <GenerateFill type={fill} color={color} />
    </svg>
  );
}
