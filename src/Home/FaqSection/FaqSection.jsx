/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, it's designed to be adjustable and suitable for most body types.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Consistent use has shown improvement in both posture and pain relief.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer: "Yes, some models include vibration reminders to correct posture.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You’ll receive an email or push notification depending on your settings.",
  },
];

const FaqSection = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section className="bg-[#F3F5F7] py-16 px-4">
      <div className="  text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 mb-10 text-sm md:text-base">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div className="space-y-3 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className={`border rounded-md transition duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#E7F4F3] border-[#A3D101]"
                    : "bg-white border-white"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium text-sm md:text-base"
                >
                  {faq.question}
                  {isOpen ? (
                    <FaChevronUp className="text-[#A3D101]" />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 text-sm text-gray-600 overflow-hidden"
                    >
                      <div className="py-3">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <button className="bg-[#A3D101] text-black px-6 py-2 rounded-md font-semibold text-sm inline-flex items-center gap-2 hover:bg-lime-500 transition">
            See More FAQ’s <FaArrowRight className="text-black text-xs" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
