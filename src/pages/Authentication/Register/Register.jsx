// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { auth } from "../../../firebase/firebase_init";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const password = watch("password");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Upload image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    setIsUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      setImageUrl(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle registration
  const onSubmit = async (data) => {
    if (!imageUrl) {
      console.log("Please upload a profile image");
      return;
    }

    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, imageUrl);
      await auth.currentUser.reload();

      const userData = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        createdAt: new Date(),
      };

      await axiosSecure.post("/api/users", userData);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  // Google sign-in
  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google register error:", error.message);
    }
  };

  return (
    <div className="bg-white p-6 space-y-6 max-w-md mx-auto rounded-lg shadow">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-sm text-gray-500 mt-1">Register with Profast</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-10 h-10 mx-auto mt-3 rounded-full object-cover border"
          />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
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

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {isUploading && (
            <p className="text-sm text-blue-500 mt-1">Uploading...</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
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
              validate: (value) =>
                value === password || "Passwords do not match",
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isUploading}
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

        {/* Divider */}
        <div className="divider text-sm text-gray-400">Or</div>

        {/* Google Register */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="btn w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-lg" /> Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
