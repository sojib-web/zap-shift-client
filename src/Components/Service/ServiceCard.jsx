// @ts-nocheck
import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div
      className={`group rounded-xl p-10 h-full shadow-md text-center bg-white text-gray-800 transition-all duration-300 hover:bg-lime-300 hover:text-[#03373D] hover:font-semibold`}
    >
      {/* Gradient background circle for icon */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[rgb(238,237,252)] to-[rgba(238,237,252,0)] flex items-center justify-center">
        <img
          src={service.icon}
          alt="Service Icon"
          className="w-7 h-7 object-contain"
        />
      </div>

      <h3 className="text-md font-semibold mb-2">{service.title}</h3>
      <p className="text-sm">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
