import React from "react";
import "./item-card.css";
import { useStateContext } from "../../../context/stateContext";

interface Props {
  item: string;
}

const ItemCard = ({ item }: Props) => {
  const state = useStateContext();

  return (
    <div
      className={item === state?.cActive ? "item-card active" : "item-card"}
      onClick={() => state?.setCActive(item)}
    >
      {item}
    </div>
  );
};

export default ItemCard;
