"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lock,
  Plus,
  Users,
  Trophy,
} from "lucide-react";
import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import { StatCard } from "../components/StatCards";
import ArenaControls from "./components/ArenaControls";
import BlockArena from "./components/BlockArena";
import ScheduleLegends from "./components/ScheduleLegends";

type BookingStatus = "booked" | "reserved" | "blocked";

interface Booking {
  team: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  duration: number;
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const bookings: Record<string, Booking> = {
  "2026-08-04-08:00": {
    team: "Lions FC",
    status: "booked",
    startTime: "08:00",
    endTime: "09:30",
    duration: 90,
  },
  "2026-08-05-10:00": {
    team: "Eagles FC",
    status: "booked",

    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
  },
  "2026-08-06-18:00": {
    team: "Tigers FC",
    status: "reserved",
    startTime: "18:00",
    endTime: "19:00",
    duration: 60,
  },
  "2026-08-07-20:00": {
    team: "Arena Maintenance",
    status: "blocked",
    startTime: "20:00",
    endTime: "21:30",
    duration: 90,
  },
};

function getStatusClasses(status: BookingStatus) {
  switch (status) {
    case "booked":
      return "border-blue-200 bg-blue-100 text-blue-700";

    case "reserved":
      return "border-amber-200 bg-amber-100 text-amber-700";

    case "blocked":
      return "border-red-200 bg-red-100 text-red-700";

    default:
      return "";
  }
}

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  );

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => addDays(currentWeek, index));
  }, [currentWeek]);

  const previousWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  };

  const nextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const goToToday = () => {
    setCurrentWeek(
      startOfWeek(new Date(), {
        weekStartsOn: 1,
      }),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Schedule Management
          </h1>

          <p className="mt-1 text-slate-500">
            Manage bookings, availability, blocked dates and arena operating
            hours.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg text-sm border border-slate-200 bg-white px-4 py-3">
            <Lock size={18} />
            Block Date
          </button>

          <button className="flex items-center gap-2 rounded-lg text-sm bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700">
            <Plus size={18} />
            Create Slot
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Bookings Today"
          value="24"
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          title="Available Slots"
          value="18"
          icon={<Clock3 size={20} />}
        />

        <StatCard title="Active Teams" value="14" icon={<Users size={20} />} />

        <StatCard title="Occupancy" value="82%" icon={<Trophy size={20} />} />
      </div>

      {/* Calendar */}

      <div className="overflow-hidden  rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4   p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={previousWeek}
              className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronLeft size={18} />
            </button>

            <h2 className="min-w-[180px] text-center text-xl font-semibold">
              {format(currentWeek, "MMMM yyyy")}
            </h2>

            <button
              onClick={nextWeek}
              className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="month"
              className="rounded-xl border border-slate-200 px-4 py-2"
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");

                setCurrentWeek(
                  startOfWeek(new Date(Number(year), Number(month) - 1, 1), {
                    weekStartsOn: 1,
                  }),
                );
              }}
            />

            <button
              onClick={goToToday}
              className="rounded-xl border border-slate-200 text-sm px-4 py-2 transition hover:bg-slate-50">
              Today
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <div
            className="grid w-100 2xl:w-full"
            style={{
              gridTemplateColumns: "120px repeat(7, minmax(180px,1fr))",
            }}>
            {/* Header */}

            <div className="border-b border-r  border-r-slate-200 bg-slate-50 p-4 font-semibold text-slate-500">
              Slots
            </div>

            {weekDates.map((date) => (
              <div
                key={date.toISOString()}
                className="border-b  border-r border-r-slate-200  bg-slate-50 p-4 text-center">
                <div className="font-semibold text-slate-900">
                  {format(date, "EEE")}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {format(date, "dd MMM")}
                </div>
              </div>
            ))}

            {/* Calendar Grid */}

            {timeSlots.map((time) => (
              <>
                <div
                  key={time}
                  className="flex items-center justify-start  border-r border-r-slate-200 border-b border-b-slate-400 bg-slate-200 p-4  font-semibold text-slate-900">
                  {time}
                </div>

                {weekDates.map((date) => {
                  const bookingKey = `${format(date, "yyyy-MM-dd")}-${time}`;

                  const booking = bookings[bookingKey];

                  return (
                    <div
                      key={`${bookingKey}`}
                      className="border-r border-r-slate-300 border-b border-b-slate-300 p-2">
                      {booking ? (
                        <div
                          className={`rounded-xl border p-3 ${getStatusClasses(
                            booking.status,
                          )}`}>
                          <div className="font-semibold">{booking.team}</div>
                          <div className="text-xs flex items-center justify-between">
                            <div>
                              {booking.startTime} - {booking.endTime}
                            </div>
                            <div>{booking.duration} mins</div>
                          </div>
                          <div className="mt-1 text-xs capitalize">
                            {booking.status}
                          </div>
                        </div>
                      ) : (
                        <button className="flex h-full min-h-[72px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-slate-300 transition hover:border-green-500 hover:text-green-600">
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Legend */}

        <ScheduleLegends />

        {/* Controls */}

        <ArenaControls />

        {/* Block Arena */}
        <BlockArena />
      </div>
    </div>
  );
}
