import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NewTask from "./NewTask";
import Tasks from "./Tasks";
import { fetchTasks } from "../redux/tasksSlice";

const Home = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const userId = userDetails?.id;

  const tasks = useSelector((state) => state.tasks.tasks);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks(userId));
    setData(tasks);

    // getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]);

  return (
    <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
      <NewTask data={data} setData={setData} />

      <Tasks data={data} setData={setData} />
    </div>
  );
};

export default Home;
