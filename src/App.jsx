import { Route, Routes } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Home from "./Pages/Home";
import Study from "./Pages/Study";
import Groups from "./Pages/Groups";
import Profile from "./Pages/Profile";
import Assignments from "./Pages/Assignments";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Assignments" element={<Assignments />} />
      </Routes>
    </>
  );
}
