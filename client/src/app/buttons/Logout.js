import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setIsLoggedIn } from "../redux/usersSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
  };

  return (
    <Link
      to="/login"
      className="px-3 py-1 border border-gray-700 rounded-lg"
      onClick={handleLogout}
    >
      Logout
    </Link>
  );
};

export default Logout;
