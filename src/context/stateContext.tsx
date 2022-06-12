import React, { createContext, useState, useContext } from "react";
import { stateContext } from "../@types/stateContext";

const state = createContext<stateContext | null>(null);

export const StateContext = ({ children }: any) => {
  const [cActive, setCActive] = useState("1");
  const [pActive, setPActive] = useState("5");

  return (
    <>
      <state.Provider value={{ cActive, setCActive, pActive, setPActive }}>
        {children}
      </state.Provider>
    </>
  );
};

export const useStateContext = () => useContext(state);
