import { createContext, useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref, child, get, update } from "firebase/database";

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
const storage = getStorage(app);

const state = createContext<stateContext | null>(null);

export const StateContext = ({ children }: any) => {
  const [cActive, setCActive] = useState("Projects");
  const [pActive, setPActive] = useState("MealsToGo");
  const [projects, setProjects] = useState<any>([]);
  const [numProj, setNumProj] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [curObject, setCurObject] = useState<any>({});
  const [untitled, setUntitled] = useState(1);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>({});
  const [link, setLink] = useState("");
  const [disc, setDisc] = useState("");
  const [selected, setSelected] = useState<any>("web");
  const [imageUrl, setImageUrl] = useState("");

  const dbRef = ref(database);

  const uploadImage = (image: any) => {
    if (image == null) return null;
    const imgRef = sRef(storage, `projects-screenshots/${image.name}`);
    uploadBytes(imgRef, image)
      .then(() => {
        console.log("uploaded");
      })
      .then(() => {
        getDownloadURL(imgRef).then((url) => setImageUrl(url));
      });
  };

  const newProject = () => {
    const title = `Untilted-${untitled}`;
    const nP = {
      title: title,
      image: "",
      type: "web",
      link: "",
      disc: "",
    };
    console.log(projects.length);
    setNumProj(projects.length);
    setProjects([...projects, nP]);
    setPActive(title);
    setUntitled(untitled + 1);
  };

  const publish = () => {
    const curObj = {
      title: title,
      image: imageUrl,
      type: selected,
      link: link,
      disc: disc,
    };

    update(ref(database, "Projects/" + numProj), curObj)
      .then(() => {
        console.log("published");
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        onLoad();
        setPActive(curObj.title);
      });

    console.log(curObj);
  };

  const onLoad = () => {
    get(child(dbRef, "Projects/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProjects(snapshot.val());
          console.log("Loaded");
          setLoaded(true);
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

  useEffect(() => {
    const selObject = projects.filter((item: any) => item.title === pActive)[0];
    setCurObject(selObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pActive, loaded]);

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
          curObject,
          uploadImage,
          title,
          image,
          link,
          disc,
          selected,
          setTitle,
          setImage,
          setLink,
          setDisc,
          setSelected,
          imageUrl,
          newProject,
          publish,
        }}
      >
        {children}
      </state.Provider>
    </>
  );
};

export const useStateContext = () => useContext(state);
