"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Home,
  RefreshCw,
  Trophy,
} from "lucide-react";

export default function BookingFailedPage() {
  const [showContent, setShowContent] = useState(false);
  const [showPulse, setShowPulse] = useState(true);



  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 150);

    const pulseTimer = setTimeout(() => {
      setShowPulse(false);
    }, 1200);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf8]">
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-100/30 blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-red-100/20 blur-3xl" />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* ======================================================= */}
        {/* FAILED HERO */}
        {/* ======================================================= */}

        <div
          className={`text-center transition-all duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}>
          {/* Error Icon */}
          <div className="relative mx-auto mb-8 h-32 w-32">
            {/* Pulse */}
            {showPulse && (
              <div className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />
            )}

            {/* Glow */}
            <div className="absolute -inset-5 rounded-full bg-red-400/10 blur-2xl" />

            {/* Main circle */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl shadow-red-500/20">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <AlertCircle
                  className="h-14 w-14 animate-error-icon text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Small trophy */}
            <div className="absolute -right-5 -top-2 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-white bg-white shadow-xl">
              <Trophy className="h-6 w-6 text-slate-400" />
            </div>
          </div>

          {/* Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
            <AlertCircle className="h-4 w-4" />
            Booking Not Completed
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Something Went Wrong
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            We couldn&apos;t complete your booking. Your payment may not have
            gone through, or the booking process was interrupted.
          </p>
        </div>

        {/* ======================================================= */}
        {/* ERROR MESSAGE */}
        {/* ======================================================= */}

        <div
          className={`mx-auto mt-10 max-w-2xl transition-all delay-150 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}>
          <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold text-slate-900">
                Don&apos;t worry — no booking has been confirmed.
              </p>

              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                If money was deducted from your account, please allow a few
                minutes for the payment provider to process the transaction. You
                can also contact support with your reference number below.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* REFERENCE */}
        {/* ======================================================= */}

        <div
          className={`mx-auto mt-6 max-w-2xl transition-all delay-200 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}></div>
        <div
          className={`mx-auto mt-8 max-w-2xl transition-all delay-500 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}>
          <div className="rounded-[28px] border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <RefreshCw className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Ready to try again?
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  You can return to the booking page and select an available
                  slot. Your previous attempt has not reserved the slot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* ACTIONS */}
        {/* ======================================================= */}

        <div
          className={`mt-10 flex flex-col justify-center gap-3 transition-all delay-700 duration-700 sm:flex-row ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}>
          <Link
            href="/booking"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-4 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl">
            <RefreshCw className="h-5 w-5" />
            Try Again
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl">
            <Home className="h-5 w-5" />
            Back Home
          </Link>
        </div>

        {/* ======================================================= */}
        {/* SUPPORT */}
        {/* ======================================================= */}

        <div
          className={`mt-12 text-center transition-opacity delay-1000 duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}>
          <p className="text-sm text-slate-400">Still having trouble?</p>

          <p className="mt-1 text-sm text-slate-500">
            Contact Maksports Arena support and provide your transaction
            reference.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ANIMATIONS */}
      {/* ========================================================= */}

      <style jsx>{`
        @keyframes error-icon {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }

          60% {
            transform: scale(1.12);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-error-icon {
          animation: error-icon 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-error-icon,
          .animate-ping,
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

