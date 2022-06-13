import { useStateContext } from "../../../context/stateContext";

const PropertiesView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive } = state;

  return (
    <div className="PropertiesView">
      <h3 className="view-title">{pActive}</h3>
      <hr />
    </div>
  );
};

export default PropertiesView;
