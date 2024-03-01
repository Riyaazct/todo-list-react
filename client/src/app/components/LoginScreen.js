import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

const LoginScreen = () => {
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Password required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      setMessage("");
      setLoading(true);

      try {
        await AuthService.login(email, password);
        navigate("/user");
        window.location.reload();
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    },
  });

  return (
    <div className="flex justify-center mt-36">
      <div className="flex flex-col justify-center text-center bg-gray-400 rounded-xl h-96 w-96">
        <h2 className="text-2xl font-bold text-black">Login</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full p-8 pb-5 "
        >
          {/* EMAIL INPUT */}
          <div>
            <input
              className="w-full p-2 mb-3 rounded-md placeholder:font-medium"
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div>{formik.errors.email}</div>
            )}
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <input
              placeholder="Password"
              className="w-full p-2 mt-3 mb-2 rounded-md placeholder:font-medium"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <div>{formik.errors.password}</div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="mt-3">
            <button
              className="p-1 text-white rounded-md bg-[#007bff] border-0 w-full"
              type="submit"
              disabled={loading}
            >
              {loading && <span></span>}
              <span>Login</span>
            </button>
          </div>

          {/* Display error messages if any */}
          {message && (
            <div>
              <div role="alert">{message}</div>
            </div>
          )}
        </form>
        <p>
          Don't have an account?{" "}
          <span className="text-blue-600">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
