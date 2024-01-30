import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    onSubmit: (data) => {
      const { email, password } = data;
      setMessage("");
      setLoading(true);

      AuthService.login(email, password)
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        });
    },
  });

  return (
    <div className="flex justify-center h-screen mt-36 ">
      <div className="flex flex-col justify-center p-2 text-center bg-gray-400 border-2 border-gray-700 h-60">
        <h2 className="mb-4 text-2xl font-bold text-blue-700 ">
          SIGN IN
        </h2>

        <form onSubmit={formik.handleSubmit} className="p-4">
          {/* EMAIL INPUT */}
          <div className="p-1">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-sm ml-9"
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
          <div className="p-1">
            <label htmlFor="password">Password</label>
            <input
              className="ml-2 rounded-sm"
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
          <div className="mx-auto mt-3 w-max">
            <button className="p-0" type="submit" disabled={loading}>
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
      </div>
    </div>
  );
};

export default LoginScreen;
