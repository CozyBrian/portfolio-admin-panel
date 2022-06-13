import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";

const ImageCard = ({ url }: any) => {
  return (
    <div className="image-container">
      <div className="image">
        <img src={url} alt="" />
      </div>
      <button className="button">
        <AiOutlinePlus />
        Add Image
      </button>
    </div>
  );
};

interface Props {
  value: string;
}

const ImageInput = ({ value }: Props) => {
  return (
    <div className="input-container">
      <div className="text-field-title">Image</div>
      <ImageCard url={value} />
      <input
        type="input"
        onChange={() => null}
        placeholder={value}
        className="text-input"
      />
    </div>
  );
};

export default ImageInput;
