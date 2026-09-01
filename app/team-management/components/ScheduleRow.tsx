"use client";
import { Clock3, MapPin, Minus, Plus } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { BookingType } from "@/app/types/booking";
import { useState } from "react";

export default function ScheduleRow({ booking }: { booking: BookingType }) {
  const details = {
    "Booking id": booking.bookingId,
    fee: booking.fee.toLocaleString() + " UGX",
    players: booking.number_of_players,
    "Match Day": new Date(booking?.date).toDateString(),
  };
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div>
      <div className="group flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-950 text-white">
          <span className="text-[10px] font-bold uppercase text-green-400">
            {new Date(booking.date).toLocaleString("en-us", { month: "short" })}
          </span>

          <span className="text-xl font-black">
            {" "}
            {new Date(booking.date).toLocaleString("en-us", { day: "2-digit" })}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-slate-900">
              {" "}
              {new Date(booking.date).toLocaleString("en-us", {
                day: "2-digit",
              })}
            </h3>

            <StatusBadge status={booking.status} />
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {booking.startTime} — {booking.endTime}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Mak Sports Arena
            </span>

            <span>{booking.duration} mins</span>
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
          onClick={() => setShowDetails((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-white hover:text-slate-900 cursor-pointer">
          {!showDetails ? (
            <Plus className="h-5 w-5" />
          ) : (
            <Minus className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`
  overflow-hidden 
  transition-all duration-300 ease-in-out
  ${
    showDetails
      ? "max-h-[600px] opacity-100 mt-3  bg-slate-100 p-5 "
      : "max-h-0 opacity-0 mt-0 border-transparent p-0 shadow-none"
  }
`}>
        <h3 className="font-bold text-slate-600 text-lg mb-2">Details</h3>
        <div>
          {(Object.keys(details) as (keyof typeof details)[]).map((key) => (
            <div
              key={key}
              className="grid grid-cols-4 py-2 border-b border-slate-200">
              <div className="capitalize font-medium">{key}:</div>
              <div className="font-medium">{details[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
