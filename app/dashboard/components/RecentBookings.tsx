"use client";

import { useContext, useMemo } from "react";
import { BookingsContext } from "@/app/lib/context";
import { currencyConverter } from "@/app/lib/utils/utils";
import StatusBadge from "@/app/team-management/components/StatusBadge";
import { Timestamp } from "firebase/firestore";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

export function RecentBookings({ className }: { className?: string }) {
  const { bookings } = useContext(BookingsContext);

  const sortedBookings = useMemo(() => {
    if (!bookings) return;

    return [...bookings]
      .sort((a, b) => {
        const aTime =
          a.createdAt instanceof Timestamp
            ? a.createdAt.toMillis()
            : new Date(a.createdAt!).getTime();

        const bTime =
          b.createdAt instanceof Timestamp
            ? b.createdAt.toMillis()
            : new Date(b.createdAt!).getTime();

        return bTime - aTime;
      })
      .slice(0, 5);
  }, [bookings]);

  return (
    <div className={`min-w-0 max-w-full ${className ?? ""}`}>
      <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <h3 className="widget-label whitespace-nowrap">Recent Bookings</h3>

          <Link
            href="/dashboard/bookings"
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-800 hover:text-white sm:px-4">
            View All
          </Link>
        </div>

        {/* 
          Only this container is horizontally scrollable.
          The page itself will not overflow.
        */}
        <div className="w-full min-w-0 max-w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                {[
                  "Team",
                  "Match Day",
                  "Time Slot",
                  "Status",
                  "Amount",
                  "Action",
                ].map((head: string, idx: number) => (
                  <th
                    key={idx}
                    className="whitespace-nowrap px-3 pb-3 font-medium first:pl-0 last:pr-0">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedBookings?.map((booking) => (
                <tr
                  key={booking?.bookingId}
                  className="border-b border-slate-100 text-[13px] font-medium transition-colors hover:bg-slate-50">
                  {/* Team */}
                  <td className="whitespace-nowrap py-3 pr-6 capitalize">
                    {booking?.teamName}
                  </td>

                  {/* Match Day */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(booking?.date).toLocaleDateString()}
                  </td>

                  {/* Time Slot */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {booking?.startTime} - {booking?.endTime}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={booking?.status} />
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {currencyConverter(Number(booking?.fee))}
                  </td>

                  {/* Action */}
                  <td className="px-3 py-3 text-center">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                      <Ellipsis size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional empty state */}
        {sortedBookings?.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-500">
            No recent bookings.
          </div>
        )}
      </div>
    </div>
  );
}
