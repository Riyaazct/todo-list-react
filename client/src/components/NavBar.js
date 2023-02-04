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
      <h1 className="text-gray-900 p-3 text-2xl font-bold md:mt-2 lg:text-3xl ">
        My Todo App
      </h1>
      <BiMenuAltRight
        className={
          !isActive
            ? "absolute top-2 right-0 cursor-pointer md:hidden"
            : "hidden"
        }
        onClick={handleClick}
        size={40}
      />
      <MdClose
        className={
          isActive
            ? "absolute top-2 right-0 cursor-pointer md:hidden"
            : "hidden"
        }
        onClick={handleClick}
        size={40}
      />

      <div
        className={
          isActive
            ? " text-center relative "
            : "hidden md:flex md:p-5 "
        }
      >
        <ul className="md:flex">
          <li className="p-1 text-gray-900 md:text-xl md:mx-5">
            Home
          </li>
          <li className="p-1 text-gray-900 md:text-xl md:mx-5">
            Catagories
          </li>
          <li className="p-1  text-gray-900 md:text-xl md:ml-5">
            Completed Tasks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
