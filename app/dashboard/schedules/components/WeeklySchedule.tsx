"use client";

import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const OPENING_HOUR = 8;
const CLOSING_HOUR = 23;
const PIXELS_PER_MINUTE = 1.2;

interface ArenaBooking {
  id: string;
  teamName: string;
  date: string;
  startTime: string;
  duration: number;
  status: "booked" | "reserved" | "blocked";
}

const bookings: ArenaBooking[] = [
  {
    id: "1",
    teamName: "Lions FC",
    date: "2026-08-04",
    startTime: "08:00",
    duration: 60,
    status: "booked",
  },
  {
    id: "2",
    teamName: "Eagles FC",
    date: "2026-08-04",
    startTime: "10:00",
    duration: 90,
    status: "booked",
  },
  {
    id: "3",
    teamName: "Arena Maintenance",
    date: "2026-08-06",
    startTime: "18:00",
    duration: 90,
    status: "blocked",
  },
];

export function WeeklyScheduler() {
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  );

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const hours = Array.from(
    {
      length: CLOSING_HOUR - OPENING_HOUR + 1,
    },
    (_, i) => OPENING_HOUR + i,
  );

  const schedulerHeight =
    (CLOSING_HOUR - OPENING_HOUR) * 60 * PIXELS_PER_MINUTE;

  function getMinutesFromOpening(time: string) {
    const [hour, minute] = time.split(":").map(Number);

    return (hour - OPENING_HOUR) * 60 + minute;
  }

  function getStatusStyles(status: ArenaBooking["status"]) {
    switch (status) {
      case "booked":
        return "bg-blue-500 border-blue-600";

      case "reserved":
        return "bg-amber-500 border-amber-600";

      case "blocked":
        return "bg-red-500 border-red-600";
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekStart(addWeeks(weekStart, -1))}
            className="rounded-xl border p-2">
            <ChevronLeft size={18} />
          </button>

          <h2 className="text-xl font-semibold">
            {format(weekStart, "MMMM yyyy")}
          </h2>

          <button
            onClick={() => setWeekStart(addWeeks(weekStart, 1))}
            className="rounded-xl border p-2">
            <ChevronRight size={18} />
          </button>
        </div>

        <button
          onClick={() =>
            setWeekStart(
              startOfWeek(new Date(), {
                weekStartsOn: 1,
              }),
            )
          }
          className="rounded-xl border px-4 py-2">
          Today
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1400px]">
          <div className="grid grid-cols-8 border-b">
            <div />

            {weekDates.map((date) => (
              <div
                key={date.toISOString()}
                className="border-l p-4 text-center">
                <p className="font-semibold">{format(date, "EEE")}</p>

                <p className="text-sm text-slate-500">
                  {format(date, "dd MMM")}
                </p>
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-8"
            style={{
              height: schedulerHeight,
            }}>
            <div className="relative border-r">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 border-t text-xs text-slate-400"
                  style={{
                    top: (hour - OPENING_HOUR) * 60 * PIXELS_PER_MINUTE,
                  }}>
                  <span className="-translate-y-1/2 absolute left-2 bg-white px-1">
                    {String(hour).padStart(2, "0")}
                    :00
                  </span>
                </div>
              ))}
            </div>

            {weekDates.map((date) => {
              const dateString = format(date, "yyyy-MM-dd");

              const dayBookings = bookings.filter(
                (booking) => booking.date === dateString,
              );

              return (
                <div key={dateString} className="relative border-l">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-t border-slate-100"
                      style={{
                        top: (hour - OPENING_HOUR) * 60 * PIXELS_PER_MINUTE,
                      }}
                    />
                  ))}

                  {dayBookings.map((booking) => {
                    const top =
                      getMinutesFromOpening(booking.startTime) *
                      PIXELS_PER_MINUTE;

                    const height = booking.duration * PIXELS_PER_MINUTE;

                    return (
                      <div
                        key={booking.id}
                        className={`absolute left-1 right-1 overflow-hidden rounded-2xl border p-3 text-white shadow-md ${getStatusStyles(
                          booking.status,
                        )}`}
                        style={{
                          top,
                          height,
                        }}>
                        <p className="font-semibold">{booking.teamName}</p>

                        <p className="mt-1 text-xs opacity-90">
                          {booking.startTime}
                        </p>

                        <p className="text-xs opacity-90">
                          {booking.duration}
                          min
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
