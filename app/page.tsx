"use client";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./components/nav/Navbar";
import HomeStats from "./components/homeStats";
import { useContext } from "react";
import { UserContext } from "./lib/context";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import Footer from "./components/Footer";

export default function HomePage() {
  const { currentUser } = useContext(UserContext);
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_50%)]" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:pt-32 relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                ⚽ Arena Booking Platform
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
                Book Your Team&apos;s
                <span className="block text-green-600">Playing Time</span>
                In Minutes
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Reserve available arena slots, manage team schedules, and avoid
                double bookings through our real-time booking platform.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {!currentUser && (
                  <Link
                    href="/auth?act=register"
                    className="flex items-center gap-2 rounded-lg bg-black px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-900">
                    Register Team
                    <ArrowRight size={18} />
                  </Link>
                )}

                <Link
                  href="/booking"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-green-600 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5   hover:bg-green-900">
                  Book Now
                  <ArrowRight size={18} />
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6">
                <TrustBadge text="Instant Confirmation" />
                <TrustBadge text="Secure Payments" />
                <TrustBadge text="Live Availability" />
              </div>
              <HomeStats />
            </div>

            {/* Hero Card */}
            <div>
              <div className="rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl ">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-bold">Today&apos;s Availability</h3>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    "08:00 - 09:00",
                    "09:00 - 10:00",
                    "10:00 - 11:00",
                    "11:00 - 12:00",
                  ].map((slot, index) => (
                    <div
                      key={slot}
                      className={`flex items-center justify-between rounded-xl border p-4 ${
                        index === 1
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }`}>
                      <span>{slot}</span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          index === 1
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                        {index === 1 ? "Booked" : "Available"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-400">Next Available</p>

                  <p className="mt-1 text-2xl font-bold">Today 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black">Everything You Need</h2>

          <p className="mt-4 text-slate-500">
            Built for teams and arena managers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          
          <FeatureCard
            num={1}
            icon={<CalendarDays size={23} strokeWidth={2.2} />}
            title="Real-Time Booking"
            description="See available arena slots instantly and book without the back-and-forth."
          />
          <FeatureCard
            num={2}
            icon={<Clock3 size={23} strokeWidth={2.2} />}
            title="Instant Scheduling"
            description="Pick your date, choose your time, and secure your pitch in seconds."
          />
          <FeatureCard
            num={3}
            icon={<Users size={23} strokeWidth={2.2} />}
            title="Team Management"
            description="Keep your team details, upcoming games, and booking history in one place."
          />
          <FeatureCard
            num={4}
            icon={<ShieldCheck size={23} strokeWidth={2.2} />}
            title="Always Protected"
            description="Smart booking protection helps prevent conflicts and double bookings."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black">How It Works</h2>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3 md:gap-0">
            
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[40px] hidden h-px bg-gradient-to-r from-green-500/20 via-green-500/60 to-green-500/20 md:block" />
            {/* Animated line */}
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[39px] hidden h-[2px] overflow-hidden md:block">
              
              <div className="h-full w-1/3 animate-step-line bg-gradient-to-r from-transparent via-green-400 to-transparent" />
            </div>
            <StepCard
              number="01"
              title="Register Your Team"
              description="Create your team profile once and keep everything ready for your next game."
              icon={<Users size={22} />}
            />
            <StepCard
              number="02"
              title="Pick Your Slot"
              description="Choose your preferred date and available playing time in real time."
              icon={<CalendarDays size={22} />}
            />
            <StepCard
              number="03"
              title="Confirm & Play"
              description="Secure your booking, receive confirmation, and get your team ready."
              icon={<Trophy size={22} />}
            />
          </div>
        </div>
      </section>

      {/* Register / Login */}
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
      <Footer/>
    </main>
  );
}



function TrustBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
      <CheckCircle2 size={16} className="text-green-600" />
      {text}
    </div>
  );
}
