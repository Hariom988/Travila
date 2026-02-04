"use client";

import React, { useState } from "react";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const FAQS = [
  {
    question: "Can I travel without a printout of my ticket?",
    answer:
      "Yes, you can. Showing the SMS from IRCTC or the email confirmation on your mobile phone, along with a valid original ID proof (Aadhaar, Voter ID, etc.), is sufficient for travel.",
  },
  {
    question: "When does Tatkal booking open?",
    answer:
      "Tatkal booking opens at 10:00 AM for AC classes (1A, 2A, 3A, CC, EC) and at 11:00 AM for Non-AC classes (SL, 2S, FC) one day in advance of the actual date of journey.",
  },
  {
    question: "How do I check my PNR status prediction?",
    answer:
      "Enter your 10-digit PNR number in the search widget at the top of this page. We show real-time confirmation probability based on historical booking trends.",
  },
  {
    question: "What is the refund policy for cancelled trains?",
    answer:
      "If the train is marked as cancelled in the PRS system, a full refund is automatically credited to your account within 3-7 working days. No TDR filing is required.",
  },
];

export default function TrainFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-275 mx-auto px-3 md:px-0 mb-20 font-sans">
      <div className="flex items-center gap-2 mb-4 px-1">
        <QuestionMarkCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
          FAQs & Guidelines
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-100 last:border-none"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full cursor-pointer flex items-center justify-between p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <span
                className={`text-sm md:text-base font-semibold ${openIndex === index ? "text-blue-600" : "text-gray-700"}`}
              >
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-4 w-4 md:h-5 md:w-5 text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-blue-500" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="p-4 md:p-5 pt-0 text-xs md:text-sm text-gray-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
