import { Project } from "@/types";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  remove,
} from "firebase/database";
import { getStorage, ref as sRef, uploadBytes } from "firebase/storage";
import app from ".";

const database = getDatabase(app);

const dbRef = ref(database);

export const getProjects = async (): Promise<Project[] | undefined> => {
  try {
    const snapshot = await get(child(dbRef, "Projects"));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (image: File, filename: string) => {
  const imgRef = sRef(getStorage(app), `projects-screenshots/${filename}`);

  const sentImageRef = await uploadBytes(imgRef, image);

  return sentImageRef;
};

export const onPublish = (item: Project) => {
  return update(ref(getDatabase(app), "Projects/" + item.id), item);
};

export const onDelete = (id: string) => {
  return remove(ref(getDatabase(app), "Projects/" + id));
};
