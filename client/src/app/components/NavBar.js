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
    <div className="flex items-center justify-around w-screen p-4 bg-gray-200 border-b-2 border-gray-300 sm:flex-row">
      <div className="flex flex-col items-center w-full ">
        <h1 className="text-2xl font-bold text-blue-600 lg:text-3xl ">
          My Todo App
        </h1>

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

        <div
          className={
            isActive
              ? " text-center relative "
              : "hidden md:flex md:p-5 "
          }
        >
          {isLoggedIn && (
            <ul className="md:flex">
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
          )}
        </div>
      </div>
      {/* login and register buttons */}
      <div className="flex gap-1">
        {!isLoggedIn && <Login />}
        {!isLoggedIn && <Signup />}
      </div>
    </div>
  );
};

export default NavBar;
