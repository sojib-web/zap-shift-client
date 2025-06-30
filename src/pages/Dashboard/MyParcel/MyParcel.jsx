// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcel", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/parcels?email=${user.email}`);
      return response.data;
    },
  });

  // 🟡 Handle Payment with SSLCOMMERZ
  const handlePayNow = async (id) => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The parcel has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the parcel.", "error");
        console.error(error);
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        📦 My Parcels ({parcels.length})
      </h2>

      <table className="table table-zebra w-full bg-white shadow-md rounded-md">
        <thead className="bg-gray-100 text-base">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Cost (৳)</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>
                <div className="max-w-[180px] truncate" title={parcel.title}>
                  {parcel.title}
                </div>
              </td>
              <td className="font-mono">{parcel.tracking_id}</td>
              <td>
                <span
                  className={`badge px-3 py-1 text-white ${
                    parcel.delivery_status === "pending"
                      ? "bg-yellow-500"
                      : parcel.delivery_status === "delivered"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {parcel.delivery_status}
                </span>
              </td>
              <td>৳{parcel.cost}</td>
              <td>
                {moment(parcel.creation_date).format("DD MMM YYYY, h:mm A")}
              </td>
              <td className="flex gap-2 flex-wrap">
                <Link
                  to={`/dashboard/parcels/${parcel._id}`}
                  className="btn btn-sm btn-info text-white"
                >
                  View
                </Link>
                <Link
                  onClick={() => handlePayNow(parcel._id)}
                  className="btn btn-sm text-black"
                  style={{
                    backgroundColor: "rgb(202, 235, 102)",
                  }}
                >
                  Pay Now
                </Link>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcel;
