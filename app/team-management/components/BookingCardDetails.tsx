/* eslint-disable @typescript-eslint/no-explicit-any */
import { printBooking } from "@/app/lib/utils/printBooking";
import { BookingType } from "@/app/types/booking";
import { PrinterCheck } from "lucide-react";
import React from "react";

function BookingCardDetails({
  details,
  booking,
}: {
  details: Record<string, any>;
  booking: BookingType;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex align-center justify-between">
        <h3 className="font-bold text-slate-600 text-lg mb-2">Details</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {(Object.keys(details) as (keyof typeof details)[]).map((key) => (
          <div
            key={key}
            className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-2 sm:items-center">
            <div className="text-sm font-medium capitalize text-slate-500">
              {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
            </div>

            <div className="text-sm font-semibold text-slate-800 sm:text-right break-words">
              {details[key]}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 py-3 border-b border-slate-100">
          <div className="text-sm font-medium capitalize text-slate-500">
            Pitch
          </div>
          <div className="text-sm font-semibold text-slate-800 sm:text-right break-words">
            {booking.pitch.name}
          </div>
        </div>
      </div>
      <button
        onClick={() => printBooking(booking)}
        className="cursor-pointer flex items-center gap-2 rounded-lg mt-3 border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
        <PrinterCheck size={17} />
        Print Receipt
      </button>
    </div>
  );
}

export default BookingCardDetails;
