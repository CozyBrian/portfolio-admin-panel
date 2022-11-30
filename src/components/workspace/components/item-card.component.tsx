import React from "react";
import "./item-card.css";
import { useAppSelector } from "../../../hooks";

interface Props {
  item: string;
}

const ItemCard = ({ item }: Props) => {
  const { selectedContent } = useAppSelector((state) => state.app);

  return (
    <div
      className={item === selectedContent ? "item-card active" : "item-card"}
    >
      {item}
    </div>
  );
};

export default ItemCard;
