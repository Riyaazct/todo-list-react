import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
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
    <div className="flex justify-center text-center">
      <div className="p-2 border-2 mt-60 h-[300px] flex flex-col justify-center bg-gray-400 border-gray-700">
        <h2 className="text-2xl text-blue-700">Registration</h2>

        <form onSubmit={formik.handleSubmit}>
          {!successful && (
            <div className="p-3 text-center">
              <div className="p-1 w-max">
                <label htmlFor="name">Name</label>
                <input
                  className="ml-8"
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
                <label htmlFor="email">Email</label>
                <input
                  className="ml-9"
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
                <label htmlFor="password">Password</label>
                <input
                  className="ml-2"
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
                  className="p-1 mt-2"
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
