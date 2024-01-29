import axios from "axios";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const EditMode = ({
  setEditing,
  currentText,
  setCurrentText,
  id,
  data,
  setData,
  url,
}) => {
  //FUNCTION TO HANDLE THE ACCEPTANCE OF EDIT
  const handleSubmitForAcceptingEdit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/${id}`, {
        task: currentText,
      });
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
    <div className="flex items-center gap-1 w-full">
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
