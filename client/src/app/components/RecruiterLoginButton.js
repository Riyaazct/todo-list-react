import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const RecruiterLoginButton = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("recruiter@gmail.com");
  const [password, setPassword] = useState("12345678");

  const recruiterLogin = async () => {
    try {
      await AuthService.login(email, password);
      navigate("/user");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center p-2">
      <p>Recruiter log in</p>
      <div
        className="ml-2 text-blue-600 cursor-pointer"
        onClick={recruiterLogin}
      >
        here
      </div>
    </div>
  );
};

export default RecruiterLoginButton;
