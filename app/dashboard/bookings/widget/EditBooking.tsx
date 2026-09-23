/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingHandler from "@/app/lib/booking_handler";
import { SettingsContext } from "@/app/lib/context";
import { BookingStatus, BookingType, ISlot } from "@/app/types/booking";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  LockKeyhole,
  MessageSquareText,
  Save,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export type IFormDataType = {
  date: Date;
  admin_note?: string;
  status: BookingStatus;
  duration: number;
  startTime: string;
  endTime: string;
};

export default function EditBookingForm({
  booking,
  closeDrawer,
}: {
  booking: BookingType;
  closeDrawer: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];

  const [data, setData] = useState<IFormDataType | any>({});
  const [slots, setSlots] = useState<ISlot[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { settings } = useContext(SettingsContext);

  const bookingStatuses = ["confirmed", "canceled", "completed"];

  async function fetchAvailableSlots(dateString: string) {
    const data = await BookingHandler.fetchAvailableslots({
      openingTime: settings!.operatingHours.openingTime,
      closingTime: settings!.operatingHours.closingTime,
      dateString,
      duration: booking.duration,
    });

    if (data) setSlots(data.slots);
    else setSlots([]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        date: booking?.date,
        duration: booking?.duration,
        status: booking.status,
        startTime: booking.startTime,
        endTime: booking.endTime,
        admin_note: "",
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [booking]);

  async function onHandleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    //Fetch slotes
    if (name === "date") {
      setLoadingSlots(true);
      await fetchAvailableSlots(value);
      setLoadingSlots(false);
    }

    if (name === "slots") {
      const { startTime, endTime } = JSON.parse(value);

      return setData((current: IFormDataType | any) => ({
        ...current,
        startTime,
        endTime,
      }));
    } else
      return setData((current: IFormDataType | any) => ({
        ...current,
        [name]: value,
      }));
  }

  async function onHandleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const res = await BookingHandler.updateBooking(data, booking.bookingId!);
      setMessage(res.message);
      toast.success(res.message);
    } catch (error) {
      if (typeof error === "string") toast.error(error);
      else toast.error("Failed to update booking. Check logs for error");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }

  function closeEditing() {
    setData(null);
    closeDrawer();
    setSlots(null);
    setMessage(null);
  }

  return (
    <>
      {booking && (
        <form
          onSubmit={onHandleSubmit}
          className="flex h-full flex-col bg-white">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Update / Reschedule Booking
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    Reschedule this booking
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={closeEditing}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
              <X size={19} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {message && (
              <div className="flex items-center justify-center gap-3 bg-green-100/90 py-2 mb-3 rounded-xl border border-green-600/20 text-sm text-center">
                <span className="text-xl">👏 </span>
                <span className="text-green-800 font-medium">{message}</span>
              </div>
            )}
            <div className="space-y-6">
              {/* Team */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Team
                  </label>

                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <LockKeyhole size={12} />
                    Locked
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 font-bold text-green-700 capitalize">
                    {booking.teamName.substring(0, 1)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {booking.teamName}
                    </p>

                    <p className="text-xs text-slate-400">
                      Team cannot be changed
                    </p>
                  </div>
                </div>
              </div>

              {/* Reschedule Section */}
              <div className="rounded-3xl border border-green-100 bg-green-50/40 p-5">
                <div className="mb-5">
                  <h3 className="font-semibold text-slate-900">Reschedule</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Select a new date and playing time for this booking.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Date */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        name="date"
                        value={
                          data?.date?.toString()?.split("T")[0] ??
                          booking?.date.toString()?.split("T")[0] ??
                          ""
                        }
                        onChange={onHandleChange}
                        min={today}
                        disabled={isUpdating}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      {" "}
                      <label
                        htmlFor="slots"
                        className="mb-2 block text-sm font-medium text-slate-700">
                        Slots
                      </label>
                      {loadingSlots && (
                        <div className="space-x-2">
                          <span className="loading loading-spinner loading-xs text-green-500"></span>
                          <span className="text-green-600">
                            Loading! Please wait...
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      {" "}
                      <BadgeCheck
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        id="slots"
                        name="slots"
                        disabled={slots === null || isUpdating}
                        onChange={onHandleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 capitalize">
                        <option value="">Select slot</option>
                        {slots?.map((slot, idx: number) => (
                          <option key={idx} value={JSON.stringify(slot)}>
                            {slot.startTime} - {slot.endTime}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Status
                    </label>
                    <div className="relative">
                      {" "}
                      <Clock3
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 capitalize"
                        onChange={onHandleChange}
                        name="status"
                        disabled={isUpdating}
                        defaultValue={booking.status.toLowerCase()}>
                        <option value="">Update booking status</option>
                        {bookingStatuses.map((status: string, idx: number) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Current Booking Summary */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">New session</p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {booking?.startTime} – {booking?.endTime}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Duration</p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {booking?.duration} minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Time slot available
                      </p>

                      <p className="mt-0.5 text-xs text-green-700">
                        No other booking conflicts with this time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Note */}
              <div>
                <label className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-700">
                  <MessageSquareText size={15} />
                  Admin Note
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>

                <textarea
                  rows={4}
                  onChange={onHandleChange}
                  name="admin_note"
                  disabled={isUpdating}
                  placeholder="Add a reason for rescheduling or an internal note..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white px-6 py-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeEditing}
                disabled={isUpdating}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
                <Save size={17} />
                {isUpdating ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Saving. Please wait...
                  </>
                ) : (
                  " Save Reschedule"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
