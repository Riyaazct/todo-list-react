import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { FiDelete } from "react-icons/fi";
import { fetchTasks } from "../redux/tasksSlice";

const Delete = ({ data, setData, url, id, userId, getTodos }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/tasks/delete/${id}/${userId}`
      );
      dispatch(fetchTasks(userId));

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return <FiDelete size={20} onClick={handleDelete} />;
};

export default Delete;
