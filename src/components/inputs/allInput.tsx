import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles.css";
import { uploadImage } from "../../services/database";
import toast from "react-hot-toast";
import { getDownloadURL } from "firebase/storage";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";

interface Props {
  obj: any;
}

const Inputs = ({ obj }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [fileImage, setFileImage] = useState<File>();
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [disc, setDisc] = useState("");
  const [type, setType] = useState<"web" | "mobile">("web");
  const [live, setLive] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsTemp, setTagsTemp] = useState("");
  const [imgButtonClicked, setImgButtonClicked] = useState(false);

  useEffect(() => {
    setTitle(obj.title);
    setDisc(obj.disc);
    setType(obj.type);
    setImage(obj.image);
    setLink(obj.link);
    setLive(obj.live);
    setTags(obj.tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  useEffect(() => {
    setTagsTemp(tags.join(", "));
  }, [tags]);

  useEffect(() => {
    dispatch(
      action.app.setProject({
        id: obj.id,
        title,
        image,
        link,
        disc,
        type,
        live,
        tags: tagsTemp.split(", "),
      })
    );
    setFileImage(undefined);
    setImgButtonClicked(false);
  }, [title, image, link, disc, type, live, tagsTemp, dispatch, obj]);

  const onUploadImage = (file: File) => {
    if (file)
      uploadImage(file)
        .then((imgRef) => {
          toast.success("Image Uploaded");
          return imgRef;
        })
        .then((imgRef) => {
          getDownloadURL(imgRef).then((url) => setImage(url));
        })
        .catch((e) => {
          toast.error("Ops there was a problem!");
          console.log(e.message);
        });
  };

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
            className={type === "web" ? "radio w active" : "radio w"}
            onClick={() => setType("web")}
          >
            Web
          </div>
          <div
            className={type === "mobile" ? "radio m active" : "radio m"}
            onClick={() => setType("mobile")}
          >
            Mobile
          </div>
        </div>
      </div>
      <div className="input-container">
        <div className="text-field-title">Image</div>
        <div
          className={
            type === "mobile" ? "image-container" : "image-container w"
          }
        >
          <div className="image">
            {imgButtonClicked ? (
              fileImage?.name && (
                <img src={URL.createObjectURL(fileImage)} alt="" />
              )
            ) : (
              <img style={{ objectFit: "contain" }} src={obj.image} alt="" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="image-file-input"
            onChange={(e) => {
              if (!e.target.files) return;
              setFileImage(e.target.files[0]);
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
            <button
              className="button"
              onClick={() => onUploadImage(fileImage!)}
            >
              Upload Image
            </button>
          )}
        </div>
        <input
          type="input"
          value={image}
          readOnly={true}
          placeholder="Image link"
          className="text-input"
        />
      </div>
      <div className="input-container">
        <div className="text-field-title">Tags</div>
        <input
          type="input"
          value={tagsTemp}
          onChange={(e) => setTagsTemp(e.target.value)}
          placeholder="Link"
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
      <div className="input-container">
        <div className="text-field-title">Live</div>
        <input
          type="input"
          value={live}
          onChange={(e) => setLive(e.target.value)}
          placeholder="Live"
          className="text-input"
        />
      </div>
    </div>
  );
};

export default Inputs;
