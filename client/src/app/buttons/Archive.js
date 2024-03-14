import { useSelector, useDispatch } from "react-redux";

import { selectTaskStatus, fetchTasks } from "../redux/tasksSlice";
import api from "../services/api";

import { BiArchiveIn } from "react-icons/bi";

const Archive = ({ id, userId }) => {
  const dispatch = useDispatch();
  const taskStatus = useSelector(selectTaskStatus);

  const handleOnClick = async () => {
    try {
      await api.put(`/tasks/status_update/${id}/${userId}`, {
        task_status: "archived",
      });
      dispatch(fetchTasks({ userId, taskStatus }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={taskStatus === "archived" ? "hidden" : ""}>
      <BiArchiveIn size={25} onClick={handleOnClick} />
    </div>
  );
};

export default Archive;
