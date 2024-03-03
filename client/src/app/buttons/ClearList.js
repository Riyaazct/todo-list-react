import { useSelector } from "react-redux";
import api from "../services/api";
import React from "react";
import { AiOutlineClear } from "react-icons/ai";

const ClearList = ({ getTodos }) => {
  const userId = useSelector((state) => state.user.userDetails.id);

  //HANDLE DELETE ALL FUNCTION
  const handleDeleteAll = async () => {
    try {
      await api.put(`/tasks/clear/${userId}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="flex ml-auto items-center gap-1 mt-1 border-solid border-[1px] border-blue-700 w-max p-1 rounded-md
                         bg-blue-200 bg-opacity-80 hover:bg-opacity-90 md:text-lg lg:text-xl cursor-pointer"
      onClick={handleDeleteAll}
    >
      <p>Clear</p>
      <AiOutlineClear />
    </div>
  );
};

export default ClearList;
