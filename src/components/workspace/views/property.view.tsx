import { useStateContext } from "../../../context/stateContext";
import { Inputs } from "../../inputs";
import "./propertyview.css";

const PropertiesView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive, curObject } = state;

  return (
    <div className="PropertiesView">
      <h3 className="view-title">{pActive}</h3>
      <hr />
      {curObject && (
        <div className="fields-view">
          <Inputs obj={curObject} />
        </div>
      )}
    </div>
  );
};

export default PropertiesView;
