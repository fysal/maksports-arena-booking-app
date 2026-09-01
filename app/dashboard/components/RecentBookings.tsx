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

        return bTime - aTime; // Newest first
      })
      .slice(0, 5);
  }, [bookings]);

  return (
    <div className={className}>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="widget-label">Recent Bookings</h3>

          <Link
            href="/dashboard/bookings"
            className="text-slate-600 text-xs border border-slate-200 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white ">
            View All
          </Link>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              {["Team", "Match Day", "Time Slot", "Status", "Amount", "Action"].map(
                (head: string, idx: number) => (
                  <th className="pb-2" key={idx}>
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {sortedBookings?.map((booking) => (
              <tr
                key={booking?.bookingId}
                className="py-4 text-[13px] font-medium border-b border-slate-100">
                {/* <td className="py-2">{booking?.bookingId}</td> */}
                <td className="py-2 capitalize">{booking?.teamName}</td>
                <td>{new Date(booking?.date).toLocaleDateString()}</td>
                <td>
                  {booking?.startTime} - {booking.endTime}
                </td>
                <td>
                  <StatusBadge status={booking?.status} />
                </td>
                <td>{currencyConverter(Number(booking?.fee))}</td>
                <td align="center">
                  <Ellipsis size={13} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
