import React from "react";
import "./styles.css";

const TextInput = () => {
  return (
    <div className="input-container">
      <div className="text-field-title">TextInput</div>
      <input
        type="input"
        onChange={() => null}
        placeholder=""
        className="text-input"
      />
    </div>
  );
};

export default TextInput;
