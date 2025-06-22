// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-1">Login with Profast</p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full mt-1"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          className="input input-bordered w-full mt-1"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <div className="text-right mt-1">
          <a href="#" className="text-xs text-blue-500 hover:underline">
            Forget Password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn w-full bg-[#A3D101] hover:bg-lime-500 border-none text-black"
      >
        Continue
      </button>

      {/* Register Link */}
      <p className="text-sm text-gray-600 text-center">
        Don’t have any account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>

      {/* Google Login */}
      <div className="divider text-sm text-gray-400">Or</div>
      <button className="btn w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm flex items-center justify-center gap-2">
        <FcGoogle className="text-lg" /> Login with Google
      </button>
    </form>
  );
};

export default Login;
