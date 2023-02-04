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
      <h1 className="p-2 text-2xl font-bold lg:mt-3 ">My Todo App</h1>
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

      <div
        className={
          isActive
            ? " text-center relative "
            : "hidden md:flex md:p-5 "
        }
      >
        <ul className="md:flex">
          <li className="p-1  text-gray-900 md:text-lg md:mx-5">
            Home
          </li>
          <li className="p-1  text-gray-900 md:text-lg md:mx-5">
            Catagories
          </li>
          <li className="p-1  text-gray-900 md:text-lg md:ml-5">
            Completed Tasks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
