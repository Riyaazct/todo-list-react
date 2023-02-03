import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-screen bg-blue-300">
      <div className="">
        <h1 className="text-2xl">My Todo App</h1>
        <div className="w-screen text-center relative">
          <li>Home</li>
          <li>Catagories</li>
          <li>Completed Tasks</li>
          <li>Settings</li>
          <li>About</li>
        </div>
        <BiMenuAltRight
          className="absolute top-0 right-0"
          size={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
