import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineClear } from "react-icons/ai";

const Tasks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-gray-800 mb-2 mt-16">
        TODOS
      </h2>
      <div className="w-full bg-gray-200 border-gray-300 border-2 h-full m-auto rounded-xl p-4">
        {data.map(({ task }, i) => (
          <div className="flex" key={i}>
            <p className="text-2xl">{task}</p>
            <div className="ml-auto flex gap-2">
              <FiDelete size={20} />
              <AiOutlineEdit size={20} />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-end gap-2 text-xl">
          <p>Clear list</p>
          <AiOutlineClear />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
