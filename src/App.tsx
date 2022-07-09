import "./App.css";

import Header from "./components/header";
import WorkSpace from "./components/workspace";
import Authetication from "./components/authentication/Authetication";

import { StateContext } from "./context/stateContext";
import { useAuthContext } from "./context/authContext";

function App() {
  const state = useAuthContext();
  if (!state) return null;
  const { isAuthenticated } = state;

  return (
    <div className="App">
      {isAuthenticated ? (
        <StateContext>
          <Header />
          <WorkSpace />
        </StateContext>
      ) : (
        <Authetication />
      )}
    </div>
  );
}

export default App;
