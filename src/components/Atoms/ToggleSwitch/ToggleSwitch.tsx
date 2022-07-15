import React, { useRef } from "react";

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  setChecked,
}) => {
  const toggleRef = useRef();
  return (
    <div className="switch">
      <span>
        <input
          type="checkbox"
          id="toggleInput"
          ref={toggleRef.current}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          className="slider"
          type="button"
          onClick={() => setChecked(!checked)}
        ></button>
      </span>
    </div>
  );
};

export default ToggleSwitch;
