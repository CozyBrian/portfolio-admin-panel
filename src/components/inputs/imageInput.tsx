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

const ImageInput = () => {
  return (
    <div className="input-container">
      <div className="text-field-title">Image</div>
      <ImageCard />
      <input
        type="input"
        onChange={() => null}
        placeholder=""
        className="text-input"
      />
    </div>
  );
};

export default ImageInput;
