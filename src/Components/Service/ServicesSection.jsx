// @ts-nocheck
import React from "react";
import ServiceCard from "./ServiceCard";
import icon from "../../assets/service.png";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chattogram, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pickup to drop-off.",
    icon,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging and after-sales support.",
    icon,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility, we allow end customers to return or exchange their product with online business merchants.",
    icon,
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#03373D] text-white py-16 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
