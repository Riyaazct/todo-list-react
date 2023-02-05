import React from "react";

const NewTask = () => {
  return (
    <div className="h-screen w-auto p-4 bg-blue-500">
      <div className="w-full h-full text-center">
        <form>
          <label className="text-lg" htmlFor="input">
            New Task
            <input
              className="w-full h-10 rounded-md"
              type="text"
              id="input"
            />
          </label>
        </form>
        <button className="">Add</button>
      </div>
    </div>
  );
};

export default NewTask;
