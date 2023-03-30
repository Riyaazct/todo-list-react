import axios from "axios";
import React from "react";
import { FiDelete } from "react-icons/fi";

const Delete = ({ data, setData, url, id }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return <FiDelete size={20} onClick={() => handleDelete(id)} />;
};

export default Delete;
