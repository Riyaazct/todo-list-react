import { Routes, Route } from "react-router-dom";
import NavBar from "./app/components/NavBar";
import Home from "./app/pages/Home";
import LoginScreen from "./app/pages/LoginScreen";
import Register from "./app/pages/Register";
import BoardUser from "./app/pages/BoardUser";

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
