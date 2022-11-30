import PItemCard from "../components/pitem-card.component";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { action } from "../../../redux";

const ObjectView = () => {
  const { projects } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  return (
    <div className="view ObjectView">
      <div className="view-title-bar">
        <h3 className="view-title">Projects</h3>
        <div
          className="tbutton"
          onClick={() => dispatch(action.app.addNewProject())}
        >
          <AiOutlinePlus />
        </div>
      </div>
      <hr className="hr" />
      <div className="item-list">
        {projects.map((item) => (
          <PItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ObjectView;
