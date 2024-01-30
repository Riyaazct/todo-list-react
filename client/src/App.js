import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./app/components/NavBar";
import Home from "./app/components/Home";
import LoginScreen from "./app/components/LoginScreen";
import Register from "./app/components/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/login"} element={<LoginScreen />} />
        <Route exact path={"/register"} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
