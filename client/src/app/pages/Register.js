import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [successful, setSuccessful] = useState("");
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "The name must be at least 3 characters")
        .max(20, "The name must be at most 20 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must be at most 40 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      AuthService.register(values.name, values.email, values.password)
        .then((response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          navigate("/login");
        })
        .catch((error) => {
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "An error occurred during registration.";
          setMessage(errorMessage);
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="mt-36">
      <div className="p-5 m-auto text-center bg-gray-400 h-96 w-96 rounded-xl">
        <h2 className="mt-8 text-2xl font-bold text-black ">
          Sign Up
        </h2>

        <form onSubmit={formik.handleSubmit} className="w-full pb-5">
          {!successful && (
            <div className="p-3 text-center">
              <div className="p-1">
                <input
                  className="w-full p-2 my-3 font-medium rounded-sm placeholder:text-gray-500 placeholder:pl-2"
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="ml-4">{formik.errors.name}</div>
                )}
              </div>

              {/* email input */}
              <div className="p-1">
                <input
                  className="w-full p-2 my-3 font-medium rounded-sm placeholder:text-gray-500 placeholder:pl-2"
                  placeholder="Email"
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="ml-2">{formik.errors.email}</div>
                )}
              </div>

              {/* Password Input */}
              <div className="p-1">
                <input
                  className="w-full p-2 my-3 font-medium rounded-sm placeholder:text-gray-500 placeholder:pl-2"
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password &&
                  formik.errors.password && (
                    <div className="ml-9">
                      {formik.errors.password}
                    </div>
                  )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="w-full mt-1 bg-[#007bff] text-gray-50 border-0"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          {message && <div role="alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
