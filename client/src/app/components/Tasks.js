import { useState } from "react";
import ClearList from "../buttons/ClearList";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import EditMode from "./EditMode";

const Tasks = ({ data, setData, getTodos }) => {
  // set editmode
  const [editing, setEditing] = useState(false);
  //id for identifying which line to render the input for editing
  const [idForEditing, setIdForEditing] = useState(null);
  // capture the text to use as placeholder in edit mode
  const [currentText, setCurrentText] = useState("");

  return (
    <div>
      <h2 className="mt-16 mb-2 text-4xl font-bold text-center text-gray-800">
        TODOS
      </h2>
      <div className="w-full h-auto p-4 m-auto bg-gray-200 border-2 border-gray-300 rounded-xl">
        {/*RENDER THE DATA*/}
        {data.map(({ task, id, user_id: userId }, index) => (
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
                data={data}
                getTodos={getTodos}
                setData={setData}
              />
            ) : (
              <p className="w-full my-1 md:text-xl">{task}</p>
            )}
            <div className="flex gap-2 ml-auto cursor-pointer">
              <Delete
                data={data}
                setData={setData}
                id={id}
                getTodos={getTodos}
              />
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
      {data.length ? (
        <ClearList getTodos={getTodos} setData={setData} />
      ) : null}
    </div>
  );
};

export default Tasks;
