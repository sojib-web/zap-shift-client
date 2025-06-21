/* eslint-disable no-irregular-whitespace */
// @ts-nocheck
import React from "react";
import Marquee from "react-fast-marquee";

// Import your logos
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start-people 1.png";
import logo7 from "../../assets/brands/start.png";

const LogoMarquee = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold text-[#03373D] mb-6">
        We've helped thousands of sales teams
      </h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-10 mt-10 flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="h-5 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default LogoMarquee;
