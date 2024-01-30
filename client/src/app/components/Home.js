import { useState, useEffect } from "react";
import axios from "axios";
import NewTask from "./NewTask";
import Tasks from "./Tasks";

const Home = () => {
  const [data, setData] = useState([]);

  // URL
  // const url = "https://react-todo-list-d87e.onrender.com/api/data";
  const url =
    process.env.NODE_ENV === "production"
      ? "https://long-ruby-dhole-hat.cyclic.app/api/data"
      : "http://localhost:3100/api/data";

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
    <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
      <NewTask
        data={data}
        setData={setData}
        url={url}
        getTodos={getTodos}
      />

      {data.length ? (
        <Tasks
          data={data}
          setData={setData}
          url={url}
          getTodos={getTodos}
        />
      ) : null}
    </div>
  );
};

export default Home;