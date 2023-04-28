import { Profile, Project, Work } from "@/types";
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

export const getWorks = async (): Promise<Work[] | undefined> => {
  try {
    const snapshot = await get(child(dbRef, "Work"));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = async () => {
  try {
    const snapshot = await get(child(dbRef, "Profile"));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (profile: Profile) => {
  return update(ref(getDatabase(app), "Profile"), profile);
};

export const uploadImage = async (
  image: File,
  filename: string,
  path: string
) => {
  const imgRef = sRef(getStorage(app), `${path}/${filename}`);

  const sentImageRef = await uploadBytes(imgRef, image);

  return sentImageRef;
};

export const onPublishProject = (item: Project) => {
  return update(ref(getDatabase(app), "Projects/" + item.id), item);
};

export const onPublishWork = (item: Work) => {
  return update(ref(getDatabase(app), "Work/" + item.id), item);
};

export const onDeleteProject = (id: string) => {
  return remove(ref(getDatabase(app), "Projects/" + id));
};

export const onDeleteWork = (id: string) => {
  return remove(ref(getDatabase(app), "Work/" + id));
};
