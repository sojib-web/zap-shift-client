// @ts-nocheck
import React from "react";
import logo from "../../assets/logo.png";

const ProFastLogo = ({ textColor = "text-black" }) => {
  return (
    <div className="flex items-end">
      <img
        src={logo}
        alt="Profast Logo"
        className="w-6 h-6 md:w-8 md:h-8 mb-2 object-contain"
      />
      <h2 className={`text-xl md:text-2xl font-bold -ml-2 ${textColor}`}>
        Profast
      </h2>
    </div>
  );
};

export default ProFastLogo;
