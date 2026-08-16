import { Clock3, MapPin, MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { BookingType } from "@/app/types/booking";

export default function BookingCard({ booking }: { booking: BookingType }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Date */}
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-950 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-green-400">
            {new Date(booking.date).toLocaleString("en-us", {
              month: "short",
            })}
          </span>

          <span className="mt-1 text-3xl font-black leading-none">
            {new Date(booking.date).toLocaleString("en-us", {
              day: "2-digit",
            })}
          </span>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-slate-900">
              {new Date(booking.date).toLocaleString("en-us", {
                day: "2-digit",
              })}
            </h3>

            <StatusBadge status={booking.status} />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {booking.startTime} — {booking.endTime}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {"Mak sports arena"}
            </span>
          </div>
        </div>

        {/* Duration */}
        <div className="hidden text-right sm:block">
          <p className="text-xs text-slate-400">Duration</p>

          <p className="mt-1 font-bold text-slate-900">
            {booking.duration} mins
          </p>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
