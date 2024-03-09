import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Login from "../buttons/Login";
import Signup from "../buttons/Signup";
import Logout from "../buttons/Logout";

import { fetchTasks } from "../redux/tasksSlice";
import { selectUserId } from "../redux/usersSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector(selectUserId);

  const handleOnClick = () => {
    dispatch(fetchTasks({ userId, taskStatus: "is_completed" }));
  };

  return (
    <nav className="flex items-center w-screen p-4 bg-gray-200 border-b-2 border-gray-300 sm:flex-row">
      <div className="flex flex-col items-center justify-around w-full md:flex-row">
        <Link to={isLoggedIn ? "/user" : "/"}>
          <h1 className="text-2xl font-bold text-blue-600 lg:text-3xl ">
            To-do App
          </h1>
        </Link>
        {isLoggedIn && (
          <div>
            <Link
              to="/user"
              className="p-1 text-2xl text-gray-900 md:text-xl md:mx-5"
            >
              Home
            </Link>
            <Link className="p-1 text-2xl text-gray-900 md:text-xl md:mx-5">
              Categories
            </Link>
            <Link
              className="p-1 text-2xl text-gray-900 md:text-xl md:ml-5"
              onClick={handleOnClick}
            >
              Completed Tasks
            </Link>
          </div>
        )}
        <div className="flex justify-center gap-1">
          {isLoggedIn && <Logout />}
          {!isLoggedIn && <Login />}
          {!isLoggedIn && <Signup />}
        </div>
      </div>

      {/* login and register buttons */}
    </nav>
  );
};

export default NavBar;
