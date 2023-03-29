import { useState } from "react";
import NavBar from "./components/NavBar";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";

function App() {
  const [data, setData] = useState([]);
  return (
    <div className="">
      <NavBar />
      <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
        <NewTask setData={setData} />
        <Tasks data={data} setData={setData} />
      </div>
    </div>
  );
}

export default App;
