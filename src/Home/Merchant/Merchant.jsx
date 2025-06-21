// @ts-nocheck
import React from "react";
import Image from "../../assets/location-merchant.png";
import bgImage from "../../assets/be-a-merchant-bg.png";

const Merchant = () => {
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className=" rounded-3xl p-10 mb-10 shadow-2xl mt-10"
      style={{
        backgroundColor: "rgb(3, 55, 61)",
        backgroundImage: `url(${bgImage})`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse p-10">
        <img src={Image} alt="Merchant" className="max-w-sm rounded-lg" />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-gray-50">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex gap-3">
            <button
              className="btn text-black rounded-full"
              style={{ backgroundColor: "rgb(202, 235, 102)" }}
            >
              Become a Merchant
            </button>

            <button
              className="btn btn-outline rounded-full hover:bg-transparent hover:border-[rgb(202,235,102)] hover:text-[rgb(202,235,102)]"
              style={{
                borderColor: "rgb(202, 235, 102)",
                color: "rgb(202, 235, 102)",
              }}
            >
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
