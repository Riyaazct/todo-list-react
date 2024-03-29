import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";

import { selectUserId } from "../redux/usersSlice";
import { fetchTasks } from "../redux/tasksSlice";

const NewTask = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const [captured, setCaptured] = useState("");

  // HANDLE BUTTON CLICK FUNCTION

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (captured && userId) {
        return await api
          .post("/tasks/new", { task: captured, user_id: userId })
          .then((response) => {
            setCaptured("");
            dispatch(fetchTasks({ userId }));
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="w-full h-10 p-2 font-semibold bg-gray-200 rounded-md placeholder:italic placeholder:text-black focus:outline-none "
            type="text"
            id="input"
            placeholder="Add task"
            value={captured}
            // ONCHANGE CHANGE EVENT
            onChange={(e) => setCaptured(e.target.value)}
            autoFocus
          />
          <button
            className="w-full mt-2 hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700"
            type="submit"
            // onClick={handleSubmit}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
