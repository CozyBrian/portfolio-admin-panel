import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
