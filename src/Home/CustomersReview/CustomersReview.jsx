// @ts-nocheck
import React from "react";
import customerTop from "../../assets/customer-top.png";

const CustomersReview = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <img src={customerTop} alt="Customer Section" className="mx-auto mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold text-[#03373D] mb-4">
        What Our Customers Are Saying
      </h2>
      <p className="text-gray-700 text-base md:text-lg">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
    </div>
  );
};

export default CustomersReview;
