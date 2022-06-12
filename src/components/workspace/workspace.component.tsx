import React from "react";
import { DocumentView, ObjectView, PropertiesView } from "./views";
import "./workspace.css";

const WorkSpace: React.FC = () => {
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
