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
};

export const onDelete = (id: string) => {
  return remove(ref(getDatabase(app), "Projects/" + id));
};

export const onPublish = (item: project) => {
  return update(ref(getDatabase(app), "Projects/" + item.id), item);
};

export const uploadImage = (image: File) => {
  const imgRef = sRef(getStorage(app), `projects-screenshots/${image.name}`);
  return uploadBytes(imgRef, image).then(() => {
    return imgRef;
  });
};
