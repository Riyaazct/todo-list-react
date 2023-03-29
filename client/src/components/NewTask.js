import React, { useState } from "react";
import axios from "axios";

const NewTask = ({ setData }) => {
  const [captured, setCaptured] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/data", { task: captured })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="w-full h-full text-center mt-[50px]">
        <form action="submit">
          <input
            className="w-full h-10 rounded-md p-2 placeholder:italic bg-gray-200 placeholder:text-black font-semibold focus:outline-none "
            type="text"
            id="input"
            placeholder="Add task"
            value={captured}
            // ONCHANGE CHANGE EVENT
            onChange={(e) => setCaptured(e.target.value)}
          />
        </form>
        <button
          className="mt-2 w-full hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
