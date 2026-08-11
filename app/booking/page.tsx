/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useContext, useEffect, useState } from "react";

import BookingCalendar from "@/app/components/booking/BookingCalendar";

import TimeSlotPicker from "@/app/components/booking/TimeSlotPicker";
import {
  MoveRight,
  CalendarDays,
  Clock3,
  UnfoldVertical,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import BookingForm, {
  BookingFormData,
} from "../components/booking/BookingForm";
import ReviewAndPayment from "../components/booking/ReviewAndPayment";
import Navbar from "../components/nav/Navbar";
import { TeamContenxt, UserContext } from "../lib/context";
import BookingHandler from "../lib/booking_handler";
import { slotBookingType } from "../lib/types";
import { generateRandomIds } from "../lib/utils/utils";
import { useRouter } from "next/navigation";

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export default function BookPage() {
  const [date, setDate] = useState<Date>();

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();
  const [duration, setDuration] = useState<number>(60);
  const [activeScreen, setActiveScreen] = useState<number>(0);
  const [fee, setFee] = useState<number>(50000);
  const { currentUser } = useContext(UserContext);
  const { teamInformation } = useContext(TeamContenxt);
  const [slotError, setSlotError] = useState<string | null>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<BookingFormData>({
    teamName: teamInformation?.teamName ?? "",
    contactPerson: currentUser?.name ?? "",
    phone: currentUser?.phoneNumber ?? "",
    email: currentUser?.email ?? "",
    numberOfPlayers: 0,
    notes: "",
  });
  const tabs = ["date & time", "Information", "Review & Payment"];

  const router = useRouter();

  async function fetchAvailableSlots(dateString: string) {
    setLoadingSlots(true);
    const data = await BookingHandler.fetchAvailableslots({
      dateString,
      duration,
    });

    if (data) setSlots(data.slots);
    else setSlots([]);
    setSelectedSlot(undefined);
    setLoadingSlots(false);
  }

  useEffect(() => {
    if (!date) return;
    const dateString = date.toISOString().split("T")[0];
    // defer calling fetchAvailableSlots to avoid synchronous setState inside effect
    const fTimeout = setTimeout(() => fetchAvailableSlots(dateString), 0);

    return () => clearTimeout(fTimeout);
  }, [date, duration]);

  useEffect(() => {
    if (!currentUser) return;
    const timeout = setTimeout(() => {
      setTeamInfo((prev) => ({
        ...prev,
        teamName: teamInformation?.teamName ?? "",
        contactPerson: currentUser?.name ?? "",
        phone: currentUser?.phoneNumber ?? "",
        email: currentUser?.email ?? "",
        teamId: teamInformation?.id,
      }));
    }, 0);
    return () => clearTimeout(timeout);
  }, [currentUser, teamInformation]);

  const captureFormData = (_data: BookingFormData | unknown | any) => {
    setTeamInfo({ ..._data });
    handleNext();
  };

  const handleNext = () => {
    if (activeScreen === tabs.length - 1) return;

    setActiveScreen((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (activeScreen === 0) return;
    setSlotError(null);
    setActiveScreen((prev) => prev - 1);
  };

  const onDurationChanged = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dRange = Number(e.target.value);
    if (dRange === 50) setFee(50000);
    else setFee(750000);
    setDuration(dRange);
  };

  async function onProceedToPayment() {
    const payload: slotBookingType = {
      ...teamInfo,
      teamId: teamInformation?.id ?? generateRandomIds(),
      fee,
      duration,
      date: date!,
      ...selectedSlot,
      createdBy: currentUser?.uid ?? "anonymous",
    };

    try {
      setIsProcessing(true);
      const result = await BookingHandler.bookSlot(payload);

      if (result.error)
        //set slot error
        return setSlotError(result.error);

      //call payment processing

      router.replace(`/booking/confirmation?ref=${result.bookingId}`);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="mx-auto max-w-7xl py-12 relative">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest">
            MAK Sports Arena
          </p>

          <h1 className="mt-2 text-4xl font-bold">Book your playing time</h1>

          <p className="mt-3 text-gray-500">
            Choose a date and select an available time slot.
          </p>
        </div>
        <div className="flex gap-5 items-center justify-end mb-5 capitalize">
          {tabs.map((text, idx: number) => {
            const isActive = idx === activeScreen;
            return (
              <Fragment key={idx}>
                <div className={`${isActive ? "font-bold" : "text-slate-400"}`}>
                  {text}
                </div>{" "}
                {tabs.length - 1 > idx && (
                  <span>
                    {" "}
                    <MoveRight className="text-slate-400" />
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
        {activeScreen === 0 ? (
          <div className="grid gap-8 lg:grid-cols-2 relative">
            <BookingCalendar onSelect={setDate} />
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-xl font-bold">Available times</h2>
                <div className="flex items-center gap-3">
                  <p>Duration:</p>
                  <select
                    defaultValue={60}
                    className="select"
                    onChange={onDurationChanged}>
                    {[60, 90].map((num: number) => (
                      <option value={num} key={num}>
                        {num} Mins
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {!date && (
                <p className="text-gray-500">
                  Select a date to view available times.
                </p>
              )}

              {loadingSlots && (
                <p className="text-gray-500 mb-3">
                  Loading slots. Please wait...
                </p>
              )}

              {date && !loadingSlots && (
                <TimeSlotPicker
                  slots={slots}
                  selected={selectedSlot?.startTime}
                  onSelect={setSelectedSlot}
                />
              )}
            </div>
          </div>
        ) : activeScreen === 1 ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl bg-card p-8 bg-slate-100/10 border border-slate-300">
              <div className=" flex-col gap-8 md:flex-row md:items-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">Booking Summary</h3>

                  <p className="mt-1 text-muted-foreground">
                    Review your selected date and playing slot.
                  </p>
                </div>
                <div className="flex justify-between">
                  {/* Date Card */}
                  <div className="flex-shrink-0 mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays className="h-5 w-5 text-primary" />

                      <div className="slot-label">Selected Date</div>
                    </div>
                    <div className="flex h-44 w-40 flex-col overflow-hidden rounded-2xl border bg-background">
                      <div className="bg-primary px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                        {date?.toLocaleDateString("en-US", { month: "long" })}
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-center">
                        <span className="text-7xl font-black leading-none">
                          {date?.getDate()}
                        </span>

                        <span className="mt-2 text-sm font-medium text-muted-foreground">
                          {date?.toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8" />
                    <div className="flex flex-col justify-center items-center gap-0">
                      <span className="slot-years">
                        {date?.getFullYear().toString().split("").slice(0, 2)}
                      </span>
                      <span className="slot-years">
                        {date?.getFullYear().toString().split("").slice(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Booking Details */}
                <div className="">
                  <div className="space-y-5">
                    <div className=" items-center gap-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock3 className="h-5 w-5 text-primary" />

                        <div className="slot-label">Playing Slot</div>
                      </div>

                      <div className="w-full">
                        <div className="flex flex-wrap  items-center gap-3">
                          <div className="slot-time">
                            {selectedSlot?.startTime}
                          </div>

                          <UnfoldVertical />

                          <div className="slot-time">
                            {selectedSlot?.endTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              {" "}
              <BookingForm
                onSubmit={captureFormData}
                defaultValues={teamInfo}
              />
            </div>
          </div>
        ) : (
          <ReviewAndPayment
            date={date}
            selectedSlot={selectedSlot!}
            booking={{ ...teamInfo! }}
            amount={fee}
            duration={duration}
            error={slotError}
            loading={isProcessing}
            onProceedToPayment={onProceedToPayment}
          />
        )}
        <div className="flex items-center justify-center gap-5 py-20">
          {activeScreen > 0 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-5 py-3 cursor-pointer border border-slate-300 rounded-lg hover:bg-slate-600 hover:text-slate-100">
              <ArrowLeft className="" size={17} /> <span>Back</span>
            </button>
          )}
          {selectedSlot && activeScreen < 1 && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 border border-slate-700 px-8 cursor-pointer py-3 rounded-lg hover:bg-slate-800 hover:text-white">
              <span>Next</span> <ArrowRight className="text-sm" size={17} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
