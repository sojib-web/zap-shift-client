// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaBox } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data = { parcels: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcel", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: {
          email: user.email,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
        headers: {
          Authorization: `Bearer ${user?.token || ""}`,
        },
      });
      return res.data;
    },
  });

  const handlePayNow = (id) => navigate(`/dashboard/payment/${id}`);
  const handleViewParcel = (id) => navigate(`/dashboard/parcels/${id}`);

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

  const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-green-600 text-2xl"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 flex items-center gap-3">
        <FaBox className="text-3xl text-green-700" />
        <h2 className="text-3xl font-bold text-green-800">
          My Parcels ({data.total})
        </h2>
      </div>

      {data.parcels.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
          No parcels found.
        </p>
      ) : (
        <div className="w-full rounded-xl shadow-xl border border-green-100 bg-white overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Tracking ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Cost</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id}
                    className="odd:bg-green-50 even:bg-white hover:bg-green-100"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-3 max-w-[180px] truncate">
                      {parcel.title}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {parcel.tracking_id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold text-white capitalize ${
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
                    <td className="px-4 py-3 font-medium">৳{parcel.cost}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {moment(parcel.creation_date).format(
                        "YYYY-MM-DD hh:mm A"
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => handleViewParcel(parcel._id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                        >
                          View
                        </button>
                        {parcel.payment_status === "unpaid" ? (
                          <button
                            onClick={() => handlePayNow(parcel._id)}
                            className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 text-black rounded text-xs"
                          >
                            Pay
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-green-500 text-white rounded text-xs cursor-not-allowed">
                            Paid
                          </span>
                        )}
                        <button
                          onClick={() => handleDelete(parcel._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ⬅ Prev
          </button>
          <span className="px-4 py-2 rounded bg-gray-100 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default MyParcel;
