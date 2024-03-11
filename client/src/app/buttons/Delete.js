import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { FiDelete } from "react-icons/fi";
import { fetchTasks } from "../redux/tasksSlice";

const Delete = ({ id, userId }) => {
  const dispatch = useDispatch();
  const taskStatus = useSelector((state) => state.tasks.taskStatus);

  const handleDelete = async () => {
    try {
      const response = await api.put(
        `/tasks/status_update/${id}/${userId}`,
        { task_status: "deleted" }
      );
      dispatch(fetchTasks({ userId, taskStatus }));

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={taskStatus === "deleted" ? "hidden" : "block"}>
      <FiDelete size={25} onClick={handleDelete} />
    </div>
  );
};

export default Delete;
