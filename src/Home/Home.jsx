import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import ServicesSection from "../Components/Service/ServicesSection";
import LogoMarquee from "./LogoMarquee/LogoMarquee";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import Merchant from "./Merchant/Merchant";
import CustomersReview from "./CustomersReview/CustomersReview";
import TestimonialSlider from "./TestimonialSlider/TestimonialSlider";
import FaqSection from "./FaqSection/FaqSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <ServicesSection />
      <LogoMarquee />
      <FeaturesSection />
      <Merchant />
      <CustomersReview />
      <TestimonialSlider />
      <FaqSection />
    </div>
  );
};

export default Home;
