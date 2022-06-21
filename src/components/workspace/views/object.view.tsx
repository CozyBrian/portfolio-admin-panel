import PItemCard from "../components/pitem-card.component";
import { useStateContext } from "../../../context/stateContext";

const ObjectView = () => {
  const state = useStateContext();

  if (!state) return null;
  const { projects } = state;

  return (
    <div className="view ObjectView">
      <h3 className="view-title">Projects</h3>
      <hr />
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
