import { AiOutlineClose } from "react-icons/ai";

const EditMode = ({ setEditing }) => {
  return (
    <div className="flex items-center gap-1">
      <input type="text" placeholder="test" />
      <AiOutlineClose
        className="cursor-pointer"
        size={20}
        onClick={() => setEditing(false)}
      />
    </div>
  );
};

export default EditMode;
