import { useStateContext } from "../../../context/stateContext";
import { TextInput } from "../../inputs";
import "./propertyview.css";

const PropertiesView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive } = state;

  return (
    <div className="PropertiesView">
      <h3 className="view-title">{pActive}</h3>
      <hr />
      <div className="fields-view">
        <TextInput />
      </div>
    </div>
  );
};

export default PropertiesView;
