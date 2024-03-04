/* eslint-disable no-unused-vars */
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

import { fetchTasks } from "../redux/tasksSlice";

const EditMode = ({
  setEditing,
  currentText,
  setCurrentText,
  data,
  id,
  userId,
}) => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  //FUNCTION TO HANDLE THE ACCEPTANCE OF EDIT

  const handleSubmitForAcceptingEdit = async (e) => {
    // e.preventDefault();
    try {
      const foundTask = tasks.some(
        (task) => task.id === id && task.user_id === userId
      );

      if (foundTask) {
        const response = await api.put(
          `/tasks/update/${id}/${userId}`,
          {
            task: currentText,
          }
        );
        setEditing(false);
        dispatch(fetchTasks(userId));
        return response.data;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className="flex items-center w-full gap-1">
      <input
        className="bg-gray-200 focus:outline-none"
        type="text"
        value={currentText}
        placeholder={currentText}
        onChange={(e) => handleChange(e)}
        autoFocus
      />
      <AiOutlineCheck
        className="cursor-pointer hover:transition-transform hover:scale-125 hover:duration-500"
        color="green"
        size={25}
        onClick={(e) => handleSubmitForAcceptingEdit(e, id)}
      />

      <AiOutlineClose
        className="cursor-pointer hover:transition-transform hover:scale-125 hover:duration-500"
        color="red"
        size={25}
        onClick={() => {
          setEditing(false);
        }}
      />
    </div>
  );
};

export default EditMode;
