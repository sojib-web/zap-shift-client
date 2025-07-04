import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserClock } from "react-icons/fa";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    data: pendingRiders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: () => axiosSecure.get("/riders/pending").then((res) => res.data),
  });

  const handleAction = async (type, id) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${type} this rider?`,
      icon: type === "approve" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: type === "approve" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${type}`,
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      if (type === "approve") {
        await axiosSecure.patch(`/riders/approve/${id}`);
      } else {
        await axiosSecure.delete(`/riders/${id}`);
      }
      toast.success(`Rider ${type}d`);
      refetch();
    } catch {
      toast.error(`Failed to ${type} rider`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-green-600 text-2xl"></span>
      </div>
    );

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 flex items-center gap-3">
        <FaUserClock className="text-3xl text-green-700" />
        <h2 className="text-3xl font-bold text-green-800">Pending Riders</h2>
      </div>

      {pendingRiders.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
          No pending applications found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-green-100">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-green-600 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Region</th>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Applied At</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRiders.map((r, i) => (
                <tr
                  key={r._id}
                  className="odd:bg-green-50 even:bg-white hover:bg-green-100"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{r.name}</td>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4">{r.phone}</td>
                  <td className="px-6 py-4">{r.region}</td>
                  <td className="px-6 py-4">{r.district}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {moment(r.createdAt).format("YYYY-MM-DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => {
                        Swal.fire({
                          title: `<strong>Rider Application</strong>`,
                          html: `
                            <div style="text-align: left;">
                              <p><strong>Name:</strong> ${r.name}</p>
                              <p><strong>Email:</strong> ${r.email}</p>
                              <p><strong>Phone:</strong> ${r.phone}</p>
                              <p><strong>Region:</strong> ${r.region}</p>
                              <p><strong>District:</strong> ${r.district}</p>
                              <p><strong>Age:</strong> ${r.age}</p>
                              <p><strong>Bike Brand:</strong> ${r.bikeBrand}</p>
                              <p><strong>Bike Reg:</strong> ${r.bikeNumber}</p>
                              <p><strong>NID:</strong> ${r.nid}</p>
                              <p><strong>Applied At:</strong> ${moment(
                                r.createdAt
                              ).format("YYYY-MM-DD hh:mm A")}</p>
                            </div>
                          `,
                          showCloseButton: true,
                          confirmButtonText: "Close",
                          customClass: {
                            popup: "text-left",
                          },
                        });
                      }}
                    >
                      Review
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      onClick={() => handleAction("approve", r._id)}
                      disabled={loading}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => handleAction("reject", r._id)}
                      disabled={loading}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
