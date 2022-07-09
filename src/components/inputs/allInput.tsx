import { useEffect } from "react";
import { useStateContext } from "../../context/stateContext";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";

interface Props {
  obj: any;
}

const Inputs = ({ obj }: Props) => {
  const state = useStateContext();

  if (!state) return null;
  const { uploadImage, imageUrl } = state;

  const { title, setTitle } = state;
  const { image, setImage } = state;
  const { link, setLink } = state;
  const { disc, setDisc } = state;
  const { selected, setSelected } = state;
  const { imgButtonClicked, setImgButtonClicked } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTitle(obj.title);
    setDisc(obj.disc);
    setSelected(obj.type);
    //setImage(obj.image);
    setLink(obj.link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  return (
    <div>
      <div className="input-container">
        <div className="text-field-title">Title</div>
        <input
          type="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-input"
        />
      </div>
      <div className="input-container">
        <div className="text-field-title">Description</div>
        <input
          type="input"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
          placeholder="Description"
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
            {imgButtonClicked ? (
              image.name && <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <img src={obj.image} alt="" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="image-file-input"
            onChange={(e) => {
              if (!e.target.files) return;
              setImage(e.target.files[0]);
            }}
            hidden
          />
          {!imgButtonClicked ? (
            <label
              className="button"
              onClick={() => {
                if (!imgButtonClicked) {
                  setTimeout(() => {
                    setImgButtonClicked(true);
                    return;
                  }, 300);
                }
              }}
              htmlFor="image-file-input"
            >
              <AiOutlinePlus />
              Add Image
            </label>
          ) : (
            <button className="button" onClick={() => uploadImage(image)}>
              Upload Image
            </button>
          )}
        </div>
        <input
          type="input"
          value={imageUrl}
          readOnly={true}
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
