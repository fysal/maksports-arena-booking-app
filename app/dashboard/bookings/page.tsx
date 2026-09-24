"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Search,
  MoreHorizontal,
  Filter,
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";
import { StatCard } from "../components/statcards";
import { BookingsContext } from "@/app/lib/context";
import { BookingType } from "@/app/types/booking";
import { Timestamp } from "firebase/firestore";
import { filterTodaysSchedules } from "../components/todayschedule";
import Drawer from "@/app/components/Drawer";
import EditBookingForm from "./widget/EditBooking";
import { DashboardHeader } from "../components/dashboardheader";

function StatusBadge({ status }: { status: string }) {
  const styles = {
    paid: "bg-green-100 text-green-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    pending: "bg-amber-100 text-amber-700",
    cancelled: "bg-red-100 text-red-700",
    canceled: "bg-red-100 text-red-700",
    reserved: "bg-blue-100 text-blue-700",
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
  const [bookingInEdit, setBookingInEdit] = useState<BookingType | null>(null);

  const { bookings } = useContext(BookingsContext);

  const toggleRef = useRef<HTMLInputElement>(null);

  const todaysScheduleCount = useMemo(
    () => filterTodaysSchedules(bookings),
    [bookings],
  )?.length;

  const filteredBookings = useMemo(() => {
    return [...bookings]
      .filter((booking) => {
        const matchesSearch =
          booking.teamName?.toLowerCase().includes(search.toLowerCase()) ||
          booking.contactInformation.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          status === "all" ||
          booking.status.toLowerCase() === status.toLowerCase();

        return matchesSearch && matchesStatus;
      })
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
      });
  }, [search, status, bookings]);

  const openDrawer = (booking: BookingType) => {
    setBookingInEdit(booking);
  };

  const closeDrawer = (): void => {
    if (toggleRef.current) toggleRef.current.checked = false;
  };

  useEffect(() => {
    if (toggleRef.current !== null)
      toggleRef.current.checked = !toggleRef.current.checked;
  }, [bookingInEdit?.bookingId]);

  return (
    <div className="drawer drawer-end">
      <input
        id="editing-drawer"
        ref={toggleRef}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="space-y-6 ">
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
            value={todaysScheduleCount}
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Pending Payments"
            value="0"
            icon={<Clock3 size={20} />}
          />

          <StatCard
            title="Paid Bookings"
            value="0"
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
              className="h-12 rounded-lg text-sm border border-slate-200 px-4 capitalize">
              <option value="all">All Statuses</option>
              {["confirmed", "paid", "pending", "failed", "canceled"].map(
                (option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ),
              )}
            </select>

            <button className="flex h-12 items-center text-sm gap-2 rounded-lg border border-slate-200 px-5">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white ">
          <div className="w-full overflow-x-auto rounded-xl">
            <table className="min-w-[1100px] w-full">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm font-medium text-slate-500">
                  {[
                    "#",
                    "Team",
                    "Captain",
                    "Match Day",
                    "Time Slot",
                    "Amount",
                    "Status",
                    "Created at",
                    "Actions",
                  ].map((t_head: string, idx: number) => (
                    <th
                      className={`whitespace-nowrap px-4 py-4 sm:px-6 ${
                        idx === 0 || idx === 8 ? "text-center" : ""
                      }`}
                      key={idx}>
                      {t_head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredBookings?.map((booking: BookingType, idx: number) => (
                  <tr
                    key={booking.bookingId}
                    className="border-b border-slate-100 text-sm transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-center font-medium text-slate-600 sm:px-6">
                      {idx + 1}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      {booking.teamName}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {booking?.contactInformation?.name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {booking.startTime} - {booking.endTime}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                      UGX {booking.fee.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      <StatusBadge status={booking?.status.toString()} />
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      {(booking.createdAt instanceof Timestamp
                        ? booking.createdAt.toDate()
                        : new Date(booking.createdAt!)
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() => openDrawer(booking)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-slate-100">
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
      {bookingInEdit?.bookingId && (
        <Drawer
          Component={
            <EditBookingForm
              booking={bookingInEdit!}
              closeDrawer={closeDrawer}
            />
          }
        />
      )}
    </div>
  );
}
