import { useState } from "react";
import ClearList from "../buttons/ClearList";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import EditMode from "./EditMode";
import { AiOutlineClose } from "react-icons/ai";

const Tasks = ({ data, setData, url, id }) => {
  const [editing, setEditing] = useState(false);
  const [idForEditing, setIdForEditing] = useState(null);

  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-gray-800 mb-2 mt-16">
        TODOS
      </h2>
      <div className="w-full h-auto bg-gray-200 border-gray-300 border-2 m-auto rounded-xl p-4">
        {data.map(({ task, id }, index) => (
          <div className="flex items-center gap-2" key={id}>
            <p className=" md:text-2xl my-1">{`${index + 1}.`}</p>
            {editing && id === idForEditing ? (
              <EditMode setEditing={setEditing} />
            ) : (
              <p className="w-full md:text-xl my-1">{task}</p>
            )}
            <div className="ml-auto flex gap-2 cursor-pointer">
              <Delete
                data={data}
                setData={setData}
                url={url}
                id={id}
              />
              <Edit
                data={data}
                setData={setData}
                url={url}
                id={id}
                setEditing={setEditing}
                editing={editing}
                setIdForEditing={setIdForEditing}
              />
            </div>
          </div>
        ))}
      </div>
      <ClearList />
    </div>
  );
};

export default Tasks;
