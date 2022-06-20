import PItemCard from "../components/pitem-card.component";
import { AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../../context/stateContext";

const ObjectView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { projects, newProject } = state;

  return (
    <div className="view ObjectView">
      <div className="view-title-bar">
        <h3 className="view-title">Projects</h3>
        <div className="tbutton" onClick={() => newProject()}>
          <AiOutlinePlus />
        </div>
      </div>
      <hr className="hr" />
      <div className="item-list">
        {!projects
          ? null
          : projects.map((item: any, i: number) => (
              <PItemCard key={i} item={item.title} />
            ))}
      </div>
    </div>
  );
};

export default ObjectView;
