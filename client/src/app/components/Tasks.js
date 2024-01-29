import { useState } from "react";
import ClearList from "../buttons/ClearList";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import EditMode from "./EditMode";

const Tasks = ({ data, setData, url, id, getTodos }) => {
  // set editmode
  const [editing, setEditing] = useState(false);
  //id for identifying which line to render the input for editing
  const [idForEditing, setIdForEditing] = useState(null);
  // capture the text to use as placeholder in edit mode
  const [currentText, setCurrentText] = useState("");

  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-gray-800 mb-2 mt-16">
        TODOS
      </h2>
      <div className="w-full h-auto bg-gray-200 border-gray-300 border-2 m-auto rounded-xl p-4">
        {/*RENDER THE DATA*/}
        {data.map(({ task, id }, index) => (
          <div className="flex items-center gap-2" key={index}>
            <p className=" md:text-2xl my-1">{`${index + 1}.`}</p>

            {/* render input for editing a task if selected */}
            {editing && id === idForEditing ? (
              <EditMode
                setEditing={setEditing}
                currentText={currentText}
                setCurrentText={setCurrentText}
                id={id}
                data={data}
                setData={setData}
                url={url}
              />
            ) : (
              <p className="w-full md:text-xl my-1">{task}</p>
            )}
            <div className="ml-auto flex gap-2 cursor-pointer">
              <Delete
                data={data}
                setData={setData}
                url={url}
                id={id}
                getTodos={getTodos}
              />
              <Edit
                id={id}
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
        <ClearList getTodos={getTodos} url={url} setData={setData} />
      ) : null}
    </div>
  );
};

export default Tasks;