import React from "react";

const NewTask = () => {
  return (
    <div className="h-full w-auto p-4">
      <div className="w-full h-full text-center">
        <form>
          <label className="text-lg font-" htmlFor="input">
            Add New Task
            <input
              className="w-full h-10 rounded-md"
              type="text"
              id="input"
            />
          </label>
        </form>
        <button className="mt-2 w-full hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
