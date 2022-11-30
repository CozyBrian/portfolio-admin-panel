import { TbUpload } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTrashOutline, IoRefresh, IoClose } from "react-icons/io5";
import { Inputs } from "../../inputs";
import "./propertyview.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { action } from "../../../redux";
import { onDelete, onLoad, onPublish } from "../../../services/database";
import toast from "react-hot-toast";

const PropertiesView = () => {
  const { projects, selectedProductId, tempProject } = useAppSelector(
    (state) => state.app
  );
  const { isMenuOpen, isModalOpen } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const active_project = projects.find((item) => item.id === selectedProductId);

  const onLoadProjects = () => {
    onLoad()
      .then((snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          dispatch(action.app.loadProjects(snapshot.val()));
          console.log("Loaded");
        }
      })
      .catch((e) => {
        toast.error("Ops there was a problem!");
        console.error(e);
      });
  };

  const onDeleteItem = () => {
    if (active_project?.id)
      onDelete(active_project?.id)
        .then(() => {
          console.log(`item ${active_project?.id} deleted`);
          toast.success(`${active_project.title} Deleted!`);
        })
        .then(() => {
          onLoadProjects();
        })
        .catch((e) => {
          toast.error("Ops there was a problem!");
          console.error(e);
        });
  };

  const onPublishProject = () => {
    if (tempProject)
      onPublish(tempProject)
        .then(() => {
          toast.success(`Successfully Published`);
        })
        .catch((e) => {
          toast.error("Ops there was a problem!");
          console.error(e);
        })
        .finally(() => {
          onLoadProjects();
        });
  };

  return (
    <div className="PropertiesView">
      {isModalOpen && (
        <div className="delete-modal-view">
          <div className="delete-modal">
            <div className="modal-header">
              Delete?
              <IoClose
                className="r-icon"
                size={20}
                onClick={() => dispatch(action.system.setIsModalOpen(false))}
              />
            </div>
            <div className="modal-content">
              Are you sure you want to delete this project? It will be lost
              forever.
            </div>
            <div className="modal-footer">
              <div
                className="mbutton"
                onClick={() => {
                  onDeleteItem();
                  dispatch(action.system.setIsModalOpen(false));
                }}
              >
                DELETE
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="view-title-bar">
        <h3 className="view-title">{active_project?.title}</h3>
        <div className="view-title-icons">
          <div className="tbutton" onClick={() => onPublishProject()}>
            <TbUpload size={22} />
            <div>{" Publish"}</div>
          </div>
          <div
            className={!isMenuOpen ? "ibutton" : "ibutton active"}
            onClick={() => dispatch(action.system.setIsMenuOpen(!isMenuOpen))}
          >
            <BsThreeDotsVertical size={22} />
          </div>
          {isMenuOpen && (
            <div className="popup">
              <div
                className="menu-item"
                onClick={() => dispatch(action.system.setIsModalOpen(true))}
              >
                <IoTrashOutline size={20} className="icon" color="#930000" />
                Delete
              </div>
              <div className="menu-item" onClick={() => onLoadProjects()}>
                <IoRefresh size={20} className="icon" />
                Refresh
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="hr" />
      {active_project && (
        <div className="fields-view">
          <Inputs obj={active_project} />
        </div>
      )}
    </div>
  );
};

export default PropertiesView;
