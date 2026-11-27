"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  Trophy,
} from "lucide-react";
import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import { StatCard } from "../components/statcards";
import {
  BookingsContext,
  PitchContext,
  SettingsContext,
} from "@/app/lib/context";
import { BookingStatus } from "@/app/types/booking";
import Drawer from "@/app/components/Drawer";
import AdminBookSlotDrawer from "./components/DrawerSchedular";

function getStatusClasses(status: BookingStatus) {
  switch (status) {
    case "confirmed":
      return "border-green-400 bg-green-50/50 text-green-600";

    case "pending":
      return "border-amber-200 bg-amber-100 text-amber-700";

    case "canceled":
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

  const { bookings } = useContext(BookingsContext);
  const { settings } = useContext(SettingsContext);
  const { pitches } = useContext(PitchContext);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const drawerRef = useRef<HTMLInputElement>(null);

  const timeSlots = useMemo(() => {
    if (
      settings?.operatingHours.openingTime &&
      settings.operatingHours.closingTime
    ) {
      const slotList: string[] = [];

      const start = Number(settings.operatingHours.openingTime.split(":")[0]);
      const end = Number(settings.operatingHours.closingTime.split(":")[0]);

      for (let i = start; i <= end; i++) {
        const t = i < 10 ? "0" + i : i;
        slotList.push(t + ":00");
      }

      return slotList;
    }

    return [];
  }, [settings]);

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

  function canBookOnDate({
    date,
    time,
  }: {
    date: Date;
    time: string;
  }): boolean {
    const now = new Date();

    const [hours, minutes] = time.split(":").map(Number);

    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    return bookingDateTime < now;
  }

  const showDrawer = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  useEffect(() => {
    if (selectedDate && selectedTime && drawerRef.current) {
      drawerRef.current.checked = true;
    }
  }, [selectedDate, selectedTime]);

  const closeDrawer = (): void => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }

    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <>
      {pitches && timeSlots.length > 0 ? (
        <div className="drawer drawer-end min-h-screen !overflow-visible">
          <input
            id="schedule-drawer"
            ref={drawerRef}
            type="checkbox"
            className="drawer-toggle"
          />

          {/* Main Page Content */}
          <div className="drawer-content min-h-screen w-full overflow-visible">
            <div className="space-y-6 pb-8">
              {/* Header */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Schedule Management
                  </h1>

                  <p className="mt-1 text-slate-500">
                    Manage bookings, availability, blocked dates and arena
                    operating hours.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
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

                <StatCard
                  title="Active Teams"
                  value="14"
                  icon={<Users size={20} />}
                />

                <StatCard
                  title="Occupancy"
                  value="82%"
                  icon={<Trophy size={20} />}
                />
              </div>

              {/* Calendar */}
              <div className="rounded-xl border border-slate-200 bg-white">
                {/* Calendar Header */}
                <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
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
                        if (!e.target.value) return;

                        const [year, month] = e.target.value.split("-");

                        setCurrentWeek(
                          startOfWeek(
                            new Date(Number(year), Number(month) - 1, 1),
                            {
                              weekStartsOn: 1,
                            },
                          ),
                        );
                      }}
                    />

                    <button
                      onClick={goToToday}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-50">
                      Today
                    </button>
                  </div>
                </div>

                {/* Calendar Grid - Horizontal Scroll Only */}
                <div className="w-full overflow-x-auto overflow-y-visible">
                  <div
                    className="grid w-max min-w-full"
                    style={{
                      gridTemplateColumns:
                        "120px repeat(7, minmax(180px, 1fr))",
                    }}>
                    {/* Calendar Days Header */}
                    <div className="border-b border-r border-r-slate-200 bg-slate-50 p-4 font-semibold text-slate-500">
                      Slots
                    </div>

                    {weekDates.map((date, idx) => (
                      <div
                        key={idx}
                        className="border-b border-r border-r-slate-200 bg-slate-50 p-4 text-center">
                        <div className="font-semibold text-slate-900">
                          {format(date, "EEE")}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                          {format(date, "dd MMM")}
                        </div>
                      </div>
                    ))}

                    {/* Calendar Time Slots */}
                    {timeSlots.map((time) => (
                      <div key={time} className="contents">
                        {/* Time Label */}
                        <div className="flex items-center justify-start border-b border-r border-r-slate-200 border-b-slate-400 bg-slate-200 p-4 font-semibold text-slate-900">
                          {time}
                        </div>

                        {/* Daily Slots */}
                        {weekDates.map((date) => {
                          const dateKey = format(date, "yyyy-MM-dd");

                          const bookingKey = `${dateKey}-${time}`;

                          const isBookable = canBookOnDate({
                            date,
                            time,
                          });

                          // Get all active bookings for this date and time
                          const slotBookings = bookings.filter((bk) => {
                            const localBookingDate = format(
                              new Date(bk.date),
                              "yyyy-MM-dd",
                            );

                            return (
                              localBookingDate === dateKey &&
                              bk.startTime === time &&
                              ["confirmed", "pending"].includes(
                                bk.status?.toLowerCase(),
                              )
                            );
                          });

                          // Check whether every pitch has a booking
                          const isFullyBooked =
                            pitches.length > 0 &&
                            pitches.every((pitch) =>
                              slotBookings.some(
                                (bk) => bk.pitchId === pitch.id,
                              ),
                            );

                          return (
                            <div
                              key={bookingKey}
                              className="border-b border-r border-r-slate-300 border-b-slate-300 p-2">
                              <div className="space-y-2">
                                {/* Display Existing Bookings */}
                                {slotBookings.map((booking) => {
                                  const pitch = pitches.find(
                                    (p) => p.id === booking.pitch.id,
                                  );

                                  return (
                                    <div
                                      key={`${booking.pitchId}-${booking.startTime}-${booking.teamName}`}
                                      className={`rounded-xl border p-3 ${getStatusClasses(
                                        booking.status,
                                      )}`}>
                                      <div className="font-semibold">
                                        {booking.teamName}
                                      </div>

                                      <div className="mt-1 flex items-center justify-between gap-1 text-xs">
                                        <div>
                                          {booking.startTime} -{" "}
                                          {booking.endTime}
                                        </div>

                                        <div>{booking.duration} mins</div>
                                      </div>

                                      <div className="mt-1 text-xs font-semibold">
                                        {pitch?.name ?? "Unknown pitch"}
                                      </div>

                                      <div className="mt-1 text-xs capitalize">
                                        {booking.status}
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Show Plus Button Only When A Pitch Is Available */}
                                {!isFullyBooked && (
                                  <button
                                    disabled={isBookable}
                                    onClick={() => showDrawer(date, time)}
                                    className="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-slate-300 transition hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50">
                                    +
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Widgets */}
              {/*
                <div className="grid gap-6 xl:grid-cols-3">
                  <ScheduleLegends />
                  <ArenaControls />
                  <BlockArena />
                </div>
              */}
            </div>
          </div>

          {/* Booking Drawer */}
          {selectedDate && (
            <Drawer
              Component={
                <AdminBookSlotDrawer
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  closeDrawer={closeDrawer}
                />
              }
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
