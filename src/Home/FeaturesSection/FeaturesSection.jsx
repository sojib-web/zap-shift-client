// @ts-nocheck
import React from "react";
import image from "../../assets/live-tracking.png";
import image2 from "../../assets/safe-delivery.png";

const services = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: image2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: image2,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-10 px-4">
      {/* Top Divider */}
      <div
        className="w-full h-px border-t border-dashed mb-16"
        style={{ borderColor: "#03373D" }}
      />

      <div className="m space-y-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="card lg:card-side bg-white shadow-md p-6 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {/* Image with top & bottom dashed line */}
            <div className="flex flex-col items-center">
              <div
                className="w-px h-4 border-l border-dashed"
                style={{ borderColor: "#03373D" }}
              />
              <img
                src={service.image}
                alt={service.title}
                className="w-36 h-36 object-contain"
              />
              <div
                className="w-px h-4 border-l border-dashed"
                style={{ borderColor: "#03373D" }}
              />
            </div>

            {/* Vertical divider (centered) */}
            <div className="hidden md:flex items-center justify-center">
              <div
                className="w-px h-24 border-l border-dashed"
                style={{ borderColor: "#03373D" }}
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left flex-1 space-y-2">
              <h2 className="text-lg  font-bold text-[#03373D]">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Divider */}
      <div
        className="w-full h-px border-t border-dashed  mt-20"
        style={{ borderColor: "#03373D" }}
      />
    </section>
  );
};

export default FeaturesSection;
