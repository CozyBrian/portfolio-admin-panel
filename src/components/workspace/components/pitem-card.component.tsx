import React from "react";
import "./item-card.css";
import { useStateContext } from "../../../context/stateContext";

interface Props {
  item: string;
}

const PItemCard = ({ item }: Props) => {
  const state = useStateContext();

  return (
    <div
      className={item === state?.pActive ? "item-card active" : "item-card"}
      onClick={() => state?.setPActive(item)}
    >
      {item}
    </div>
  );
};

export default PItemCard;
