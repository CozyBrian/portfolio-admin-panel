import "./App.css";

import Header from "./components/header";
import WorkSpace from "./components/workspace";

import { StateContext } from "./context/stateContext";

function App() {
  return (
    <div className="App">
      <StateContext>
        <Header />
        <WorkSpace />
      </StateContext>
    </div>
  );
}

export default App;
