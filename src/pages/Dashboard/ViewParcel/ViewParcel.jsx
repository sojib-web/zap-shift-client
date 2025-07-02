// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditParcel = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (parcel) {
      setFormData({ ...parcel });
    }
  }, [parcel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const {
        _id,
        tracking_id,
        created_by,
        creation_date,
        ...updatableFields
      } = formData;
      const res = await axiosSecure.patch(`/parcels/${id}`, updatableFields);
      return res.data;
    },
    onSuccess: () => {
      navigate("/dashboard/parcels");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;
    mutation.mutate();
  };

  if (isLoading || !formData)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        ✏️ Edit Parcel
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="text-gray-700 font-semibold mb-1 block">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Cost */}
        <div>
          <label className="text-gray-700 font-semibold mb-1 block">
            Cost (৳)
          </label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Sender Info */}
        <div className="col-span-2 bg-white rounded-xl p-4 border">
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">
            👤 Sender Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleChange}
              placeholder="Sender Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="sender_contact"
              value={formData.sender_contact}
              onChange={handleChange}
              placeholder="Sender Phone"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="sender_address"
              value={formData.sender_address}
              onChange={handleChange}
              placeholder="Sender Address"
              className="input input-bordered w-full col-span-2"
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="col-span-2 bg-white rounded-xl p-4 border">
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">
            🎯 Receiver Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="receiver_name"
              value={formData.receiver_name}
              onChange={handleChange}
              placeholder="Receiver Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="receiver_contact"
              value={formData.receiver_contact}
              onChange={handleChange}
              placeholder="Receiver Phone"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="receiver_address"
              value={formData.receiver_address}
              onChange={handleChange}
              placeholder="Receiver Address"
              className="input input-bordered w-full col-span-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary px-6"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditParcel;
