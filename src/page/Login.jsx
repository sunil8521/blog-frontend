import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {setUser,unsetUser} from "../redux/reducer/auth"
import toast from "react-hot-toast";
import {server} from "../constants"
import axios from "axios"
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosConfig = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const dispatch = useDispatch();
  const onSubmit = async(data) => {
    console.log(data)
    const toastId = toast.loading("Logging in...");

    try {
      await axios.post(
        `${server}/api/user/login`,
       data,
        axiosConfig
      );
      const { data: userData } = await axios.get(`${server}/api/user`, { withCredentials: true });
      dispatch(setUser(userData.data));

      toast.dismiss(toastId);
      toast.success("Login successful!");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Could not login.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-medium text-center text-gray-900">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-gray-200"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-gray-200"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-32 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm bg-black text-white hover:bg-gray-800 focus:outline-none"
          >
            Continue With Google
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          {"Don't have an account?"}{" "}
          <Link to="/signup" className="underline text-gray-900">
            Join us today
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
