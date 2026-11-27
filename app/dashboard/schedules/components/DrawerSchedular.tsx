/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingHandler from "@/app/lib/booking_handler";
import {
  PitchContext,
  ProfilesContext,
  SettingsContext,
  TeamsContext,
} from "@/app/lib/context";
import { TimeSlot } from "@/app/lib/utils/slots";
import { BookingType, ISlot } from "@/app/types/booking";
import { Pitch } from "@/app/types/pitch";
import { UserProfile } from "@/app/types/user";
import { CalendarDays, Clock3, Users, CreditCard, X, Save } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type IDuration = {
  duration: number;
  price: number;
  id: string;
  available: boolean;
};

const defaultDuration = {};

type TFormType = {
  team: string;
  slot: TimeSlot;
};

const defaultFormData = {
  team: "",
  slot: {
    startTime: "",
    endTime: "",
    available: true,
  },
};

export default function AdminBookSlotDrawer({
  selectedDate,
  selectedTime,
  closeDrawer,
}: {
  selectedDate: Date;
  selectedTime: string | null;
  closeDrawer: () => void;
}) {
  const { teams } = useContext(TeamsContext);
  const { settings } = useContext(SettingsContext);
  const { profiles } = useContext(ProfilesContext);
  const { pitches } = useContext(PitchContext);

  const [selectedDuration, setDuration] = useState<
    IDuration | null | undefined
  >(
    settings?.slotPricing[0]
      ? {
          id: settings.slotPricing[0].id,
          duration: settings.slotPricing[0].duration,
          price: settings.slotPricing[0].price,
          available: settings.slotPricing[0].enabled ?? true,
        }
      : undefined,
  );
  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);

  const [formData, setFormData] = useState<TFormType>(defaultFormData);

  const [color, setColor] = useState<string>("green-600");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useMemo(() => {
    if (!selectedPitch) return;

    if (selectedDate && selectedDuration && selectedPitch) {
      fetchSlots();
    }
  }, [selectedDate, selectedDuration, selectedTime, selectedPitch]);

  async function fetchSlots() {
    const date = new Date(selectedDate);

    const dateString = date.toLocaleDateString("en-CA", {
      timeZone: "Africa/kampala",
    });

    // console.log(dateString);
    // return;

    const data = await BookingHandler.fetchAvailableslots({
      openingTime: selectedTime!,
      closingTime: settings!.operatingHours.closingTime,
      dateString,
      duration: selectedDuration?.duration ?? 60,
      pitchId: selectedPitch!.id,
    });
    if (!data) return;
    //filter the
    const selectedHour = Number(selectedTime?.split(":")[0]);

    const slots = data.slots.filter((slt: ISlot) => {
      const [slotHour, slotMinutes] = slt.startTime.split(":").map(Number);

      const min60Slot = slt.startTime === selectedTime;

      const min90Slot =
        (slotHour === selectedHour && slotMinutes === 30) ||
        (slotHour === selectedHour + 1 && slotMinutes === 30);

      return min60Slot || min90Slot;
    });
    setFormData((current) => ({ ...current, slot: slots[0] }));
    setAvailableSlots(slots);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!formData.slot.startTime) return;

      setIsAvailable(formData.slot.available!);

      if (formData.slot?.available) {
        setColor("green-600");
      } else {
        setColor("red-600");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [formData.slot?.available]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "slot") {
      const vals = value.split("-");
      setFormData((current) => ({
        ...current,
        slot: {
          ...current.slot,
          startTime: vals[0].trim(),
          endTime: vals[1].trim(),
        },
      }));
    } else setFormData((current) => ({ ...current, [name]: value }));
  };

  async function bookTeamSlot(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsProcessing(true);

      const playingTeam = teams?.find((tm) => tm.id === formData.team);

      if (!playingTeam) return;

      const captain = profiles?.find(
        (profile: UserProfile) => profile.uid === playingTeam.uid,
      );

      const payload: BookingType = {
        teamName: playingTeam.teamName,
        teamId: playingTeam.id,
        date: selectedDate,
        startTime: formData.slot.startTime,
        endTime: formData.slot.endTime,
        status: "confirmed",
        uid: playingTeam.uid,
        pitch: {
          id: selectedPitch!.id,
          name: selectedPitch!.name,
        },
        duration: Number(selectedDuration?.duration),
        contactInformation: {
          name: captain?.name ?? "",
          phone: captain?.phoneNumber ?? "",
          email: captain?.email ?? "",
          uid: captain?.uid ?? "",
        },
        fee:
          settings?.slotPricing.find(
            (slotPrice) =>
              slotPrice.duration === Number(selectedDuration?.duration),
          )?.price ?? 50000,
        number_of_players: Number(playingTeam.number_of_players) ?? 10,
      };

      await BookingHandler.bookSlot(payload);

      closeDrawer();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create slot");
    } finally {
      setIsProcessing(false);
    }
  }

  if (!pitches) return <div>Loading</div>;

  return (
    <form onSubmit={bookTeamSlot} className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${isAvailable ? "bg-green-50" : "bg-red-50"} text-${color}`}>
              <CalendarDays size={19} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Book a Slot
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Create a booking on behalf of a team
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={closeDrawer}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
          <X size={19} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          {/* Selected Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Selected Date
            </label>

            <div
              className={`flex items-center gap-3 rounded-2xl border 
            ${isAvailable ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"} px-4 py-4`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${isAvailable ? "bg-green-50" : "bg-red-50"} text-${color}`}>
                <CalendarDays size={18} />
              </div>

              <div>
                <p
                  className={`text-xs font-medium uppercase tracking-wide text-${color}`}>
                  Booking Date
                </p>

                <p className="mt-0.5 font-semibold text-slate-900">
                  {selectedDate?.toLocaleDateString("us-en", {
                    weekday: "long",
                  })}
                  , {selectedDate.getDate()}{" "}
                  {selectedDate.toLocaleDateString("default", {
                    month: "long",
                  })}{" "}
                  {selectedDate.getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Team
            </label>

            <div className="relative">
              <Users
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                defaultValue=""
                name="team"
                onChange={handleChange}
                required
                className={`h-12 w-full appearance-none rounded-xl border  bg-white pl-10 pr-10 text-sm text-slate-700 outline-none capitalize transition  focus:ring-4  ${isAvailable ? "border-slate-200 focus:border-green-500 focus:ring-green-500/10" : "border-red-200 focus:border-red-500 focus:ring-red-500/10"}`}>
                <option value="" disabled>
                  Select a team
                </option>

                {teams?.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
          </div>

          {/* Select Pitch */}

          <div
            className={`rounded-3xl border ${isAvailable ? "border-green-100 bg-green-50/40" : "border-red-100 bg-red-50/40"} p-5`}>
            <div className="mb-5">
              <h3 className="font-semibold text-slate-900">Select Pitch</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500 mb-4">
                Select your preferred pitch.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {pitches?.map((pitch) => (
                  <button
                    key={pitch.id}
                    id={pitch.id}
                    type="button"
                    onClick={() => setSelectedPitch(pitch)}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition ${
                      selectedPitch?.id === pitch.id
                        ? isAvailable
                          ? "border-green-500 bg-green-50 ring-2 ring-green-500/10"
                          : "border-red-500 bg-red-50 ring-2 ring-red-500/10"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">
                        {pitch.name}
                      </span>

                      {selectedPitch?.id === pitch.id && (
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full bg-${color} text-white`}>
                          <span className="text-xs">✓</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{pitch.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Time */}
          {selectedPitch && (
            <div
              className={`rounded-3xl border ${isAvailable ? "border-green-100 bg-green-50/40" : "border-red-100 bg-red-50/40"}  p-5`}>
              <div className="mb-5">
                <h3 className="font-semibold text-slate-900">Booking Time</h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Select the time and duration for the booking.
                </p>
              </div>

              <div className="space-y-5">
                {/* Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Duration
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {settings?.slotPricing.map((slotPrice) => (
                      <button
                        type="button"
                        key={slotPrice.id}
                        onClick={() =>
                          setDuration({
                            id: slotPrice.id,
                            duration: slotPrice.duration,
                            price: slotPrice.price,
                            available: slotPrice.enabled ?? true,
                          })
                        }
                        className={`cursor-pointer rounded-xl border p-4 text-left  ${
                          selectedDuration?.duration === slotPrice.duration
                            ? isAvailable
                              ? "border-green-500 bg-green-50 ring-2 ring-green-500/10"
                              : "border-red-500 bg-red-50 ring-2 ring-red-500/10"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900">
                            {slotPrice.duration} Minutes
                          </span>

                          {selectedDuration?.duration ===
                            slotPrice.duration && (
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full bg-${color} text-white`}>
                              <span className="text-xs">✓</span>
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          UGX{" "}
                          {slotPrice.price.toLocaleString("en-us", {
                            currency: "ugx",
                          })}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Start Time */}
                {/* Booking Summary */}
                <div
                  className={`rounded-2xl border   p-4 ${formData.slot?.available ? "border-slate-200 bg-white" : "border-red-700 bg-red-100/50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Session</p>

                      <p
                        className={`mt-1 font-semibold ${formData.slot?.available ? "text-slate-900" : "text-red-700"} `}>
                        {/* {formData.slot} */}
                        {formData.slot?.startTime} - {formData.slot?.endTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Total</p>

                      <p
                        className={`mt-1 font-semibold ${formData.slot?.available ? "text-green-600" : "text-red-700"}`}>
                        UGX {selectedDuration?.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div
                  className={`flex items-center gap-3 rounded-2xl border ${formData.slot?.available ? " border-green-200 bg-green-50" : " border-red-200 bg-red-50"}  p-4`}>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${formData.slot?.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}>
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
                    <p
                      className={`text-sm font-semibold ${formData.slot?.available ? "text-green-800" : "text-red-800"}`}>
                      {formData.slot?.available
                        ? " Time slot available"
                        : "Time slot not available"}
                    </p>

                    <p
                      className={`mt-0.5 text-xs ${formData.slot?.available ? "text-green-700" : "text-red-700"}`}>
                      {formData.slot?.available
                        ? "This time is available for booking."
                        : "This time is not available for booking at the moment."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skip Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <CreditCard size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Skip Payment
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Create the booking without requiring payment from the team.
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked="false"
                className="relative h-7 w-12 shrink-0 rounded-full bg-slate-200 transition">
                <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={closeDrawer}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isProcessing || !isAvailable}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 disabled:bg-slate-100 px-4 py-3 text-sm font-semibold text-white disabled:text-slate-500 transition hover:bg-green-700">
            <Save size={17} />
            {isProcessing ? "Booking slot..." : "Create Booking"}
          </button>
        </div>
      </div>
    </form>
  );
}
