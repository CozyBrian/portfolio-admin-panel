import { useStateContext } from "../../../context/stateContext";
import { TbUpload } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Inputs } from "../../inputs";
import "./propertyview.css";

const PropertiesView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive, curObject, publish } = state;

  return (
    <div className="PropertiesView">
      <div className="view-title-bar">
        <h3 className="view-title">{pActive}</h3>
        <div className="title-icons">
          <IoTrash className="delete-icon" color="red" size={22} />
          <div className="tbutton" onClick={() => publish()}>
            <TbUpload size={22} />
            <div>{" Publish"}</div>
          </div>
          <BsThreeDotsVertical size={22} />
        </div>
      </div>
      <hr className="hr" />
      {curObject && (
        <div className="fields-view">
          <Inputs obj={curObject} />
        </div>
      )}
      <hr className="hr b" />
      <div className="view-title-bar">
        <h3 className="view-title">{pActive}</h3>
        <div className="title-icons">
          <IoTrash className="delete-icon" color="red" size={22} />
          <div className="tbutton" onClick={() => publish()}>
            <TbUpload size={22} />
            <div>{" Publish"}</div>
          </div>
          <BsThreeDotsVertical size={22} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesView;
