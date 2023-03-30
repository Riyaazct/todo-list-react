import { AiOutlineClose } from "react-icons/ai";

const EditMode = ({ setEditing, currentText }) => {
  return (
    <div className="flex items-center gap-1">
      <input
        className="bg-gray-200 focus:outline-none"
        type="text"
        placeholder={currentText}
      />
      <AiOutlineClose
        className="cursor-pointer"
        size={20}
        onClick={() => {
          setEditing(false);
        }}
      />
    </div>
  );
};

export default EditMode;
