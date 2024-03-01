import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import Login from "../buttons/Login";
import Signup from "../buttons/Signup";
import Logout from "../buttons/Logout";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex items-center w-screen p-4 bg-gray-200 border-b-2 border-gray-300 sm:flex-row">
      <div className="flex flex-col items-center justify-around w-full md:flex-row">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600 lg:text-3xl ">
            My Todo App
          </h1>
        </Link>

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
          {isActive && (
            <div>
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

              <div className="flex gap-1">
                {isLoggedIn && <Logout />}
                {!isLoggedIn && <Login />}
                {!isLoggedIn && <Signup />}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* login and register buttons */}
    </div>
  );
};

export default NavBar;
