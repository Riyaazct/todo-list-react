import axios from "axios";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const EditMode = ({ setEditing, currentText, setCurrentText }) => {
  //FUNCTION TO HANDLE THE ACCEPTANCE OF EDIT
  const handleSubmitForAcceptingEdit = async (e) => {
    try {
      axios.put("/api/data", (req, res) => {});
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className="flex items-center gap-1">
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
        onClick={handleSubmitForAcceptingEdit}
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
