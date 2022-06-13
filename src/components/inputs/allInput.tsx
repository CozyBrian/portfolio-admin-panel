import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";

interface Props {
  obj: any;
}

const Inputs = ({ obj }: Props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>("");
  const [link, setLink] = useState("");
  const [disc, setDisc] = useState("");
  const [selected, setSelected] = useState(obj.type);

  const placeholder = "t";

  useEffect(() => {
    setTitle(obj.title);
    setDisc(obj.disc);
    setSelected(obj.type);
    //setImage(obj.image);
    setLink(obj.link);
  }, [obj]);
  return (
    <div>
      <div className="input-container">
        <div className="text-field-title">Title</div>
        <input
          type="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholder}
          className="text-input"
        />
      </div>
      <div className="input-container">
        <div className="text-field-title">Description</div>
        <input
          type="input"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
          placeholder={placeholder}
          className="text-input"
        />
      </div>
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
      <div className="input-container">
        <div className="text-field-title">Image</div>
        <div
          className={
            selected === "mobile" ? "image-container" : "image-container w"
          }
        >
          <div className="image">
            <img src={image} alt="" />
          </div>
          <button className="button">
            <AiOutlinePlus />
            Add Image
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          value={image}
          onChange={(e) => {
            if (!e.target.files) return;
            setImage(e.target.files[0]);
          }}
          placeholder="Image link"
          className="text-input"
        />
      </div>
      <div className="input-container">
        <div className="text-field-title">Link</div>
        <input
          type="input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
          className="text-input"
        />
      </div>
    </div>
  );
};

export default Inputs;
