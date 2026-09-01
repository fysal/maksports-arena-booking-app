"use client";

import { Wrench, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="flex  items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600">
          <Wrench className="h-9 w-9" />
        </div>

        {/* Badge */}
        <div className="mt-8 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          We&apos;ll be back shortly
        </div>

        {/* Content */}
        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          We&apos;re Under Maintenance
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-500">
          We&apos;re currently making improvements to provide you with a better
          experience. Please check back again shortly.
        </p>

        {/* Status */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          Maintenance in progress
        </div>

        {/* Action */}
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>

        {/* Footer */}
        <p className="mt-12 text-xs text-slate-400">
          © {new Date().getFullYear()} Maksports Arena
        </p>
      </div>
    </main>
  );
}
