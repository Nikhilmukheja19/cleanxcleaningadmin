import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./Components/Home";
import SignUp from "./Auth/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
