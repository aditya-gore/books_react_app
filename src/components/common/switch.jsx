import React from "react";
import "./switch.css";

const Switch = ({ isToggled, onToggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider rounded" />
    </label>
  );
};

export default Switch;
