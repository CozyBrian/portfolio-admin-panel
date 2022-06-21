import ItemCard from "../components/item-card.component";

const DocumentView = () => {
  return (
    <div className="view DocumentView">
      <div className="view-title-bar">
        <h3 className="view-title">Content</h3>
      </div>
      <hr className="hr" />
      <div className="item-list">
        <ItemCard item="Projects" />
      </div>
    </div>
  );
};

export default DocumentView;
