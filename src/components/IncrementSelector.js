import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
export default function IncrementSelector({ value, onIncrement, onDecrement }) {
  return (
    <div className="flex flex-row w-full rounded-md overflow-hidden mt-2 mb-5 text-white bg-white">
      <div
        onClick={onDecrement}
        className="flex items-center justify-center p-3 bg-pastelRed-300 hover:bg-pastelRed-200 text-xl"
      >
        <FaMinus className="inline" />
      </div>
      <div className="flex-grow flex items-center justify-center text-center text-gray-700">
        {value}
      </div>
      <div
        onClick={onIncrement}
        className="flex items-center justify-center bg-pastelGreen-300 hover:bg-pastelGreen-200 text-xl p-3"
      >
        <FaPlus className="inline" />
      </div>
    </div>
  );
}
