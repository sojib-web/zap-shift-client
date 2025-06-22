// @ts-nocheck
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import reviewQuote from "../../assets/reviewQuote.png";

const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by gently aligning your shoulders and spine, helping you maintain better posture and reduce back pain.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "Consistent use of posture correctors can improve spinal health and overall confidence. Highly recommend for desk workers.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    text: "Fantastic product! It helped me correct my slouching within weeks. Great for anyone working long hours.",
  },
  {
    name: "Salma Khatun",
    role: "Wellness Coach",
    text: "Posture Pro brings a daily reminder to sit and stand properly. It's simple, effective, and well-designed.",
  },
];

const TestimonialSlider = () => {
  return (
    <div className="bg-[#F3F5F7] py-16 px-4 flex justify-center">
      <div className="w-full ">
        <Swiper
          modules={[Navigation]}
          loop={true}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  className={`p-6 rounded-xl transition-all duration-300 h-full ${
                    isActive
                      ? "bg-white shadow-lg opacity-100 scale-100"
                      : "bg-white opacity-50 scale-95"
                  }`}
                >
                  <img src={reviewQuote} alt="" />
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    {item.text}
                  </p>
                  <div className="border-t border-gray-200 mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="" />
                    <img src={reviewQuote} alt="" />
                    <div>
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons (below cards) */}
        <div className="flex justify-center gap-4 mt-5">
          <button className="prev-button w-8 h-8 rounded-full bg-white border shadow text-xl flex items-center justify-center hover:bg-gray-100 transition">
            ←
          </button>
          <button className="next-button w-8 h-8 rounded-full bg-[#A3D101] text-white text-xl flex items-center justify-center hover:bg-lime-600 transition">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
