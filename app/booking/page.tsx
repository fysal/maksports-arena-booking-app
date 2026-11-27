/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useContext, useEffect, useState } from "react";

import BookingCalendar from "@/app/components/booking/bookingcalendar";
import TimeSlotPicker from "@/app/components/booking/timeslotpicker";

import {
  MoveRight,
  CalendarDays,
  Clock3,
  UnfoldVertical,
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
} from "lucide-react";

import BookingHandler from "../lib/booking_handler";
import { generateRandomIds } from "../lib/utils/utils";
import { useRouter } from "next/navigation";
import { BookingType } from "../types/booking";
import Footer from "../components/Footer";
import PageLoading from "../components/pageloading";
import MaintenancePage from "../components/UnderMaintenance";
import BookingForm, {
  BookingFormData,
} from "../components/booking/bookingform";
import {
  PitchContext,
  SettingsContext,
  TeamContenxt,
  UserContext,
} from "../lib/context";
import Navbar from "../components/nav/Navbar";
import ReviewAndPayment from "../components/booking/reviewandpayment";
import { Pitch } from "../types/pitch";
import AdminHelper from "../lib/firebase/admin_helper_functions";

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export default function BookPage() {
  const { settings } = useContext(SettingsContext);
  const { currentUser } = useContext(UserContext);
  const { teamInformation } = useContext(TeamContenxt);
  const { pitches, setPitches } = useContext(PitchContext);

  const router = useRouter();

  // Booking states
  const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);
  const [date, setDate] = useState<Date>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();
  const [duration, setDuration] = useState<number>(60);
  const [activeScreen, setActiveScreen] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);

  const [slotError, setSlotError] = useState<string | null>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [teamInfo, setTeamInfo] = useState<BookingFormData>({
    teamName: teamInformation?.teamName ?? "",
    contactPerson: currentUser?.name ?? "",
    phone: currentUser?.phoneNumber ?? "",
    email: currentUser?.email ?? "",
    number_of_players: 0,
    notes: "",
  });

  // Booking steps
  const tabs = [
    "Select Pitch",
    "Date & Time",
    "Information",
    "Review & Payment",
  ];

  useEffect(() => {
    if (!settings) return;

    const timeout = setTimeout(() => {
      setDuration(settings.slotPricing[0].duration);
      setFee(settings.slotPricing[0].price);
    }, 0);
  }, [settings]);

  // Fetch available time slots for the selected pitch
  async function fetchAvailableSlots(dateString: string) {
    if (!selectedPitch?.id) {
      setSlots([]);
      return;
    }

    setLoadingSlots(true);

    try {
      const data = await BookingHandler.fetchAvailableslots({
        openingTime: settings!.operatingHours.openingTime,
        closingTime: settings!.operatingHours.closingTime,
        dateString,
        duration,
        pitchId: selectedPitch.id,
      });

      if (data) {
        setSlots(data.slots);
      } else {
        setSlots([]);
      }

      setSelectedSlot(undefined);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
      setSlots([]);
      setSelectedSlot(undefined);
    } finally {
      setLoadingSlots(false);
    }
  }

  useEffect(() => {
    if (!date || !settings || !selectedPitch) return;

    // Extract the local calendar date without UTC conversion.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;

    console.log(dateString);

    const fTimeout = setTimeout(() => fetchAvailableSlots(dateString), 0);

    return () => clearTimeout(fTimeout);
  }, [date, duration, settings, selectedPitch]);

  // Populate team information
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
        number_of_players: Number(teamInformation?.number_of_players) || 0,
      }));
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentUser, teamInformation]);

  const fecthPitches = async () => {
    await AdminHelper.fetchPitches({ setPitches });
  };

  useEffect(() => {
    if (pitches) return;

    fecthPitches();
  }, [pitches]);

  // Capture team information
  const captureFormData = (data: BookingFormData | unknown | any) => {
    setTeamInfo({ ...data });
    handleNext();
  };

  // Navigate forward
  const handleNext = () => {
    if (activeScreen === tabs.length - 1) return;

    setSlotError(null);
    setActiveScreen((prev) => prev + 1);
  };

  // Navigate backward
  const handlePrevious = () => {
    if (activeScreen === 0) return;

    setSlotError(null);
    setActiveScreen((prev) => prev - 1);
  };

  console.log(settings);

  // Change booking duration
  const onDurationChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dRange = Number(e.target.value);

    const selectedPricing = settings?.slotPricing.find(
      (slot) => slot.duration === dRange,
    );

    if (!selectedPricing) return;

    setFee(selectedPricing.price);
    setDuration(dRange);
  };

  // Select pitch
  const handlePitchSelection = (pitch: Pitch) => {
    setSelectedPitch(pitch);
  };

  // Process booking
  async function onProceedToPayment() {
    if (!selectedPitch || !date || !selectedSlot) return;

    const payload: BookingType = {
      teamName: teamInfo.teamName,
      teamId: teamInformation?.id ?? generateRandomIds(),

      pitch: {
        id: selectedPitch.id,
        name: selectedPitch.name,
      },

      fee,
      duration,
      date: date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,

      number_of_players: Number(teamInfo.number_of_players) || 0,

      createdBy: currentUser?.uid ?? "anonymous",
      status: "pending",
      uid: currentUser?.uid ?? " ",

      contactInformation: {
        name: teamInfo.contactPerson ?? " ",
        phone: teamInfo.phone,
        email: teamInfo.email ?? " ",
        uid: currentUser?.uid ?? " ",
      },

      preference: settings?.preferences,
    };

    try {
      setIsProcessing(true);

      const result = await BookingHandler.bookSlot(payload);

      if (result.error) {
        setSlotError(result.error);
        return;
      }

      router.replace(`/booking/confirmation?ref=${result.bookingId}`);
    } catch (error) {
      console.error(error);
      setSlotError(
        "Something went wrong while processing your booking. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-5 lg:mx-auto max-w-7xl py-12 relative">
        {!settings || !pitches ? (
          <PageLoading />
        ) : settings.system.maintenanceMode ? (
          <MaintenancePage />
        ) : (
          <Fragment>
            {/* Page Header */}
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest">
                MAK Sports Arena
              </p>

              <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
                Book your playing time
              </h1>

              <p className="mt-3 text-gray-500">
                Select your preferred pitch, choose a date and time, and
                complete your booking.
              </p>
            </div>

            {/* Booking Steps */}
            <div className="flex flex-wrap gap-3 md:gap-5 items-center justify-center lg:justify-end mb-10 capitalize">
              {tabs.map((text, idx) => {
                const isActive = idx === activeScreen;
                const isCompleted = idx < activeScreen;

                return (
                  <Fragment key={idx}>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isActive
                          ? "font-bold text-primary"
                          : isCompleted
                            ? "font-semibold text-green-600"
                            : "text-slate-400"
                      }`}>
                      {isCompleted && <Check size={16} />}

                      {text}
                    </div>

                    {tabs.length - 1 > idx && (
                      <MoveRight className="text-slate-300" size={17} />
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* ==========================================
                STEP 1: SELECT PITCH
            ========================================== */}
            {activeScreen === 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Choose your pitch</h2>

                  <p className="mt-2 text-gray-500">
                    Select the pitch you would like to book before proceeding.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {pitches.map((pitch) => {
                    const isSelected = selectedPitch?.id === pitch.id;

                    return (
                      <button
                        key={pitch.id}
                        type="button"
                        disabled={!pitch.available}
                        onClick={() => handlePitchSelection(pitch)}
                        aria-pressed={isSelected}
                        className={`group text-left rounded-2xl border-2 p-7 transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        }`}>
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                            <MapPin size={23} />
                          </div>
                          {!pitch.available && (
                            <div className="text-red-700 bg-red-100 p-2 rounded-lg text-sm font-meduim capitalize">
                              {pitch.message}
                            </div>
                          )}
                          <div
                            className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "bg-primary border-primary"
                                : "border-slate-300"
                            }`}>
                            {isSelected && (
                              <Check size={15} className="text-white" />
                            )}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold">{pitch.name}</h3>

                        <p className="text-md text-gray-500 mt-2">
                          {pitch.desc}
                        </p>

                        <div
                          className={`mt-7 pt-5 border-t text-sm font-semibold ${
                            isSelected
                              ? "border-primary/20 text-primary"
                              : "border-slate-100 text-slate-500"
                          }`}>
                          {isSelected ? "Pitch selected" : "Select this pitch"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-md text-gray-500 text-center mt-8">
                  You can review your pitch selection before completing your
                  booking.
                </p>
              </div>
            )}

            {/* ==========================================
                STEP 2: DATE & TIME
            ========================================== */}
            {activeScreen === 1 && (
              <div>
                {/* Selected Pitch */}
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Selected Pitch
                    </p>

                    <h3 className="font-bold text-lg mt-1">
                      {selectedPitch?.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {selectedPitch?.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveScreen(0)}
                    className="text-sm font-semibold text-primary hover:underline">
                    Change pitch
                  </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 relative">
                  <BookingCalendar onSelect={setDate} />

                  <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl font-bold">Available times</h2>

                      <div className="flex items-center gap-3">
                        <p className="text-sm">Duration:</p>

                        <select
                          value={duration}
                          className="select"
                          onChange={onDurationChanged}>
                          {settings.slotPricing.map((slot, idx) => (
                            <option value={slot.duration} key={idx}>
                              {slot.duration} Mins
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
              </div>
            )}

            {/* ==========================================
                STEP 3: TEAM INFORMATION
            ========================================== */}
            {activeScreen === 2 && (
              <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                {/* Booking Summary */}
                <div className="rounded-xl bg-card p-8 bg-slate-100/10 border border-slate-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Booking Summary</h3>

                    <p className="mt-1 text-muted-foreground">
                      Review your selected pitch, date and playing slot.
                    </p>
                  </div>

                  {/* Pitch */}
                  <div className="mb-6 pb-5 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />

                      <div className="slot-label">Selected Pitch</div>
                    </div>

                    <h4 className="font-bold text-lg">{selectedPitch?.name}</h4>

                    <p className="text-sm text-muted-foreground">
                      {selectedPitch?.desc}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-6 lg:gap-0 justify-center lg:justify-between">
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
                          <span className="text-5xl lg:text-7xl font-black leading-none">
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

                    <div className="w-full">
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

                  {/* Playing Slot */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock3 className="h-5 w-5 text-primary" />

                      <div className="slot-label">Playing Slot</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="slot-time">{selectedSlot?.startTime}</div>

                      <UnfoldVertical />

                      <div className="slot-time">{selectedSlot?.endTime}</div>
                    </div>
                  </div>
                </div>

                {/* Team Information Form */}
                <div className="col-span-1 lg:col-span-2">
                  <BookingForm
                    onSubmit={captureFormData}
                    defaultValues={teamInfo}
                  />
                </div>
              </div>
            )}

            {/* ==========================================
                STEP 4: REVIEW & PAYMENT
            ========================================== */}
            {activeScreen === 3 && (
              <ReviewAndPayment
                date={date}
                selectedSlot={selectedSlot!}
                booking={{
                  ...teamInfo,

                  ...{
                    pitchId: selectedPitch?.id,
                    pitchName: selectedPitch?.name,
                  },
                }}
                amount={fee}
                duration={duration}
                error={slotError}
                loading={isProcessing}
                onProceedToPayment={onProceedToPayment}
              />
            )}

            {/* ==========================================
                NAVIGATION BUTTONS
            ========================================== */}
            <div className="flex items-center justify-center gap-5 py-10 lg:py-20">
              {activeScreen > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-5 py-3 cursor-pointer border border-slate-300 rounded-lg hover:bg-slate-600 hover:text-slate-100 transition-colors">
                  <ArrowLeft size={17} />

                  <span>Back</span>
                </button>
              )}

              {/* Continue from pitch selection */}
              {activeScreen === 0 && selectedPitch && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 border border-slate-700 px-8 cursor-pointer py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                  <span>Continue to date & time</span>

                  <ArrowRight size={17} />
                </button>
              )}

              {/* Continue from date and time */}
              {activeScreen === 1 && selectedSlot && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 border border-slate-700 px-8 cursor-pointer py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                  <span>Continue</span>

                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>

      <Footer />
    </main>
  );
}
