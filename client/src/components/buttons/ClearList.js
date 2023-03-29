import React from "react";
import { AiOutlineClear } from "react-icons/ai";

const ClearList = () => {
  return (
    <div
      className="flex items-center gap-1 text-md border-solid border-[1px] border-blue-600 w-max ml-auto p-1 border-opacity-40 rounded-md
                         bg-blue-200 hover:border-blue-700 bg-opacity-60 hover:bg-opacity-90 md:text-lg lg:text-xl"
    >
      <p>Clear</p>
      <AiOutlineClear />
    </div>
  );
};

export default ClearList;
