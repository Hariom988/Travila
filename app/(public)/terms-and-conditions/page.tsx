"use client";

import Link from "next/link";
import { ChevronLeft, Scale, ShieldCheck, Info, Mail } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-100">
      <header className="border-b border-slate-100 pt-16 pb-12 px-6 bg-slate-50/50">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 text-sm font-medium group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-slate-500 font-medium">www.hikinhigh.com</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <section className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-700 leading-relaxed italic">
            Welcome to HikinHigh Travels Private Limited (“HikinHigh,” “we,”
            “us”). These Terms & Conditions govern your use of www.hikinhigh.com
            (the “Site”) and services including hiking tours and adventure
            bookings. By accessing the Site or booking, you agree to these
            terms, compliant with <strong>Indian Contract Act 1872</strong> and{" "}
            <strong>Consumer Protection Act 2019</strong>.
          </p>
        </section>

        <div className="space-y-12">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Scale size={18} className="text-slate-400" /> Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These terms form a binding contract. We may update them; continued
              use constitutes acceptance. Review Cancellation & Refund, Privacy,
              and Safety Policies linked in footer.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-3">
              Eligibility and Accounts
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Must be 18+ years; minors require guardian consent and waiver.
                </span>
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Provide accurate information; maintain password security. We
                  reserve right to suspend accounts for violations.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-3">
              Booking and Payments
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Bookings confirmed via email post-payment; subject to
                  availability and fitness approval.
                </span>
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Payments via secure gateway; GST/TCS applied (20% on foreign
                  packages). No chargebacks except per policy.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-3">
              User Responsibilities
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Declare health/fitness; complete risk waiver pre-trip.
                </span>
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Follow guide instructions; prohibited: alcohol/drugs,
                  unauthorized deviations.
                </span>
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="text-slate-300 font-bold">•</span>
                <span>
                  Personal gear responsibility; damage to equipment incurs
                  charges.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-slate-400" /> Liability and
              Disclaimers
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                HikinHigh not liable for injuries/death from adventure risks,
                weather, or third-party services (airlines/hotels).
                Participation at own risk post-briefing. Force majeure (strikes,
                pandemics) excuses performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                  <p className="text-sm font-bold text-slate-900 mb-1">
                    Insurance
                  </p>
                  <p className="text-sm text-slate-600">
                    We provide ₹5 lakhs coverage; personal travel insurance
                    recommended.
                  </p>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                  <p className="text-sm font-bold text-slate-900 mb-1">
                    Indemnity
                  </p>
                  <p className="text-sm text-slate-600">
                    You agree to hold us harmless from claims arising from your
                    negligence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">
                Intellectual Property
              </h3>
              <p className="text-sm text-slate-600">
                Site content (logos, itineraries, photos) proprietary. Limited
                personal use; no reproduction without permission.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Termination</h3>
              <p className="text-sm text-slate-600">
                We may terminate access for policy breaches without notice. You
                may stop using services anytime.
              </p>
            </div>
          </section>

          <section className="pt-8">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Info size={18} className="text-slate-400" /> Governing Law
            </h3>
            <p className="text-slate-600">
              Delhi, India courts have exclusive jurisdiction. Disputes via
              consumer forums first.
            </p>
          </section>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-6 pb-20">
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Mail size={16} />
            <a href="mailto:support@hikinhigh.com" className="hover:underline">
              support@hikinhigh.com
            </a>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
            Last updated: February 7, 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
