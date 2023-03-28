import React from "react";

const NewTask = () => {
  return (
    <div>
      <div className="w-full h-full text-center mt-[50px]">
        <form action="submit">
          <input
            className="w-full h-10 rounded-md p-2 placeholder:italic"
            type="text"
            id="input"
            placeholder="Add task"
          />
        </form>
        <button
          className="mt-2 w-full hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
