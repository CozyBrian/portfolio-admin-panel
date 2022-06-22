import { useStateContext } from "../../../context/stateContext";
import { TbUpload } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTrashOutline, IoRefresh } from "react-icons/io5";
import { Inputs } from "../../inputs";
import "./propertyview.css";
import { useState } from "react";

const PropertiesView = () => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const state = useStateContext();

  if (!state) return null;
  const { pActive, curObject, publish, onLoad, onDelete } = state;

  return (
    <div className="PropertiesView">
      <div className="view-title-bar">
        <h3 className="view-title">{pActive}</h3>
        <div className="view-title-icons">
          <div className="tbutton" onClick={() => publish()}>
            <TbUpload size={22} />
            <div>{" Publish"}</div>
          </div>
          <div
            className={!isVisibleMenu ? "ibutton" : "ibutton active"}
            onClick={() => setIsVisibleMenu(!isVisibleMenu)}
          >
            <BsThreeDotsVertical size={22} />
          </div>
          {isVisibleMenu && (
            <div className="popup">
              <div className="menu-item" onClick={() => onDelete()}>
                <IoTrashOutline size={20} className="icon" color="#930000" />
                Delete
              </div>
              <div className="menu-item" onClick={() => onLoad()}>
                <IoRefresh size={20} className="icon" />
                Refresh
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="hr" />
      {curObject && (
        <div className="fields-view">
          <Inputs obj={curObject} />
        </div>
      )}
    </div>
  );
};

export default PropertiesView;
