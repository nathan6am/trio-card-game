import React from "react";

export default function MenuContainer({ children }) {
  return (
    <div className="flex flex-grow items-start justify-center">
      <div className="p-10 w-[400px] rounded-lg l mt-10 menu-card shadow-lg flex items-center justify-center">
        <div className="w-[90%] min-h-[300px]">{children}</div>
      </div>
    </div>
  );
}
