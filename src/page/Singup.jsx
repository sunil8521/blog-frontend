import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {setUser,unsetUser} from "../redux/reducer/auth"
import {server} from "../constants"
import axios from "axios"
import toast from "react-hot-toast";

function Signup() {
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data)
    const toastId = toast.loading("Signing up...");

    try {
      await axios.post(`${server}/api/user/signup`,data , {
       withCredentials:true,
       headers: {
        "Content-Type": "application/json",
       },
     });
     const { data: userData } = await axios.get(`${server}/api/user`, { withCredentials: true });
     dispatch(setUser(userData.data));
     toast.dismiss(toastId);
     toast.success("SignUp successful!");
   } catch (err) {
       toast.dismiss(toastId);
     toast.error(err?.response?.data?.message || "Somthing Went Wrong");
   }   
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-medium text-center text-gray-900">
          Join Us Today
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName ? "focus:ring-red-500" : "focus:ring-gray-200"
                }`}
                {...register("fullName", {
                  required: "Full Name is required",
                  minLength: {
                    value: 3,
                    message: "Full Name must be at least 3 characters long",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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
                    message: "Password must be at least 6 characters long",
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

          {/* Sign-Up Button */}
          <button
          
            type="submit"
            className="w-32 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Google Sign-Up Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm bg-black text-white hover:bg-gray-800 focus:outline-none"
          >
            <img src="/google.svg" alt="Google logo" className="h-5 w-5 mr-2" />
            Continue With Google
          </button>
        </form>

        {/* Sign-In Link */}
        <p className="text-center text-gray-600">
          Already a member?{" "}
          <Link to="/login" className="underline text-gray-900">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
