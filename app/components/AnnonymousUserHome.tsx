import { Trophy, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const AnnonymousUserHome = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-10 ">
          <Trophy size={40} className="mb-5" />

          <h3 className="text-3xl font-black">Register Your Team</h3>

          <p className="mt-3 text-slate-500">
            Start booking arena time and managing your schedule online.
          </p>

          <Link
            href="/auth"
            className="mt-8 inline-flex rounded-lg bg-black px-6 transition hover: hover:-translate-y-0.5  py-4 font-semibold text-white">
            Register Team
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-10 ">
          <Users size={40} className="mb-5" />

          <h3 className="text-3xl font-black">Team Login</h3>

          <p className="mt-3 text-slate-500">
            Access your dashboard and manage bookings.
          </p>

          <Link
            href="/auth"
            className="mt-8 inline-flex rounded-lg transition hover: hover:-translate-y-0.5  border px-6 py-4 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnnonymousUserHome;
