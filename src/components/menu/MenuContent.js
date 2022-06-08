import React from "react";

export default function MenuContent({ title, children }) {
  return (
    <div className="flex flex-col">
      <h1 className="menu-header menu-title">{title}</h1>
      {children}
    </div>
  );
}
