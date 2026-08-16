"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f7faf8]">
      {/* ========================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-lime-200/20 blur-3xl" />
      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
        <div className="w-full max-w-3xl text-center">
          {/* Status */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Page not found
          </div>

          {/* 404 */}
          <div className="relative mx-auto w-fit">
            <h1 className="select-none text-[clamp(9rem,24vw,16rem)] font-black leading-[0.75] tracking-[-0.09em] text-slate-900">
              404
            </h1>

            {/* Green accent */}
            <div className="absolute bottom-[-14px] left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-green-500" />
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-16 max-w-2xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Looks like this page{" "}
            <span className="text-green-600">missed the goal.</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
            The page you&apos;re looking for doesn&apos;t exist, may have moved,
            or the link might be incorrect. Don&apos;t worry — let&apos;s get
            you back to the pitch.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl">
              <Home className="h-5 w-5" />
              Back Home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-4 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl">
              <CalendarDays className="h-5 w-5" />
              Book a Slot
            </Link>
          </div>

          {/* Helpful links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-slate-400">
            <Link
              href="/"
              className="flex items-center gap-2 transition hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Homepage
            </Link>

            <Link
              href="/booking"
              className="flex items-center gap-2 transition hover:text-slate-900">
              <CalendarDays className="h-4 w-4" />
              Find a slot
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
