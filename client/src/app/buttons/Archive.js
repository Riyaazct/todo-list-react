import { useSelector } from "react-redux";

import { selectTaskStatus } from "../redux/tasksSlice";

import { BiArchiveIn } from "react-icons/bi";

const Archive = () => {
  const taskStatus = useSelector(selectTaskStatus);

  return (
    <div
      className={
        taskStatus === "archived" || taskStatus === "deleted"
          ? "hidden"
          : ""
      }
    >
      <BiArchiveIn size={25} />
    </div>
  );
};

export default Archive;
