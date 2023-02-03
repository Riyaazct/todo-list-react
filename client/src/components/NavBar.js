import { BiMenuAltRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-screen bg-blue-300">
      <div className="">
        <h1 className="text-2xl">My Todo App</h1>
        <div
          className={
            isActive ? "w-screen text-center relative" : "hidden"
          }
        >
          <li>Home</li>
          <li>Catagories</li>
          <li>Completed Tasks</li>
          <li>Settings</li>
          <li>About</li>
        </div>
        <BiMenuAltRight
          className={
            !isActive
              ? "absolute top-0 right-0 cursor-pointer"
              : "hidden"
          }
          onClick={handleClick}
          size={30}
        />
        <MdClose
          className={
            isActive
              ? "absolute top-0 right-0 cursor-pointer"
              : "hidden"
          }
          onClick={handleClick}
          size={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
