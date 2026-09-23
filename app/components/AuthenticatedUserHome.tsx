import { Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthenticatedUserHome = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 md:px-12 md:py-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
              <Trophy size={24} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Ready for your next game?
            </h3>

            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Find an available time, book your slot, and get your team ready to
              play.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-10 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-500">
              Book a Slot
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticatedUserHome;
