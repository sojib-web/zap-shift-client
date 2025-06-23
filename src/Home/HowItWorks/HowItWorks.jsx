// @ts-nocheck
import React from "react";
import { FaTruckPickup, FaMoneyBillWave, FaWarehouse } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md"; // SME / Corporate

const steps = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup />,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <MdBusinessCenter />,
  },
];

const HowItWorks = () => {
  return (
    <section data-aos="zoom-in" className="py-12 px-4">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-[#03373D] mb-10">
          How it Works
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start text-left hover:shadow-lg transition"
            >
              <div className="text-4xl text-[#03373D] mb-4">{step.icon}</div>
              <h3 className="font-semibold text-[#03373D] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
