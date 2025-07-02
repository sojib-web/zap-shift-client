import React from "react";
import { Link, Outlet } from "react-router";
import { FaHome, FaBox, FaHistory, FaUserEdit, FaSearch } from "react-icons/fa";
import ProFastLogo from "../Shared/ProFastLogo/ProFastLogo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
        </div>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <div className="flex flex-col w-80 h-full bg-base-200">
          {/* Logo Section */}
          <div className="p-4 border-b border-base-300">
            <ProFastLogo />
          </div>

          {/* Sidebar Menu */}
          <ul className="menu flex-1 overflow-y-auto p-4 text-base-content space-y-1">
            <li>
              <Link to="/dashboard">
                <FaHome className="mr-2" />
                Dashboard Home
              </Link>
            </li>

            <li>
              <Link to="/dashboard/parcels">
                <FaBox className="mr-2" />
                My Parcels
              </Link>
            </li>

            <li>
              <Link to="/dashboard/paymentHistory">
                <FaHistory className="mr-2" />
                Payment History
              </Link>
            </li>

            <li>
              <Link to="/dashboard/track">
                <FaSearch className="mr-2" />
                Track a Package
              </Link>
            </li>

            <li>
              <Link to="/dashboard/profile">
                <FaUserEdit className="mr-2" />
                Update Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
