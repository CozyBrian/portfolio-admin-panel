import React from "react";
import "./item-card.css";
import { useStateContext } from "../../../context/stateContext";

interface Props {
  item: string;
}

const PItemCard = ({ item }: Props) => {
  const state = useStateContext();

  if (!state) return null;
  const { pActive, setPActive } = state;

  return (
    <div
      className={item === pActive ? "item-card active" : "item-card"}
      onClick={() => setPActive(item)}
    >
      {item}
    </div>
  );
};

export default PItemCard;
