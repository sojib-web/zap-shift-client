// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log("User registered:", result.user);
        navigate("/"); // ✅ Redirect after success
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        // Optionally use toast for UI feedback
      });
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google register success:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google register error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-sm text-gray-500 mt-1">Register with Profast</p>
      </div>

      {/* Profile Icon */}
      <div className="flex justify-center">
        <FaUserCircle className="text-5xl text-gray-400" />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full mt-1"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full mt-1"
          placeholder="Your email"
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
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="input input-bordered w-full mt-1"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn w-full bg-[#A3D101] hover:bg-lime-500 border-none text-black"
      >
        Continue
      </button>

      {/* Login Link */}
      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>

      {/* Google Button */}
      <div className="divider text-sm text-gray-400">Or</div>
      <button
        type="button"
        onClick={handleGoogleRegister}
        className="btn w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm flex items-center justify-center gap-2"
      >
        <FcGoogle className="text-lg" /> Register with Google
      </button>
    </form>
  );
};

export default Register;
