// @ts-nocheck
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg1 from "../../assets/banner/banner1.png";
import BannerImg2 from "../../assets/banner/banner2.png";
import BannerImg3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className=" mt-4">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={600}
        className="rounded-xl overflow-hidden"
      >
        {/* Slide 1 */}
        <div className="relative">
          <img src={BannerImg1} alt="Banner 1" className="w-full h-auto" />
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img src={BannerImg2} alt="Banner 2" className="w-full h-auto" />
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img src={BannerImg3} alt="Banner 3" className="w-full h-auto" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
