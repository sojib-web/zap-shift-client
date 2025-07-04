import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FaUserCheck } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: approvedRiders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["approvedRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved");
      return res.data;
    },
  });

  const handleDeactivate = async (riderId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/status/${riderId}`, {
          status: "inactive",
        });
        if (res.data.modifiedCount > 0) {
          toast.success("Rider deactivated successfully");
          refetch();
        } else {
          toast.error("Failed to update status");
        }
      } catch (err) {
        toast.error("Failed to deactivate rider");
        console.error(err);
      }
    }
  };

  const filteredRiders = approvedRiders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-green-600 text-2xl"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Failed to load active riders: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 flex items-center gap-3">
        <FaUserCheck className="text-3xl text-green-700" />
        <h2 className="text-3xl font-bold text-green-800">Active Riders</h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone, region or district"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {filteredRiders.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
          No approved riders found.
        </p>
      ) : (
        <div className="w-full rounded-xl shadow-xl border border-green-100 bg-white overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">NID</th>
                  <th className="px-4 py-3">Bike Brand</th>
                  <th className="px-4 py-3">Bike Reg. No</th>
                  <th className="px-4 py-3">Joined At</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.map((rider, i) => (
                  <tr
                    key={rider._id}
                    className="odd:bg-green-50 even:bg-white hover:bg-green-100"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{rider.name}</td>
                    <td className="px-4 py-3 max-w-[180px] truncate">
                      {rider.email}
                    </td>
                    <td className="px-4 py-3">{rider.phone}</td>
                    <td className="px-4 py-3">{rider.region}</td>
                    <td className="px-4 py-3">{rider.district}</td>
                    <td className="px-4 py-3">{rider.age}</td>
                    <td className="px-4 py-3 max-w-[120px] truncate">
                      {rider.nid}
                    </td>
                    <td className="px-4 py-3">{rider.bike_brand}</td>
                    <td className="px-4 py-3 max-w-[120px] truncate">
                      {rider.bike_reg_number}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {moment(rider.createdAt).format("YYYY-MM-DD hh:mm A")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          rider.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rider.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeactivate(rider._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
