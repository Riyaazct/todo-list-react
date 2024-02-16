/* eslint-disable no-unused-vars */
import api from "../services/api";
import { useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const EditMode = ({
  setEditing,
  currentText,
  setCurrentText,
  data,
  setData,
}) => {
  const userId = data[0].user_id;
  const id = data[0].id;

  //FUNCTION TO HANDLE THE ACCEPTANCE OF EDIT
  const handleSubmitForAcceptingEdit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/tasks/update/${id}/${userId}`,
        {
          task: currentText,
        }
      );
      setData(
        data.map((item) =>
          item.id === id ? { ...item, task: currentText } : item
        )
      );
      setEditing(false);
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
