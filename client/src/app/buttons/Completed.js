import { useState } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";

const Completed = ({ id }) => {
  const [completed, setCompleted] = useState(false);
  return (
    <div>
      <MdOutlineTaskAlt
        onClick={() => setCompleted(!completed)}
        className={completed ? "text-green-700 " : ""}
        size={25}
      />
    </div>
  );
};

export default Completed;

// add selectIsCompleted to state
// in the tasks component, set the style conditionally to line-through if task is completed
// change button color to green to signify completion
