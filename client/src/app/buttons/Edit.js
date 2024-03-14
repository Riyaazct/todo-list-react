import { useSelector } from "react-redux";

import { AiOutlineEdit } from "react-icons/ai";

import { selectTaskStatus } from "../redux/tasksSlice";

const Edit = ({
  id,
  setEditing,
  setIdForEditing,
  setCurrentText,
  task,
}) => {
  const taskStatus = useSelector(selectTaskStatus);

  const handleClick = (id) => {
    setEditing(true);
    setIdForEditing(id);
    setCurrentText(task);
  };

  return (
    <div
      className={
        taskStatus === "deleted" || taskStatus === "completed"
          ? "hidden"
          : ""
      }
    >
      <AiOutlineEdit size={25} onClick={() => handleClick(id)} />
    </div>
  );
};

export default Edit;
