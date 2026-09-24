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
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] ?? "bg-slate-100 text-slate-600"
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
        const searchValue = search.toLowerCase();

        const matchesSearch =
          booking.teamName?.toLowerCase().includes(searchValue) ||
          booking.contactInformation.name?.toLowerCase().includes(searchValue);

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

        return bTime - aTime;
      });
  }, [search, status, bookings]);

  const openDrawer = (booking: BookingType) => {
    setBookingInEdit(booking);
  };

  const closeDrawer = (): void => {
    if (toggleRef.current) {
      toggleRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (toggleRef.current !== null) {
      toggleRef.current.checked = !toggleRef.current.checked;
    }
  }, [bookingInEdit?.bookingId]);

  return (
    <div className="drawer drawer-end w-full max-w-full overflow-x-hidden">
      <input
        id="editing-drawer"
        ref={toggleRef}
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Main Content */}
      <div className="drawer-content min-w-0 max-w-full space-y-6 overflow-x-hidden">
        {/* Header */}
        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>

            <p className="mt-1 text-slate-500">
              Manage arena reservations and payments.
            </p>
          </div>

          <button className="w-fit shrink-0 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600">
            Create Booking
          </button>
        </div>

        {/* Stats */}
        <div className="grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
        <div className="w-full min-w-0 max-w-full rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookings..."
                className="h-12 w-full min-w-0 rounded-lg border border-slate-200 pl-11 pr-4 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 shrink-0 rounded-lg border border-slate-200 px-4 text-sm capitalize outline-none focus:border-green-500">
              <option value="all">All Statuses</option>

              {["confirmed", "paid", "pending", "failed", "canceled"].map(
                (option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ),
              )}
            </select>

            {/* More Filters */}
            <button className="flex h-12 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-5 text-sm transition hover:bg-slate-50">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
          {/* 
            IMPORTANT:
            This is the ONLY element that should scroll horizontally.
          */}
          <div className="w-full min-w-0 max-w-full overflow-x-auto">
            <table className="min-w-[1100px] w-full border-collapse">
              <thead>
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
                      key={idx}
                      className={`whitespace-nowrap px-4 py-4 sm:px-6 ${
                        idx === 0 || idx === 8 ? "text-center" : ""
                      }`}>
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
                    {/* Number */}
                    <td className="whitespace-nowrap px-4 py-3 text-center font-medium text-slate-600 sm:px-6">
                      {idx + 1}
                    </td>

                    {/* Team */}
                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      {booking.teamName}
                    </td>

                    {/* Captain */}
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {booking?.contactInformation?.name}
                    </td>

                    {/* Match Day */}
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>

                    {/* Time Slot */}
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {booking.startTime} - {booking.endTime}
                    </td>

                    {/* Amount */}
                    <td className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                      UGX {booking.fee.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      <StatusBadge status={booking?.status?.toString()} />
                    </td>

                    {/* Created At */}
                    <td className="whitespace-nowrap px-4 py-3 capitalize sm:px-6">
                      {(booking.createdAt instanceof Timestamp
                        ? booking.createdAt.toDate()
                        : new Date(booking.createdAt!)
                      ).toLocaleDateString()}
                    </td>

                    {/* Actions */}
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

        {/* Empty State */}
        {filteredBookings?.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <CalendarDays className="text-slate-400" size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No bookings found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Edit Booking Drawer */}
      {bookingInEdit?.bookingId && (
        <Drawer
          Component={
            <EditBookingForm
              booking={bookingInEdit}
              closeDrawer={closeDrawer}
            />
          }
        />
      )}
    </div>
  );
}
