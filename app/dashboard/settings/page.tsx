"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarClock,
  Check,
  Clock3,
  CreditCard,
  Plus,
  Save,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { currencyConverter } from "@/app/lib/utils/utils";
import CurrentSlotTypesWiget from "./widgets/CurrentSlotTypesWiget";
import SystemMaintenanceControl from "./widgets/SystemControl";
import SettingsSection from "./widgets/SettingsSection";
import SettingsStatCard from "./widgets/SettingsStatCard";
import { Settings, SlotPricing } from "@/app/types/settings";
import AdminHelper from "@/app/lib/firebase/admin_helper_functions";
import { SettingsContext } from "@/app/lib/context";
import { toast } from "react-toastify";

const initialSlotPricing: SlotPricing[] = [
  {
    id: "slot-60",
    duration: 60,
    price: 50000,
    enabled: true,
  },
  {
    id: "slot-90",
    duration: 90,
    price: 75000,
    enabled: true,
  },
];

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full transition ${
        checked ? "bg-green-600" : "bg-slate-200"
      }`}
      aria-pressed={checked}>
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const { settings } = useContext(SettingsContext);

  const [slotPricing, setSlotPricing] =
    useState<SlotPricing[]>(initialSlotPricing);
  const [savingRequired, setSavingRequired] = useState({
    message: "👋 You have unsaved changes in settings!",
    isRequired: false,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [newDuration, setNewDuration] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [openingTime, setOpeningTime] = useState<string>("08:00");
  const [closingTime, setClosingTime] = useState<string>("23:00");
  const [advanceBookingDays, setAdvanceBookingDays] = useState<number>(30);
  const [minimumBookingHours, setMinimumBookingHours] = useState<
    number | string
  >(2);
  const [cancellationHours, setCancellationHours] = useState<number | string>(
    12,
  );
  const [allowCancellation, setAllowCancellation] = useState<boolean>(true);
  const [requirePayment, setRequirePayment] = useState<boolean>(true);
  const [bookingNotifications, setBookingNotifications] =
    useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);

  const loadSettings = () => {
    setSlotPricing(settings?.slotPricing ?? []);
    setOpeningTime(settings?.operatingHours.openingTime ?? "08:00");
    setClosingTime(settings?.operatingHours.closingTime ?? "23:00");
    setMaintenanceMode(settings?.system.maintenanceMode ?? false);
    setEmailNotifications(settings?.notifications.emailNotifications ?? true);
    setBookingNotifications(
      settings?.notifications.bookingNotifications ?? true,
    );
    setRequirePayment(settings?.payments.requirePayment ?? true);
    setAllowCancellation(settings?.cancellation.allowCancellation ?? true);
    setCancellationHours(settings?.cancellation.cancellationHours ?? 12);
    setMinimumBookingHours(settings?.bookingRules.minimumBookingHours ?? 2);
    setAdvanceBookingDays(settings?.bookingRules.advanceBookingDays ?? 1);
  };

  useEffect(() => {
    if (settings)
      setTimeout(() => {
        loadSettings();
      }, 0);
  }, [settings]);

  function shouldSave() {
    if (savingRequired.isRequired) return;
    else
      setSavingRequired((current) => ({
        ...current,
        isRequired: true,
      }));
  }
  const enabledSlots = useMemo(
    () => slotPricing.filter((slot) => slot.enabled),
    [slotPricing],
  );

  function updateSlot(id: string, field: "duration" | "price", value: number) {
    setSlotPricing((current) =>
      current.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              [field]: value,
            }
          : slot,
      ),
    );
    shouldSave();
  }

  function toggleSlot(id: string) {
    setSlotPricing((current) =>
      current.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              enabled: !slot.enabled,
            }
          : slot,
      ),
    );
    shouldSave();
  }

  function removeSlot(id: string) {
    setSlotPricing((current) => current.filter((slot) => slot.id !== id));
    shouldSave();
  }

  function addSlot() {
    const duration = Number(newDuration);
    const price = Number(newPrice);

    if (!duration || !price || duration < 30) {
      return;
    }

    const alreadyExists = slotPricing.some(
      (slot) => slot.duration === duration,
    );

    if (alreadyExists) {
      alert("A slot with this duration already exists.");
      return;
    }

    setSlotPricing((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        duration,
        price,
        enabled: true,
      },
    ]);

    setNewDuration("");
    setNewPrice("");
    shouldSave();
  }

  async function handleSave() {
    try {
      const settings: Settings = {
        slotPricing,
        operatingHours: {
          openingTime,
          closingTime,
        },
        bookingRules: {
          advanceBookingDays: Number(advanceBookingDays),
          minimumBookingHours: Number(minimumBookingHours),
        },
        cancellation: {
          allowCancellation,
          cancellationHours: Number(cancellationHours),
        },
        payments: {
          requirePayment,
        },
        notifications: {
          bookingNotifications,
          emailNotifications,
        },
        system: {
          maintenanceMode,
        },
      };

      setIsSaving(true);

      const result = await AdminHelper.updateSettings(settings);

      toast.success(result.message, {
        position: "bottom-left",
      });
      setSavingRequired((current) => ({
        ...current,
        isRequired: false,
      }));
    } catch (error) {
      if (typeof error === "string") toast.error(error);
      else {
        console.log(error);
        toast.error("Something went wrong. Failed to update settings", {
          position: "bottom-left",
        });
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm">
              <Settings2 size={21} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Settings
              </h1>

              <p className="mt-1 text-slate-500">
                Configure Maksports Arena booking, pricing and operational
                settings.
              </p>
            </div>
          </div>
        </div>

        {savingRequired.isRequired && (
          <p className="bg-orange-100/50 p-3 border-1 border-orange-900/20 rounded-lg text-sm font-semibold text-orange-800/90 text-center">
            {savingRequired.message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={!savingRequired.isRequired || isSaving}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl cursor-pointer bg-green-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98]">
          <Save size={18} />
          {isSaving ? "Saving Changes..." : " Save Changes"}
        </button>
      </div>

      {/* Overview */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SettingsStatCard
          label={"Active Slot Types"}
          value={enabledSlots.length}
          subtext={"Available for booking"}
        />
        <SettingsStatCard
          label={"Operating Hours"}
          value={`${openingTime} – ${closingTime}`}
          subtext={"Daily arena schedule"}
        />
        <SettingsStatCard
          label={"Advance Booking"}
          value={advanceBookingDays}
          subtext={"Days in advance"}
        />
        <SettingsStatCard
          label={"Payment Status"}
          value={`${requirePayment ? "Required" : "Optional"}`}
          subtext={"Booking payment policy"}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* Slot Duration & Pricing */}

          <SettingsSection
            title="Slot Duration & Pricing"
            description="Configure the available booking durations and the amount teams pay for each session."
            icon={<Clock3 size={20} />}>
            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-[1fr_1fr_100px_48px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span>Duration</span>
                <span>Price</span>
                <span className="text-center">Status</span>
                <span />
              </div>

              <div className="divide-y divide-slate-100">
                {slotPricing.map((slot) => (
                  <div
                    key={slot.id}
                    className="grid grid-cols-[1fr_1fr_100px_48px] items-center gap-3 px-4 py-4">
                    <div className="relative">
                      <input
                        type="number"
                        min="30"
                        step="30"
                        value={slot.duration}
                        onChange={(event) =>
                          updateSlot(
                            slot.id,
                            "duration",
                            Number(event.target.value),
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-14 text-sm font-medium outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      />

                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        mins
                      </span>
                    </div>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        UGX
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={slot.price}
                        onChange={(event) =>
                          updateSlot(
                            slot.id,
                            "price",
                            Number(event.target.value),
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white py-2 pl-12 pr-3 text-sm font-medium outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      />

                      <p className="absolute left-1 top-full mt-1 text-[11px] text-slate-400">
                        {currencyConverter(slot.price)}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Toggle
                        checked={slot.enabled}
                        onChange={() => {
                          toggleSlot(slot.id);
                          shouldSave();
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSlot(slot.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove slot">
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add new slot */}

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="mb-4 text-sm font-semibold text-slate-800">
                Add Custom Slot Duration
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="30"
                    step="30"
                    value={newDuration}
                    onChange={(event) => setNewDuration(event.target.value)}
                    placeholder="Duration"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-14 text-sm outline-none focus:border-green-500"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    mins
                  </span>
                </div>

                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    UGX
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={newPrice}
                    onChange={(event) => setNewPrice(event.target.value)}
                    placeholder="Price"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={addSlot}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 text-sm font-semibold text-green-700 transition hover:bg-green-50">
                  <Plus size={17} />
                  Add Slot
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50/50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Check size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Recommended configuration
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Teams can choose from enabled durations when creating a
                    booking. Your scheduler will use the selected duration to
                    calculate the booking end time automatically.
                  </p>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Operating Hours */}

          <SettingsSection
            title="Arena Operating Hours"
            description="Set the daily opening and closing hours used when generating available booking slots."
            icon={<CalendarClock size={20} />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Opening Time
                </label>

                <input
                  type="time"
                  value={openingTime}
                  onChange={(event) => {
                    setOpeningTime(event.target.value);
                    shouldSave();
                  }}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Closing Time
                </label>

                <input
                  type="time"
                  value={closingTime}
                  onChange={(event) => {
                    setClosingTime(event.target.value);
                    shouldSave();
                  }}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>
          </SettingsSection>

          {/* Booking Rules */}
          {/* 
          <SettingsSection
            title="Booking Rules"
            description="Control how and when teams are allowed to reserve the arena."
            icon={<ShieldCheck size={20} />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Maximum Advance Booking
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={advanceBookingDays}
                    onChange={(event) =>
                      setAdvanceBookingDays(event.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-16 outline-none focus:border-green-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    days
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Minimum Notice
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={minimumBookingHours}
                    onChange={(event) =>
                      setMinimumBookingHours(event.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-16 outline-none focus:border-green-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    hours
                  </span>
                </div>
              </div>
            </div>
          </SettingsSection> */}

          {/* Cancellation */}

          <SettingsSection
            title="Cancellation Policy"
            description="Define whether teams can cancel confirmed bookings and how much notice is required."
            icon={<X size={20} />}>
            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Allow Teams to Cancel
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Teams can cancel their own upcoming bookings.
                  </p>
                </div>

                <Toggle
                  checked={allowCancellation}
                  onChange={() => {
                    setAllowCancellation((current) => !current);
                    shouldSave();
                  }}
                />
              </div>

              {allowCancellation && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Cancellation Notice Required
                  </label>

                  <div className="relative max-w-sm">
                    <input
                      type="number"
                      min="0"
                      value={cancellationHours}
                      onChange={(event) =>
                        setCancellationHours(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-16 outline-none focus:border-green-500"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      hours
                    </span>
                  </div>
                </div>
              )}
            </div>
          </SettingsSection>

          {/* Payments */}

          <SettingsSection
            title="Payment Settings"
            description="Configure how payments affect booking confirmation."
            icon={<CreditCard size={20} />}>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-800">
                  Require Payment for Confirmation
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  A booking remains pending until payment is completed.
                </p>
              </div>

              <Toggle
                checked={requirePayment}
                onChange={() => {
                  setRequirePayment((current) => !current);
                  shouldSave();
                }}
              />
            </div>
          </SettingsSection>

          {/* Notifications */}

          <SettingsSection
            title="Notifications"
            description="Choose which booking and operational notifications the system should send."
            icon={<Bell size={20} />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Booking Notifications
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Notify administrators about new bookings.
                  </p>
                </div>

                <Toggle
                  checked={bookingNotifications}
                  onChange={() => {
                    setBookingNotifications((current) => !current);
                    shouldSave();
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Email Notifications
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Send important booking updates by email.
                  </p>
                </div>

                <Toggle
                  checked={emailNotifications}
                  onChange={() => {
                    setEmailNotifications((current) => !current);

                    shouldSave();
                  }}
                />
              </div>
            </div>
          </SettingsSection>
        </div>

        {/* Sidebar */}

        <aside className="space-y-6">
          <CurrentSlotTypesWiget slotPricing={slotPricing} />

          <SystemMaintenanceControl
            maintenanceMode={maintenanceMode}
            setMaintenanceMode={setMaintenanceMode}
            setSavingRequired={setSavingRequired}
          />

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <h3 className="text-lg font-semibold">Important</h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Changes to slot durations and operating hours should be considered
              carefully because they affect future booking availability.
            </p>

            <button
              onClick={handleSave}
              disabled={!savingRequired.isRequired || isSaving}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              <Save size={17} />
              {isSaving ? "Saving changes..." : " Save All Settings"}
            </button>
          </div>
          {savingRequired.isRequired && (
            <p className="bg-orange-100/50 p-3 border-1 border-orange-900/20 rounded-lg text-sm font-semibold text-orange-800/90 text-center">
              {savingRequired.message}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
