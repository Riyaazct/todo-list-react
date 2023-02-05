import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-auto p-4 bg-blue-500">
      <div className="w-full h-full text-center">
        <form>
          <label className="text-lg" htmlFor="input">
            Enter Task
            <input
              className="w-full h-10 rounded-md"
              type="text"
              id="input"
            />
            <label htmlFor="category">Category </label>
            <select name="category" id=" category">
              <option value="" disabled selected>
                Select category
              </option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Hero;
