import { BiMenuAltRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

import Login from "../buttons/Login";
import Signup from "../buttons/Signup";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="justify-around w-screen bg-gray-200 border-b-2 border-gray-300 md:flex">
      <div className="flex justify-between">
        <h1 className="p-3 text-2xl font-bold text-blue-600 md:mt-2 lg:text-3xl ">
          My Todo App
        </h1>

        {/* login and register buttons */}
        <div className="flex gap-1 p-2">
          {!isLoggedIn && <Login />}
          {!isLoggedIn && <Signup />}
        </div>

        {isLoggedIn && (
          <BiMenuAltRight
            className={
              !isActive
                ? "absolute top-2 right-0 cursor-pointer md:hidden"
                : "hidden"
            }
            onClick={handleClick}
            size={40}
          />
        )}
        {isLoggedIn && (
          <MdClose
            className={
              isActive
                ? "absolute top-2 right-0 cursor-pointer md:hidden"
                : "hidden"
            }
            onClick={handleClick}
            size={40}
          />
        )}
      </div>
      <div
        className={
          isActive
            ? " text-center relative "
            : "hidden md:flex md:p-5 "
        }
      >
        <ul className="md:flex ">
          <li className="p-1 text-2xl text-gray-900 md:text-xl md:mx-5">
            Home
          </li>
          <li className="p-1 text-2xl text-gray-900 md:text-xl md:mx-5">
            Categories
          </li>
          <li className="p-1 text-2xl text-gray-900 md:text-xl md:ml-5">
            Completed Tasks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
