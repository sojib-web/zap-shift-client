import React from "react";
import { Link, NavLink } from "react-router"; // ✅ corrected from "react-router" to "react-router-dom"
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleLogOut = () => {
    signOutUser()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error("Logout error:", error));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="hover:text-[#caeb66] font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="hover:text-[#caeb66] font-medium">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className="hover:text-[#caeb66] font-medium">
          Coverage
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className="hover:text-[#caeb66] font-medium">
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/pricing" className="hover:text-[#caeb66] font-medium">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/rider" className="hover:text-[#caeb66] font-medium">
          Rider Application
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-green-100  max-w-7xl mx-auto  px-4 lg:px-8 py-3 rounded-b-xl">
        <div className="navbar-start ">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <ProFastLogo textColor="text-black" />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">{navItems}</ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-[#caeb66] hover:bg-lime-400 text-black border-none font-semibold px-5"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-[#caeb66] hover:bg-lime-400 text-black border-none font-semibold px-5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn border border-[#caeb66] text-[#caeb66] hover:bg-[#caeb66] hover:text-black font-semibold px-5"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
