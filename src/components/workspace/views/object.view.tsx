import React from "react";
import PItemCard from "../components/pitem-card.component";

const ObjectView = () => {
  return (
    <div className="view ObjectView">
      <h3 className="view-title">Projects</h3>
      <hr />
      <div className="item-list">
        <PItemCard item="5" />
        <PItemCard item="6" />
        <PItemCard item="7" />
      </div>
    </div>
  );
};

export default ObjectView;
