import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ClearList from "../buttons/ClearList";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import EditMode from "./EditMode";
import { fetchTasks } from "../redux/tasksSlice";
import { selectUserId, setIsLoggedIn } from "../redux/usersSlice";

const Tasks = () => {
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  // set edit mode
  const [editing, setEditing] = useState(false);
  //id for identifying which line to render the input for editing
  const [idForEditing, setIdForEditing] = useState(null);
  // capture the text to use as placeholder in edit mode
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (userId && taskStatus === "idle") {
      dispatch(fetchTasks(userId));
      dispatch(setIsLoggedIn(true));
    }
  }, [userId, dispatch, taskStatus]);

  return (
    <div>
      <h2 className="mt-16 mb-2 text-4xl font-bold text-center text-gray-800">
        TODOS
      </h2>
      <div className="w-full h-auto p-4 m-auto bg-gray-200 border-2 border-gray-300 rounded-xl">
        {/*RENDER THE DATA*/}
        {tasks.map(({ task, id, user_id: userId }, index) => (
          <div className="flex items-center gap-2" key={index}>
            <p className="my-1 md:text-2xl">{`${index + 1}.`}</p>

            {/* render input for editing a task if selected */}
            {editing && id === idForEditing ? (
              <EditMode
                setEditing={setEditing}
                currentText={currentText}
                setCurrentText={setCurrentText}
                id={id}
                userId={userId}
              />
            ) : (
              <p className="w-full my-1 md:text-xl">{task}</p>
            )}
            <div className="flex gap-2 ml-auto cursor-pointer">
              <Delete id={id} userId={userId} />
              <Edit
                id={id}
                userId={userId}
                setEditing={setEditing}
                setIdForEditing={setIdForEditing}
                setCurrentText={setCurrentText}
                task={task}
              />
            </div>
          </div>
        ))}
      </div>
      {/* IF TASKS EXIST, SHOW BUTTON, ELSE DON'T */}
      {tasks.length !== 0 && <ClearList />}
    </div>
  );
};

export default Tasks;
