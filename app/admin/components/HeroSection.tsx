import { CalendarPlus, CalendarDays } from "lucide-react";

export function HeroSection() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-8 text-white">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold">Welcome Back 👋</h2>

        <p className="mt-3 text-green-50">
          Manage bookings, schedules and teams from one centralized dashboard.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-green-700">
            <CalendarPlus size={18} />
            Create Booking
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3">
            <CalendarDays size={18} />
            View Schedule
          </button>
        </div>
      </div>
    </section>
  );
}
