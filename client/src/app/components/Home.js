import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import api from "../services/api";
import NewTask from "./NewTask";
import Tasks from "./Tasks";

const Home = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const userId = userDetails?.id;
  const [data, setData] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://long-ruby-dhole-hat.cyclic.app/api/tasks"
      : "http://localhost:3100/api/tasks";

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getTodos = async () => {
    try {
      if (!userId) return;
      const response = await api.get(`${url}/${userId}`);
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
      <NewTask data={data} setData={setData} getTodos={getTodos} />

      <Tasks data={data} setData={setData} getTodos={getTodos} />
    </div>
  );
};

export default Home;
