import { currencyConverter } from "@/app/lib/utils/utils";
import { Ellipsis } from "lucide-react";

export function RecentBookings({ className }: { className?: string }) {
  const bookings = [
    {
      bookingId: "BK-20260801",
      team: "Kampala United",
      date: "2026-08-03",
      timeSlot: "08:00 AM - 10:00 AM",
      status: "Confirmed",
      amount: 120000,
    },
    {
      bookingId: "BK-20260802",
      team: "Mak Lions",
      date: "2026-08-03",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "Pending",
      amount: 120000,
    },
    {
      bookingId: "BK-20260803",
      team: "City Strikers",
      date: "2026-08-04",
      timeSlot: "12:00 PM - 02:00 PM",
      status: "Paid",
      amount: 150000,
    },
    {
      bookingId: "BK-20260804",
      team: "Thunder FC",
      date: "2026-08-04",
      timeSlot: "02:00 PM - 04:00 PM",
      status: "Cancelled",
      amount: 150000,
    },
    {
      bookingId: "BK-20260805",
      team: "Elite Warriors",
      date: "2026-08-05",
      timeSlot: "04:00 PM - 06:00 PM",
      status: "Confirmed",
      amount: 180000,
    },
    {
      bookingId: "BK-20260806",
      team: "Green Stars",
      date: "2026-08-05",
      timeSlot: "06:00 PM - 08:00 PM",
      status: "Paid",
      amount: 180000,
    },
    {
      bookingId: "BK-20260807",
      team: "Victory SC",
      date: "2026-08-06",
      timeSlot: "08:00 AM - 10:00 AM",
      status: "Pending",
      amount: 120000,
    },
    {
      bookingId: "BK-20260808",
      team: "Rangers FC",
      date: "2026-08-06",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "Confirmed",
      amount: 120000,
    },
    {
      bookingId: "BK-20260809",
      team: "Blue Eagles",
      date: "2026-08-07",
      timeSlot: "04:00 PM - 06:00 PM",
      status: "Paid",
      amount: 180000,
    },
    {
      bookingId: "BK-20260810",
      team: "Legends FC",
      date: "2026-08-07",
      timeSlot: "06:00 PM - 08:00 PM",
      status: "Confirmed",
      amount: 180000,
    },
  ];
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
            {bookings.slice(0, 5).map((booking) => (
              <tr
                key={booking.bookingId}
                className="py-4 text-[13px] font-medium border-b border-slate-100">
                <td className="py-2">{booking.bookingId}</td>
                <td>{booking.team}</td>
                <td>{booking.date}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.status}</td>
                <td>{currencyConverter(Number(booking.amount))}</td>
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
