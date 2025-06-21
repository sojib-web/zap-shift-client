import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import ServicesSection from "../Components/Service/ServicesSection";
import LogoMarquee from "./LogoMarquee/LogoMarquee";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import Merchant from "./Merchant/Merchant";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <ServicesSection />
      <LogoMarquee />
      <FeaturesSection />
      <Merchant />
    </div>
  );
};

export default Home;
