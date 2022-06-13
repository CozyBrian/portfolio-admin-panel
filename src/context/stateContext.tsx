import { createContext, useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, child, get } from "firebase/database";

import { stateContext } from "../@types/stateContext";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
  authDomain: "my-portfolio-35b84.firebaseapp.com",
  databaseURL:
    "https://my-portfolio-35b84-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-portfolio-35b84",
  storageBucket: "my-portfolio-35b84.appspot.com",
  messagingSenderId: "870805883123",
  appId: "1:870805883123:web:c979664ed96d8331968f86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const state = createContext<stateContext | null>(null);

export const StateContext = ({ children }: any) => {
  const [cActive, setCActive] = useState("Projects");
  const [pActive, setPActive] = useState("MealsToGo");
  const [projects, setProjects] = useState([]);

  const dbRef = ref(database);

  const onLoad = () => {
    get(child(dbRef, "Projects/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProjects(snapshot.val());
          console.log("Loaded");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <state.Provider
        value={{
          cActive,
          setCActive,
          pActive,
          setPActive,
          onLoad,
          projects,
        }}
      >
        {children}
      </state.Provider>
    </>
  );
};

export const useStateContext = () => useContext(state);
