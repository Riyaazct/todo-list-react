import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const Edit = ({
  id,
  setEditing,
  setIdForEditing,
  setCurrentText,
  task,
}) => {
  const handleClick = (id) => {
    setEditing(true);
    setIdForEditing(id);
    setCurrentText(task);
  };

  return <AiOutlineEdit size={25} onClick={() => handleClick(id)} />;
};

export default Edit;
