import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./app/components/NavBar";
import Home from "./app/components/Home";
import LoginScreen from "./app/components/LoginScreen";
import Register from "./app/components/Register";
import BoardUser from "./app/components/BoardUser";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/login"} element={<LoginScreen />} />
        <Route exact path={"/register"} element={<Register />} />
        <Route exact path={"/user"} element={<BoardUser />} />
      </Routes>
    </div>
  );
}

export default App;
