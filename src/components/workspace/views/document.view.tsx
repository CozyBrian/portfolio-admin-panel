import ItemCard from "../components/item-card.component";

const DocumentView = () => {
  return (
    <div className="view DocumentView">
      <h3 className="view-title">Content</h3>
      <hr />
      <div className="item-list">
        <ItemCard item="Projects" />
      </div>
    </div>
  );
};

export default DocumentView;
