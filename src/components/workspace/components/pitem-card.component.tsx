import React from "react";
import "./item-card.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { action } from "../../../redux";
import { project } from "../../../@types/project";

interface Props {
  item: project;
}

const PItemCard = ({ item }: Props) => {
  const { selectedProductId } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        item.id === selectedProductId ? "item-card active" : "item-card"
      }
      onClick={() => dispatch(action.app.setSelectedProductId(item.id))}
    >
      {item.title}
    </div>
  );
};

export default PItemCard;
