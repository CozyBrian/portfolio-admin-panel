import { useState } from "react";
import "./styles.css";

interface Props {
  name: string;
  placeholder: string;
}

const TextInput = ({ name, placeholder }: Props) => {
  const [value, setValue] = useState("");
  return (
    <div className="input-container">
      <div className="text-field-title">{name}</div>
      <input
        type="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="text-input"
      />
    </div>
  );
};

export default TextInput;
