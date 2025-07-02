import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { FaRegCopy } from "react-icons/fa";

const LIMIT = 10; // Number of rows per page

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [copiedId, setCopiedId] = useState(null);
  const [page, setPage] = useState(1);

  const { isPending, data: paymentData = {} } = useQuery({
    queryKey: ["payments", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}&page=${page}&limit=${LIMIT}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const payments = paymentData?.data || [];
  const total = paymentData?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (isPending) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        💳 Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300">
            <table className="table table-zebra w-full text-xs sm:text-sm">
              <thead className="bg-base-200 text-base-content uppercase font-semibold">
                <tr>
                  <th>#</th>
                  <th>Parcel ID</th>
                  <th>Email</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-base-100 transition-all"
                  >
                    <td>{(page - 1) * LIMIT + index + 1}</td>
                    <td className="whitespace-nowrap">{payment.parcelId}</td>
                    <td className="whitespace-nowrap">{payment.email}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="tooltip tooltip-top"
                          data-tip={payment.transactionId}
                        >
                          <span className="truncate max-w-[120px] inline-block cursor-help whitespace-nowrap">
                            {payment.transactionId}
                          </span>
                        </div>
                        <div
                          className="tooltip tooltip-top"
                          data-tip={
                            copiedId === payment.transactionId
                              ? "Copied!"
                              : "Copy"
                          }
                        >
                          <button
                            onClick={() => handleCopy(payment.transactionId)}
                            className="btn btn-xs btn-ghost"
                          >
                            <FaRegCopy className="text-base-content opacity-70 hover:opacity-100" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-green-600">
                      ${(payment.amount / 100).toFixed(2)}
                    </td>
                    <td className="capitalize">{payment.paymentMethod?.[0]}</td>
                    <td>
                      {moment(
                        payment.paid_at ||
                          payment.paid_at_string ||
                          payment.createdAt
                      ).format("LLL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {/* Stylish Pagination Controls */}
          <div className="flex items-center justify-center mt-6 gap-4 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
      ${
        page === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
      }`}
            >
              ⬅ Previous
            </button>

            <span className="px-4 py-2 rounded-lg bg-base-200 text-base-content text-sm font-semibold shadow-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
      ${
        page === totalPages
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
      }`}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
