"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Cookie,
  Scale,
  Info,
  ExternalLink,
  Mail,
  ChevronRight,
} from "lucide-react";

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-100">
      <header className="border-b border-slate-100 pt-16 pb-12 px-6 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Legal Information
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            Terms of Service, Privacy & Cookie Policies for HikinHigh
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Scale size={24} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Terms of Service
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed">
              Users agree to these terms by accessing the site or booking trips.
              HikinHigh acts as an intermediary for travel services; all
              bookings are final subject to supplier terms.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <ChevronRight
                    size={18}
                    className="text-slate-400 shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">User Accounts</h3>
                    <p className="text-sm text-slate-600">
                      Provide accurate info; keep passwords secure.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ChevronRight
                    size={18}
                    className="text-slate-400 shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">Payments</h3>
                    <p className="text-sm text-slate-600">
                      Processed securely; GST/TCS as applicable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <ChevronRight
                    size={18}
                    className="text-slate-400 shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Intellectual Property
                    </h3>
                    <p className="text-sm text-slate-600">
                      Site content owned by HikinHigh; limited personal use
                      allowed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ChevronRight
                    size={18}
                    className="text-slate-400 shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">Disclaimers</h3>
                    <p className="text-sm text-slate-600">
                      No liability for third-party services or force majeure
                      events.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 font-medium pt-4 border-t border-slate-50">
              Governing law: Courts of New Delhi, Delhi.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg">
              <ShieldCheck size={24} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Privacy Policy
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 space-y-8">
            <p className="text-slate-700">
              We collect personal data to facilitate bookings and improve
              services, in line with the{" "}
              <strong>Digital Personal Data Protection Act 2023</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
                  Information & Usage
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                    <span>
                      <strong>Collected:</strong> Contact details, payment info,
                      travel history, cookies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                    <span>
                      <strong>Usage:</strong> Bookings, emails, analytics;
                      opt-out of marketing anytime.
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
                  Security & Rights
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                    <span>
                      <strong>Security:</strong> Encryption and access controls;
                      data retained 5 years post-trip.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                    <span>
                      <strong>Rights:</strong> Access, correct, delete via{" "}
                      <a
                        href="mailto:privacy@hikinhigh.com"
                        className="text-blue-600 hover:underline"
                      >
                        privacy@hikinhigh.com
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Cookie size={24} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Cookie Policy</h2>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              Uses essential cookies for functionality and analytics (Google
              Analytics); manage preferences in browser settings.
            </p>
          </div>
        </section>

        <div className="pt-12 border-t border-slate-100">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              <strong>Notice:</strong> These policies are for informational
              purposes. It is recommended to have a lawyer review these for your
              specific business setup.
            </p>
          </div>
          <p className="mt-8 text-xs text-slate-400 uppercase tracking-[0.2em] text-center">
            HikinHigh Travels Private Limited
          </p>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
