import React from "react";

const NewTask = () => {
  return (
    <div className="h-screen w-auto p-4 bg-blue-500">
      <div className="w-full h-full text-center">
        <form>
          <label className="text-lg font-medium" htmlFor="input">
            Add New Task
            <input
              className="w-full h-10 rounded-md"
              type="text"
              id="input"
            />
          </label>
        </form>
        <button className="mt-2 w-full hover:bg-gray-800 hover:border-blue-700 hover:text-blue-700">
          Add
        </button>
      </div>
    </div>
  );
};

export default NewTask;