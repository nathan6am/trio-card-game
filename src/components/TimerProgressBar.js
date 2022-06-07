import { useState, useEffect } from "react";

export default function TimerProgressBar({ width, percent }) {
  const [value, setValue] = useState(100);

  useEffect(() => {
    setValue(percent * 100);
  });

  return (
    <div>
      <div className="progress-div" style={{ width: "100%" }}>
        <div style={{ width: `${value}%` }} className="progress" />
      </div>
    </div>
  );
}
