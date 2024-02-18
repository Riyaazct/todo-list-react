/* eslint-disable no-unused-vars */
import api from "../services/api";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const EditMode = ({
  setEditing,
  currentText,
  setCurrentText,
  data,
  id,
  userId,
  setData,
  getTodos,
}) => {
  //FUNCTION TO HANDLE THE ACCEPTANCE OF EDIT

  const handleSubmitForAcceptingEdit = async (e) => {
    // e.preventDefault();
    try {
      const foundTask = data.find(
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
        getTodos();
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
      />
      <AiOutlineCheck
        className="cursor-pointer hover:transition-transform hover:scale-125 hover:duration-500"
        color="green"
        size={20}
        onClick={(e) => handleSubmitForAcceptingEdit(e, id)}
      />

      <AiOutlineClose
        className="cursor-pointer hover:transition-transform hover:scale-125 hover:duration-500"
        color="red"
        size={20}
        onClick={() => {
          setEditing(false);
        }}
      />
    </div>
  );
};

export default EditMode;
