"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const RefundPolicy = () => {
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
              Refund Policy
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              1. Overview of Cancellation
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                At Travila, we strive to ensure that our customers are satisfied
                with their bookings. However, we understand that plans can
                change. This policy outlines the conditions under which refunds
                may be issued for cancellations.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                malesuada. Nulla facilisi. Etiam sit amet lectus quis est
                elementum.
              </p>
            </div>
          </section>
          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              2. Eligibility for Refunds
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Refund eligibility depends on several factors, including the
                type of service booked (Hotel, Flight, Train, or Tour) and the
                timing of the cancellation request.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cancellations made 48 hours prior to the service date.</li>
                <li>
                  Service provider failure to deliver the agreed-upon service.
                </li>
                <li>Duplicate payments or technical billing errors.</li>
                <li>Force majeure events (subject to documentation).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              3. Non-Refundable Items
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Certain fees and service types are strictly non-refundable once
                the booking is confirmed. These include, but are not limited to:
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor. Cras elementum ultrices diam.
                Maecenas ligula massa, varius a, semper congue, euismod non, mi.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              4. Refund Processing Time
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Once a refund is approved, it will be processed through the
                original method of payment. Please note that processing times
                can vary depending on your financial institution.
              </p>
              <p>
                Generally, approved refunds take **5 to 10 business days** to
                reflect in your account. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Pellentesque eu pretium quis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4">
              5. Service Provider Policies
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Please be aware that Travila acts as an intermediary. Many of
                our partner hotels, airlines, and transport providers have their
                own independent refund policies which we are required to follow.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
