import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import ProFastLogo from "../ProFastLogo/ProFastLogo";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo and Description */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="">
              <ProFastLogo textColor="text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-600 my-6"></div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Coverage</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-600 my-6"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          <a
            href="#"
            className="text-blue-500 text-xl hover:scale-110 transition"
          >
            <FaLinkedinIn />
          </a>
          <a href="#" className="text-white text-xl hover:scale-110 transition">
            <FaXTwitter />
          </a>
          <a
            href="#"
            className="text-blue-600 text-xl hover:scale-110 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="text-red-600 text-xl hover:scale-110 transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
