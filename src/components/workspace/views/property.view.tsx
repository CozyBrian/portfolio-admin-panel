import { useStateContext } from "../../../context/stateContext";
import { TbUpload } from "react-icons/tb";
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
        <div className="tbutton" onClick={() => publish()}>
          <TbUpload size={22} />
          <div>{" Publish"}</div>
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
