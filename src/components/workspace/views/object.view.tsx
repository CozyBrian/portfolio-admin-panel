import React from "react";
import ItemCard from "../components/item-card.component";

const ObjectView = () => {
  return (
    <div className="view ObjectView">
      <h3 className="view-title">Projects</h3>
      <hr />
      <div className="item-list">
        <ItemCard />
      </div>
    </div>
  );
};

export default ObjectView;
