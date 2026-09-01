"use client";
import { useContext, useMemo } from "react";
import { BookingsContext } from "@/app/lib/context";
import { cn } from "@/app/lib/utils/utils";
import { BookingStatus, BookingType } from "@/app/types/booking";

const statusColors: Record<BookingStatus, string> = {
  available: "#15803d",
  confirmed: "#15803d",
  completed: "#15803d",
  booked: "#1d4ed8",
  "in progress": "#95B409",
  canceled: "#b45309",
  pending: "#95B409",
};

export const filterTodaysSchedules = (bookings: BookingType[]) => {
  const today = new Date();
  return bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.date);

      return (
        bookingDate.getFullYear() === today.getFullYear() &&
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getDate() === today.getDate()
      );
    })
    .sort(
      (a, b) =>
        Number(a.startTime.split(":")[0]) - Number(b.startTime.split(":")[0]),
    );
};

export function TodaySchedule({ className }: { className?: string }) {
  const { bookings } = useContext(BookingsContext);

  const schedule: BookingType[] = useMemo(
    () => filterTodaysSchedules(bookings),
    [bookings],
  );

  return (
    <div
      className={cn(
        `rounded-xl border border-slate-100 bg-white p-6 shadow-sm`,
        className,
      )}>
      <div className="mb-6 flex justify-between">
        <h3 className="widget-label">Todays Schedule</h3>

        <button className="text-xs text-slate-600">View Full Schedule</button>
      </div>

      <div className="space-y-2">
        {schedule?.length === 0 ? (
          <>No bookings yet!</>
        ) : (
          schedule?.slice(0, 7).map((item) => (
            <div
              key={item.bookingId}
              className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-6">
                <p className="font-medium text-xs">
                  {item?.startTime} - {item?.endTime}
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  {item.teamName}
                </p>
              </div>

              <span
                className="rounded-lg bg-green-100 px-3 py-1 text-[12px] font-medium text-green-700 capitalize"
                style={{
                  backgroundColor: statusColors[item.status] + "10",
                  color: statusColors[item.status],
                }}>
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
