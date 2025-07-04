// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import riderImage from "../../../assets/agent-pending.png";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RiderApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCentersData = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedRegion = watch("region");

  const uniqueRegions = [
    ...new Set(serviceCentersData.map((item) => item.region.trim())),
  ];

  useEffect(() => {
    if (selectedRegion && serviceCentersData?.length) {
      const districts = serviceCentersData
        .filter(
          (item) =>
            item.region.trim().toLowerCase() ===
            selectedRegion.trim().toLowerCase()
        )
        .map((item) => item.district);
      setFilteredDistricts(districts);
    }
  }, [selectedRegion, serviceCentersData]);

  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Please confirm your application submission.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit",
    });

    if (!confirm.isConfirmed) return;

    const applicationData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    console.log("Submitting application data:", applicationData);
    try {
      setIsSubmitting(true);
      const res = await axiosSecure.post("riders", applicationData);

      if (res.data.insertedId) {
        Swal.fire("Submitted!", "Your application has been sent.", "success");
        toast.success("Application submitted successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Submission Failed",
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full grid grid-cols-1 md:grid-cols-2">
        <div className="bg-green-200 flex items-center justify-center p-8">
          <img src={riderImage} alt="Rider" className="max-w-xs w-full" />
        </div>

        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-green-800 mb-1">
            Join as a Rider
          </h2>
          <p className="text-gray-600 mb-8">
            Fill out the form to apply and start earning.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  placeholder="Your full name"
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  placeholder="Your email"
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  {...register("age", { required: true, min: 18 })}
                  placeholder="e.g. 25"
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    Minimum age is 18
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: true,
                    pattern: /^01[3-9]\d{8}$/,
                    maxLength: 11,
                  })}
                  maxLength={11}
                  placeholder="e.g. 017xxxxxxxx"
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    Enter valid 11-digit phone number
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  NID Number
                </label>
                <input
                  type="text"
                  {...register("nid", {
                    required: true,
                    minLength: 10,
                    maxLength: 17,
                    pattern: /^\d+$/,
                  })}
                  maxLength={17}
                  placeholder="National ID"
                  className="input input-bordered w-full"
                />
                {errors.nid && (
                  <span className="text-red-500 text-sm">
                    Enter valid NID number (10–17 digits)
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Region
                </label>
                <select
                  {...register("region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  District
                </label>
                <select
                  {...register("district", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Bike Brand
                </label>
                <input
                  type="text"
                  {...register("bike_brand", { required: true })}
                  placeholder="e.g. Honda"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Bike Reg. Number
                </label>
                <input
                  type="text"
                  {...register("bike_reg_number", { required: true })}
                  placeholder="e.g. DHA-1234"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="text-right pt-6">
              <button
                type="submit"
                className="btn bg-green-600 text-white hover:bg-green-700 transition px-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RiderApplication;
