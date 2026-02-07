"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#374151] font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-gray-100 pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8 text-sm font-semibold group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              1. Introduction
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Welcome to Travila. We are committed to protecting your personal
                information and your right to privacy. If you have any questions
                or concerns about our policy, or our practices with regards to
                your personal information, please contact us.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                We collect personal information that you voluntarily provide to
                us when registering at the Services, expressing an interest in
                obtaining information about us or our products and services.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Name and Contact Data (Email, Phone number, Mailing address)
                </li>
                <li>
                  Credentials (Passwords and similar security information)
                </li>
                <li>
                  Payment Data (Payment instrument number and security code)
                </li>
                <li>Travel preferences and booking history</li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Viverra suspendisse potenti nullam ac tortor vitae purus
                faucibus.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                We use personal information collected via our Services for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                bibendum enim facilisis gravida neque convallis a cras. At
                varius vel pharetra vel turpis nunc eget lorem. Nunc mi ipsum
                faucibus vitae aliquet nec ullamcorper sit. Tellus elementum
                sagittis vitae et leo duis ut diam.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              4. Data Security
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process. However, please also remember
                that we cannot guarantee that the internet itself is 100%
                secure.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
                ut ornare lectus sit amet est placerat in. Non tellus orci ac
                auctor augue mauris augue neque gravida.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
