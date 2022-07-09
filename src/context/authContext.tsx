import { useContext, useState, createContext } from "react";
import { authContext } from "../@types/authContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const loginRequest = (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

const AuthContext = createContext<authContext | null>(null);

export const AuthenticationContext = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setIsAuthenticated(!!usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setIsLoading(false);
        console.log(u);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.message);
        setError(e.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
