import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";

function App() {
  const [data, setData] = useState([]);

  // URL
  const url = "http://localhost:3100/api/data";

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <NavBar />
      <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
        <NewTask
          data={data}
          setData={setData}
          url={url}
          getTodos={getTodos}
        />
        <Tasks
          data={data}
          setData={setData}
          url={url}
          getTodos={getTodos}
        />
      </div>
    </div>
  );
}

export default App;
