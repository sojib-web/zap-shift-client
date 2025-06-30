// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔐 Handle Email/Password Login
  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((res) => {
        console.log("Login success:", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err.message);
      });
  };

  // 🔐 Handle Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log("Google login success:", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err.message);
      });
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
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn w-full bg-[#A3D101] hover:bg-lime-500 border-none text-black"
      >
        Continue
      </button>

      {/* Register link */}
      <p className="text-sm text-gray-600 text-center">
        Don’t have any account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>

      {/* Divider */}
      <div className="divider text-sm text-gray-400">Or</div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm flex items-center justify-center gap-2"
      >
        <FcGoogle className="text-lg" /> Login with Google
      </button>
    </form>
  );
};

export default Login;
