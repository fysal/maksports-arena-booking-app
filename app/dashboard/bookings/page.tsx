"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  MoreHorizontal,
  Filter,
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";
import { StatCard } from "../components/StatCards";

const bookings = [
  {
    id: "BK-1024",
    team: "Lions FC",
    captain: "John Doe",
    date: "2026-08-03",
    slot: "08:00 - 09:00",
    amount: 50000,
    status: "Paid",
  },
  {
    id: "BK-1023",
    team: "Tigers FC",
    captain: "Peter James",
    date: "2026-08-03",
    slot: "09:00 - 10:00",
    amount: 50000,
    status: "Pending",
  },
  {
    id: "BK-1022",
    team: "Eagles FC",
    captain: "Brian Musa",
    date: "2026-08-03",
    slot: "10:00 - 11:00",
    amount: 50000,
    status: "Paid",
  },
  {
    id: "BK-1021",
    team: "Sharks FC",
    captain: "Moses K",
    date: "2026-08-02",
    slot: "18:00 - 19:00",
    amount: 50000,
    status: "Cancelled",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Cancelled: "bg-red-100 text-red-700",
    Reserved: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles]
      }`}>
      {status}
    </span>
  );
}

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.team.toLowerCase().includes(search.toLowerCase()) ||
        booking.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all"
          ? true
          : booking.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>

          <p className="mt-1 text-slate-500">
            Manage arena reservations and payments.
          </p>
        </div>

        <button className="rounded-lg text-sm bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-700">
          Create Booking
        </button>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Bookings"
          value="24"
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          title="Pending Payments"
          value="6"
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="Paid Bookings"
          value="18"
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Revenue"
          value="UGX 1.2M"
          icon={<CreditCard size={20} />}
        />
      </div>

      {/* Filters */}

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bookings..."
              className="h-12 w-full rounded-lg border border-slate-200 pl-11 outline-none focus:border-green-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 rounded-lg text-sm border border-slate-200 px-4">
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button className="flex h-12 items-center text-sm gap-2 rounded-lg border border-slate-200 px-5">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm font-medium text-slate-500">
                {[
                  "Booking Id",
                  "Team",
                  "Captain",
                  "Date",
                  "Time Slot",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((t_head: string, idx: number) => (
                  <th className="px-6 py-4 capitalize" key={idx}>
                    {t_head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-slate-100 text-sm hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{booking.id}</td>
                  <td className="px-6 py-2">{booking.team}</td>
                  <td className="px-6 py-2">{booking.captain}</td>
                  <td className="px-6 py-2">{booking.date}</td>
                  <td className="px-6 py-2">{booking.slot}</td>
                  <td className="px-6 py-2 font-medium">
                    UGX {booking.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-2">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex justify-center">
                      <button className="rounded-xl p-2 hover:bg-slate-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
    </div>
  );
}
