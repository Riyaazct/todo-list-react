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
}) => {
  const handleClick = (id) => {
    setEditing(true);
    setIdForEditing(id);
  };

  return <AiOutlineEdit size={20} onClick={() => handleClick(id)} />;
};

export default Edit;
