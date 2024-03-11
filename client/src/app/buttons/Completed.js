import api from "../services/api";

import { useSelector, useDispatch } from "react-redux";

import { MdOutlineTaskAlt } from "react-icons/md";
import { selectUserId } from "../redux/usersSlice";
import { fetchTasks } from "../redux/tasksSlice";

const Completed = ({ id }) => {
  const dispatch = useDispatch();

  const taskStatus = useSelector((state) => state.tasks.taskStatus);
  const userId = useSelector(selectUserId);

  const handleOnClick = async () => {
    await api.put(`/tasks/status_update/${id}/${userId}`, {
      task_status: "completed",
    });
    dispatch(fetchTasks({ userId }));
  };

  return (
    <div
      className={
        taskStatus === "completed" ||
        taskStatus === "deleted" ||
        taskStatus === "archived"
          ? "hidden"
          : "block"
      }
    >
      <MdOutlineTaskAlt size={25} onClick={handleOnClick} />
    </div>
  );
};

export default Completed;

// add selectIsCompleted to state
