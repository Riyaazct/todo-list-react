import React from "react";
import { AiOutlineClear } from "react-icons/ai";

const ClearList = () => {
  return (
    <div
      className="flex ml-auto items-center gap-1 mt-1 border-solid border-[1px] border-blue-700 w-max p-1 rounded-md
                         bg-blue-200 bg-opacity-80 hover:bg-opacity-90 md:text-lg lg:text-xl"
    >
      <p>Clear</p>
      <AiOutlineClear />
    </div>
  );
};

export default ClearList;
