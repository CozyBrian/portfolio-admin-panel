import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { onLoad } from "../../services/database";
import { DocumentView, ObjectView, PropertiesView } from "./views";
import "./workspace.css";

const WorkSpace = () => {
  const dispatch = useAppDispatch();

  const onLoadProjects = () => {
    onLoad()
      .then((snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          console.log(snapshot.val());
          dispatch(action.app.loadProjects(snapshot.val()));
          console.log("Loaded");
        }
      })
      .catch((e) => {
        toast.error("Ops there was a problem!");
        console.error(e);
      });
  };
  useEffect(() => {
    onLoadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="WorkSpace">
      <DocumentView />
      <div className="vl" />
      <ObjectView />
      <div className="vl" />
      <PropertiesView />
    </div>
  );
};

export default WorkSpace;
