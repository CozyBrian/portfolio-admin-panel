import React from "react";
import "./item-card.css";
import { useStateContext } from "../../../context/stateContext";

interface Props {
  item: string;
}

const ItemCard = ({ item }: Props) => {
  const state = useStateContext();

  if (!state) return null;
  const { cActive, setCActive } = state;

  return (
    <div
      className={item === cActive ? "item-card active" : "item-card"}
      onClick={() => setCActive(item)}
    >
      {item}
    </div>
  );
};

export default ItemCard;
