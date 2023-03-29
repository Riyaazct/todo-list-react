import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineClear } from "react-icons/ai";

const Tasks = ({ data, setData }) => {
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get("/api/data");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/data/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
    // let result = data.filter((task) => task.id !== id);
    // setData(result);
  };

  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-gray-800 mb-2 mt-16">
        TODOS
      </h2>
      <div className="w-full bg-gray-200 border-gray-300 border-2 h-full m-auto rounded-xl p-4">
        {data.map(({ task, id }, index) => (
          <div className="flex items-center gap-2" key={id}>
            <p className="text-2xl my-1">{`${index + 1}.`}</p>
            <p className="text-2xl my-1">{task}</p>
            <div
              className="ml-auto flex gap-2 cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              <FiDelete size={20} />
              <AiOutlineEdit size={20} />
            </div>
          </div>
        ))}
        <div
          className="flex items-center gap-1 text-md border-solid border-[1px] border-blue-600 w-max ml-auto p-1 border-opacity-40 rounded-md
                         bg-blue-200 hover:border-blue-700 bg-opacity-60 hover:bg-opacity-90 md:text-lg lg:text-xl"
        >
          <p>Clear</p>
          <AiOutlineClear />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
