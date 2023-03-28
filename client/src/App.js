import NavBar from "./components/NavBar";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App ">
      <NavBar />
      <NewTask />
      <Tasks />
    </div>
  );
}

export default App;
