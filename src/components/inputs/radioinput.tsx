import React, { useState, useEffect } from "react";

interface Props {
  value: string;
}

const RadioInput = ({ value }: Props) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="input-container">
      <div className="text-field-title">Type</div>
      <div className="radio-field">
        <div
          className={selected === "web" ? "radio w active" : "radio w"}
          onClick={() => setSelected("web")}
        >
          Web
        </div>
        <div
          className={selected === "mobile" ? "radio m active" : "radio m"}
          onClick={() => setSelected("mobile")}
        >
          Mobile
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
