// @ts-nocheck
import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
      {/* Logo at top left */}
      <div className="absolute top-6 left-6 z-50">
        <ProFastLogo textColor="text-black" />
      </div>

      {/* Left: Form Section */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 bg-white">
        <div className="w-full max-w-md mx-auto mt-20">
          <Outlet />
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:flex items-center justify-center bg-[#FAFDF0]">
        <img
          src={authImage}
          alt="Delivery Illustration"
          className="w-3/4 max-w-md"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
