// import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineClear } from "react-icons/ai";
import ClearList from "./buttons/ClearList";

const Tasks = ({ data, setData, url }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-gray-800 mb-2 mt-16">
        TODOS
      </h2>
      <div className="w-full h-auto bg-gray-200 border-gray-300 border-2 m-auto rounded-xl p-4">
        {data.map(({ task, id }, index) => (
          <div className="flex items-center gap-2" key={id}>
            <p className=" text-2xl my-1">{`${index + 1}.`}</p>
            <p className="w-full text-xl my-1">{task}</p>
            <div
              className="ml-auto flex gap-2 cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              <FiDelete size={20} />
              <AiOutlineEdit size={20} />
            </div>
          </div>
        ))}
        <ClearList />
      </div>
    </div>
  );
};

export default Tasks;
