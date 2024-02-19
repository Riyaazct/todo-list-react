import api from "../services/api";
import React from "react";
import { FiDelete } from "react-icons/fi";

const Delete = ({ data, setData, url, id, userId, getTodos }) => {
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/tasks/delete/${id}/${userId}`
      );
      console.log(response.data);
      getTodos();

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return <FiDelete size={20} onClick={handleDelete} />;
};

export default Delete;
