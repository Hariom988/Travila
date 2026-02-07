"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const TermsAndConditions = () => {
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
              Terms & Conditions
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              1. Agreement to Terms
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                By accessing or using the Travila website and services, you
                agree to be bound by these Terms and Conditions. If you disagree
                with any part of these terms, you may not access our services.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              2. Intellectual Property Rights
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Unless otherwise stated, Travila and/or its licensors own the
                intellectual property rights for all material on Travila. All
                intellectual property rights are reserved.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must not republish material from Travila</li>
                <li>
                  You must not sell, rent or sub-license material from Travila
                </li>
                <li>
                  You must not reproduce, duplicate or copy material from
                  Travila
                </li>
                <li>You must not redistribute content from Travila</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              3. Bookings and Payments
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                When you make a booking through our platform, you are entering
                into a contract with the respective service provider. Travila
                acts as an intermediary between you and the service provider.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vitae diam non enim vestibulum interdum. Proin sodales
                pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
                luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
                sapien nunc eget.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              4. User Accounts
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. Failure to
                do so constitutes a breach of the Terms, which may result in
                immediate termination of your account.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              5. Limitation of Liability
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                In no event shall Travila, nor any of its officers, directors
                and employees, be held liable for anything arising out of or in
                any way connected with your use of this website. Travila shall
                not be held liable for any indirect, consequential or special
                liability arising out of or in any way related to your use of
                this website.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              6. Governing Law
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                These Terms will be governed by and interpreted in accordance
                with the laws of India, and you submit to the non-exclusive
                jurisdiction of the state and federal courts located in New
                Delhi for the resolution of any disputes.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
