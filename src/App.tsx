import "./App.css";
import { Toaster } from "react-hot-toast";

import Header from "./components/header";
import WorkSpace from "./components/workspace";
import Authetication from "./components/authentication/Authetication";
import { useAppSelector } from "./hooks";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.system);

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Header />
          <WorkSpace />
          <Toaster />
        </>
      ) : (
        <Authetication />
      )}
    </div>
  );
}

export default App;
