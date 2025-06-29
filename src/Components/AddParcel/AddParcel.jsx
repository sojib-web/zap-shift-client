import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const { user } = useAuth();

  const type = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistricts = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  // ──────────────── COST CALCULATION ────────────────
  const calculateCost = (data) => {
    const weight = Number(data.weight || 0);
    const outside = data.sender_region !== data.receiver_region;

    if (data.type === "document") return outside ? 80 : 60;

    if (data.type === "non-document") {
      if (weight <= 3) return outside ? 150 : 110;
      const extra = (weight - 3) * 40;
      const base = outside ? 150 : 110;
      return base + extra;
    }

    return 0;
  };

  // ──────────────── TRACKING ID GENERATOR ────────────────
  const generateTrackingId = () => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `TRK-${randomPart}${timestamp}`;
  };

  // ──────────────── FORM SUBMIT ────────────────
  const onSubmit = (data) => {
    const cost = calculateCost(data);
    const isOutside = data.sender_region !== data.receiver_region;
    const isDoc = data.type === "document";
    const weight = Number(data.weight || 0);
    const trackingId = generateTrackingId();

    let breakdownHTML = "";

    if (isDoc) {
      breakdownHTML = `
        <ul class="text-left space-y-1">
          <li><strong>Type:</strong> Document</li>
          <li><strong>Delivery:</strong> ${
            isOutside
              ? "Inter-district (Different region)"
              : "Intra-district (Same region)"
          }</li>
          <li><strong>Base Price:</strong> ৳ ${isOutside ? 80 : 60}</li>
        </ul>
      `;
    } else {
      const base = isOutside ? 150 : 110;
      const extraWeight = weight > 3 ? weight - 3 : 0;
      const extraCharge = extraWeight * 40;

      breakdownHTML = `
        <ul class="text-left space-y-1">
          <li><strong>Type:</strong> Non-Document</li>
          <li><strong>Weight:</strong> ${weight} kg</li>
          <li><strong>Delivery:</strong> ${
            isOutside
              ? "Inter-district (Different region)"
              : "Intra-district (Same region)"
          }</li>
          <li><strong>Base Price (up to 3kg):</strong> ৳ ${base}</li>
          ${
            extraWeight > 0
              ? `<li><strong>Extra Weight:</strong> ${extraWeight} kg × 40 = ৳ ${extraCharge}</li>`
              : ""
          }
        </ul>
      `;
    }

    const parcelData = {
      ...data,
      cost,
      tracking_id: trackingId,
      created_by: user.email,
      payment_status: "unpaid",
      delivery_status: "pending",
      creation_date: new Date().toISOString(),
    };

    Swal.fire({
      title: "Confirm Delivery Cost",
      html: `
        ${breakdownHTML}
        <div class="mt-4 text-lg font-bold text-green-600 border-t pt-3">
          Total Cost: ৳ ${cost}
        </div>
        <div class="text-sm text-blue-600 mt-2">
          Tracking ID: <strong>${trackingId}</strong>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Back to Edit",
      customClass: {
        popup: "rounded-xl",
        htmlContainer: "text-sm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(parcelData);
        console.log(parcelData);
      }
    });
  };

  // ──────────────── SAVE CONFIRMED DATA ────────────────
  const handleConfirm = (parcelData) => {
    console.log("✅ Saved Parcel Info:", parcelData);
    Swal.fire(
      "Saved!",
      `🎉 Parcel info saved. Tracking ID: ${parcelData.tracking_id}`,
      "success"
    );
    reset();
  };

  // ──────────────── FORM JSX ────────────────
  return (
    <div className="mx-auto w-full bg-white p-6 md:p-10 rounded-xl shadow-md my-6">
      <h2 className="text-3xl font-bold mb-2 text-neutral">Add Parcel</h2>
      <p className="mb-6 text-gray-500">
        Enter parcel pickup &amp; delivery info.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* 📦 Parcel Info */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📦 Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            <input
              type="text"
              placeholder="Parcel Title"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />

            {type === "non-document" && (
              <input
                type="number"
                step="0.1"
                placeholder="Weight (kg)"
                {...register("weight", { required: true })}
                className="input input-bordered w-full"
              />
            )}
          </div>
        </section>

        {/* 📤 Sender Info */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📤 Sender Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sender Name"
              {...register("sender_name", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              {...register("sender_contact", { required: true })}
              className="input input-bordered w-full"
            />

            <select
              {...register("sender_region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("sender_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getDistricts(senderRegion).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Pickup Address"
              {...register("sender_address", { required: true })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Pickup Instruction"
              {...register("pickup_instruction", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </section>

        {/* 📥 Receiver Info */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📥 Receiver Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Receiver Name"
              {...register("receiver_name", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              {...register("receiver_contact", { required: true })}
              className="input input-bordered w-full"
            />

            <select
              {...register("receiver_region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("receiver_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getDistricts(receiverRegion).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Delivery Address"
              {...register("receiver_address", { required: true })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Delivery Instruction"
              {...register("delivery_instruction", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </section>

        <button type="submit" className="btn btn-success text-white w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
