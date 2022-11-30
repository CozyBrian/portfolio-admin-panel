import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const registerUser = (email: string, password: string) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export const logOutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const getError = (errorCode: string) => {
  return errorCode.split("/")[1].replace("-", " ");
};
