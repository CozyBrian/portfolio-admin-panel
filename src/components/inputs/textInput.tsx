import React from "react";
import "./styles.css";

interface Props {
  title: string;
}

const TextInput = ({ title }: Props) => {
  return (
    <div className="input-container">
      <div className="text-field-title">{title}</div>
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
