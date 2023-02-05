import React, { useState } from "react";
import dummyData from "../dummyData.json";

const Tasks = () => {
  const [data, setData] = useState(dummyData);

  return (
    <div className="w-[80%] bg-gray-200 border-gray-300 border-2 h-full m-auto rounded-xl p-4">
      <h1>Tasks</h1>
      {/* Create cards for the tasks */}
    </div>
  );
};

export default Tasks;
