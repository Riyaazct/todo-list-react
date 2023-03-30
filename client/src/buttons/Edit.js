import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const Edit = ({
  data,
  setData,
  url,
  id,
  setEditing,
  editing,
  setIdForEditing,
  setCurrentText,
  task,
}) => {
  const handleClick = (id) => {
    setEditing(true);
    setIdForEditing(id);
    setCurrentText(task);
  };

  return <AiOutlineEdit size={20} onClick={() => handleClick(id)} />;
};

export default Edit;
