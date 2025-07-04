import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { FaRegCopy, FaMoneyCheckAlt } from "react-icons/fa";

const LIMIT = 10;

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

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-green-600 text-2xl"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 flex items-center gap-3">
        <FaMoneyCheckAlt className="text-3xl text-green-700" />
        <h2 className="text-3xl font-bold text-green-800">Payment History</h2>
      </div>

      {payments.length === 0 ? (
        <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
          No payment history found.
        </p>
      ) : (
        <div className="w-full rounded-xl shadow-xl border border-green-100 bg-white overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Parcel ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="odd:bg-green-50 even:bg-white hover:bg-green-100"
                  >
                    <td className="px-4 py-3">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {payment.parcelId}
                    </td>
                    <td className="px-4 py-3 max-w-[180px] truncate">
                      {payment.email}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="tooltip tooltip-top"
                          data-tip={payment.transactionId}
                        >
                          <span className="truncate max-w-[130px] inline-block cursor-pointer">
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
                    <td className="px-4 py-3 font-semibold text-green-600">
                      ${(payment.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      {payment.paymentMethod?.[0]}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {moment(
                        payment.paid_at ||
                          payment.paid_at_string ||
                          payment.createdAt
                      ).format("YYYY-MM-DD hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-4 flex-wrap px-4 pb-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
              }`}
            >
              ⬅ Previous
            </button>

            <span className="px-4 py-2 bg-base-200 rounded-md text-base-content font-medium shadow">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
              }`}
            >
              Next ➡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
