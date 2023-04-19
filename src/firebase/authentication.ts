import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const isUserSignedIn = () => {
  return auth.currentUser !== null;
};
