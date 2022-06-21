import { useStateContext } from "../../../context/stateContext";
<<<<<<< HEAD
import { TbUpload } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
=======
>>>>>>> parent of 82ed5cd (feat: updating projects)
import { Inputs } from "../../inputs";
import "./propertyview.css";

const PropertiesView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive, curObject } = state;

  return (
    <div className="PropertiesView">
<<<<<<< HEAD
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
=======
      <h3 className="view-title">{pActive}</h3>
      <hr />
>>>>>>> parent of 82ed5cd (feat: updating projects)
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
