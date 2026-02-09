"use client";

import Link from "next/link";
import { ChevronLeft, Mail, Clock, AlertCircle, FileText } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-100">
      {/* Header */}
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Refund Policy
          </h1>
          <p className="text-slate-500 font-medium">For www.hikinhigh.com</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Compliance & Overview */}
          <section>
            <p className="text-lg leading-relaxed text-slate-700">
              HikinHigh Travels Private Limited processes refunds per this
              policy, compliant with the{" "}
              <strong>Consumer Protection Act 2019</strong>.
            </p>
          </section>

          {/* Request Process */}
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-4 flex items-center gap-2">
              <Mail size={16} /> Submission Process
            </h2>
            <p className="text-slate-700 leading-relaxed">
              All refund requests must be emailed to{" "}
              <a
                href="mailto:bookings@hikinhigh.com"
                className="text-blue-600 font-semibold hover:underline"
              >
                bookings@hikinhigh.com
              </a>
              . The date the email is received determines the eligibility for
              the refund.
            </p>
          </section>

          {/* Non-Refundable Items */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-slate-400" />{" "}
              Non-Refundable Items
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["TCS (20% outbound)", "Visa Fees", "Insurance Premiums"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg text-slate-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Processing Timeline */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-slate-400" /> Processing
              Timelines
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Refunds are issued within <strong>15 working days</strong> after
                supplier confirmation.
              </p>
              <p className="bg-blue-50 border-l-4 border-blue-200 p-4 text-sm">
                <strong>Airlines:</strong> Maximum of 21 days per DGCA
                guidelines.
              </p>
            </div>
          </section>

          {/* Financial Details */}
          <section className="pt-8 border-t border-slate-100">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Bank Charges</h3>
                <p className="text-slate-600 text-sm">
                  Applicable bank charges will be deducted from the final refund
                  amount.
                </p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Refund Method</h3>
                <p className="text-slate-600 text-sm">
                  Vouchers are preferred and remain valid for 1 year from the
                  date of issue.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="max-w-3xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest">
          <FileText size={14} />
          <span>HikinHigh Travels Private Limited</span>
        </div>
      </footer>
    </div>
  );
};

export default RefundPolicy;
