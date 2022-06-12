import React from "react";
import ItemCard from "../components/item-card.component";

const DocumentView = () => {
  return (
    <div className="view DocumentView">
      <h3 className="view-title">Content</h3>
      <hr />
      <div className="item-list">
        <ItemCard item="1" />
        <ItemCard item="2" />
        <ItemCard item="3" />
        <ItemCard item="4" />
      </div>
    </div>
  );
};

export default DocumentView;
