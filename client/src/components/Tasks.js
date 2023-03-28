import React, { useState } from "react";
import dummyData from "../dummyData.json";

const Tasks = () => {
  const [data, setData] = useState(dummyData);

  return (
    <div>
      <h2 className="text-center font-bold text-xl text-gray-800 mb-1">
        Tasks
      </h2>
      <div className="w-full bg-gray-200 border-gray-300 border-2 h-full m-auto rounded-xl p-4">
        {/* Create cards for the tasks */}
      </div>
    </div>
  );
};

export default Tasks;
