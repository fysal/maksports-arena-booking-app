/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingHandler from "@/app/lib/booking_handler";
import {
  ProfilesContext,
  SettingsContext,
  TeamsContext,
} from "@/app/lib/context";
import { TimeSlot } from "@/app/lib/utils/slots";
import { BookingType, ISlot } from "@/app/types/booking";
import { UserProfile } from "@/app/types/user";
import { CalendarDays, Clock3, Users, CreditCard, X, Save } from "lucide-react";
import { useContext, useMemo, useState } from "react";
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

  const [formData, setFormData] = useState<TFormType>(defaultFormData);

  useMemo(() => {
    if (selectedDate && selectedDuration) {
      fetchSlots();
    }
  }, [selectedDate, selectedDuration, selectedTime]);

  async function fetchSlots() {
    const data = await BookingHandler.fetchAvailableslots({
      openingTime: settings!.operatingHours.openingTime,
      closingTime: settings!.operatingHours.closingTime,
      dateString: selectedDate.toDateString(),
      duration: selectedDuration?.duration ?? 60,
    });
    if (!data) return;

    //filter the

    const slots = data.slots.filter((slt: ISlot) => {
      const min60Slot = slt.startTime === selectedTime;

      const mins90Slot = slt.startTime === selectedTime?.split(":")[0] + ":30";

      return min60Slot || mins90Slot;
    });

    setFormData((current) => ({ ...current, slot: slots[0] }));

    setAvailableSlots(slots);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "slot") {
      const vals = value.split("-");
      setFormData((current) => ({
        ...current,
        slot: {
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

  return (
    <form onSubmit={bookTeamSlot} className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
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

            <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/50 px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CalendarDays size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-green-600">
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
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none capitalize transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10">
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

          {/* Booking Time */}
          <div className="rounded-3xl border border-green-100 bg-green-50/40 p-5">
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
                      className={`cursor-pointer rounded-xl border p-4 text-left  ${selectedDuration?.duration === slotPrice.duration ? "border-green-500 bg-green-50 ring-2 ring-green-500/10" : "border-slate-200 bg-white transition hover:border-slate-300"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">
                          {slotPrice.duration} Minutes
                        </span>

                        {selectedDuration?.duration === slotPrice.duration && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
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
              {availableSlots && availableSlots.length > 1 && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Start Time
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      name="slot"
                      defaultValue=""
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10">
                      <option value="" disabled>
                        Select slot
                      </option>
                      {availableSlots.map((slot: ISlot, idx: number) => (
                        <option
                          key={idx}
                          value={`${slot.startTime} - ${slot.endTime}`}>
                          {slot.startTime} - {slot.endTime}
                        </option>
                      ))}
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      ▾
                    </span>
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Session</p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {/* {formData.slot} */}
                      {formData.slot?.startTime} - {formData.slot?.endTime}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total</p>

                    <p className="mt-1 font-semibold text-green-600">
                      UGX {selectedDuration?.price.toLocaleString()}
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
                    This time is available for booking.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
            disabled={isProcessing}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
            <Save size={17} />
            {isProcessing ? "Booking slot..." : "Create Booking"}
          </button>
        </div>
      </div>
    </form>
  );
}
