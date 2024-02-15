import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

const NewTask = ({ data, setData, getTodos }) => {
  const user = useSelector((state) => state.user);
  const userId = user?.userDetails.id;

  const [captured, setCaptured] = useState("");

  // HANDLE BUTTON CLICK FUNCTION

  const handleSubmit = async (e) => {
    try {
      if (captured && userId) {
        return await api
          .post("/tasks/new", { task: captured, user_id: userId })
          .then((response) => {
            getTodos();
            setCaptured("");
          })
          .catch((error) => {
            console.error(error.message);
            setCaptured("");
          });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="w-full h-full text-center mt-[50px]">
        <form>
          <input
            className="w-full h-10 p-2 font-semibold bg-gray-200 rounded-md placeholder:italic placeholder:text-black focus:outline-none "
            type="text"
            id="input"
            placeholder="Add task"
            value={captured}
            // ONCHANGE CHANGE EVENT
            onChange={(e) => setCaptured(e.target.value)}
          />
        </form>
        <button
          className="w-full mt-2 hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700"
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
