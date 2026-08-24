"use client";
import { BookingsContext, UserContext } from "@/app/lib/context";
import AdminHelper from "@/app/lib/firebase/admin_helper_functions";
import { currencyConverter } from "@/app/lib/utils/utils";
import { Ellipsis } from "lucide-react";
import { useContext, useEffect } from "react";

export function RecentBookings({ className }: { className?: string }) {
  const { bookings, setBookings } = useContext(BookingsContext);
  const { currentUser } = useContext(UserContext);

  async function fetchBookings() {
    await AdminHelper.fetchAllBooking({
      setBookings,
    });
  }

  useEffect(() => {
    if (!currentUser) return;

    fetchBookings();
  }, [currentUser]);

  console.log(bookings);
  return (
    <div className={className}>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="widget-label">Recent Bookings</h3>

          <button className="text-slate-600 text-xs border border-slate-200 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white ">
            View All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              {[
                "Booking ID",
                "Team",
                "Date",
                "Time Slot",
                "Status",
                "Amount",
                "Action",
              ].map((head: string, idx: number) => (
                <th className="pb-2" key={idx}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings?.slice(0, 5).map((booking) => (
              <tr
                key={booking?.bookingId}
                className="py-4 text-[13px] font-medium border-b border-slate-100">
                <td className="py-2">{booking?.bookingId}</td>
                <td>{booking?.teamName}</td>
                <td>{booking?.date.toString()}</td>
                <td>
                  {booking?.startTime} - {booking.endTime}
                </td>
                <td>{booking?.status}</td>
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
