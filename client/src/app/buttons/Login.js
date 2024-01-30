import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Link
      to="/login"
      className="px-3 py-1 border border-gray-700 rounded-lg"
    >
      Login{" "}
    </Link>
  );
};

export default Login;
