import {
  child,
  get,
  getDatabase,
  ref,
  set,
  update,
  remove,
} from "firebase/database";
import { getStorage, ref as sRef, uploadBytes } from "firebase/storage";
import { project } from "../@types/project";

import app from "../firebase/firebase";

export const setUserData = (
  userId: string,
  email: string | null,
  name?: string
) => {
  const db = getDatabase(app);

  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    todoLists: {},
  });
};

export const onLoad = () => {
  return get(child(ref(getDatabase(app)), "Projects/"));
  // .then((snapshot) => {
  //   if (snapshot.exists() && snapshot.val()) {
  //     setProjects(snapshot.val());
  //     console.log("Loaded");
  //     setLoaded(true);
  //   }
  // })
  // .catch((e) => {
  //   toast.error("Ops there was a problem!");
  //   console.error(e);
  // });
};

export const onDelete = (id: string) => {
  return remove(ref(getDatabase(app), "Projects/" + id));
  // .then(() => {
  //   console.log(`item ${id} deleted`);
  //   toast.success(`${curObject.title} Deleted!`);
  // })
  // .then(() => {
  //   onLoad();
  //   setTimeout(() => {
  //     setPActive("MealsToGo");
  //   }, 300);
  // })
  // .catch((e) => {
  //   toast.error("Ops there was a problem!");
  //   console.error(e);
  // });
};

export const onPublish = (item: project) => {
  return update(ref(getDatabase(app), "Projects/" + item.id), item);
  // .then(() => {
  //   toast.success(`Successfully Published`);
  // })
  // .catch((e) => {
  //   toast.error("Ops there was a problem!");
  //   console.error(e);
  // })
  // .finally(() => {
  //   onLoad();
  //   setTimeout(() => {
  //     setPActive(curObj.title);
  //   }, 300);
  //   setImgButtonClicked(false);
  // });
};

export const uploadImage = (image: File) => {
  const imgRef = sRef(getStorage(app), `projects-screenshots/${image.name}`);
  return uploadBytes(imgRef, image).then(() => {
    return imgRef;
  });
};
