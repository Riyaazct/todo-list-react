import NavBar from "./components/NavBar";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="">
      <NavBar />
      <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
        <NewTask />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
