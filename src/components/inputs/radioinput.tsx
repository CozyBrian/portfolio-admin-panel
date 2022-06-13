import React, { useState } from "react";

const RadioInput = () => {
  const [selected, setSelected] = useState("web");

  return (
    <div className="input-container">
      <div className="text-field-title">Title</div>
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
