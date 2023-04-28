import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Work from "@/pages/work";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/profile";
import AppLayout from "./components/layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
