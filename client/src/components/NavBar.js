import { BiMenuAltRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-screen bg-blue-300 md:flex justify-around">
      <div className="p-3">
        <h1 className="text-2xl font-bold">My Todo App</h1>
        <BiMenuAltRight
          className={
            !isActive
              ? "absolute top-1 right-0 cursor-pointer md:hidden"
              : "hidden"
          }
          onClick={handleClick}
          size={35}
        />
        <MdClose
          className={
            isActive
              ? "absolute top-1 right-0 cursor-pointer md:hidden"
              : "hidden"
          }
          onClick={handleClick}
          size={35}
        />
      </div>
      <div
        className={
          isActive
            ? " text-center relative "
            : "hidden md:flex md:p-5 md:w-auto"
        }
      >
        <li className="px-4 text-gray-900">Home</li>
        <li className="px-4 text-gray-900">Catagories</li>
        <li className="px-4 text-gray-900">Completed Tasks</li>
        <li className="px-4 text-gray-900">Settings</li>
        <li className="px-4 text-gray-900">About</li>
      </div>
    </div>
  );
};

export default NavBar;
