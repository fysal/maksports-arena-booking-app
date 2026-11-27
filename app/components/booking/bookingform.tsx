/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export interface BookingFormData {
  teamName: string;
  contactPerson: string;
  phone: string;
  email: string;
  number_of_players?: number | string;
  notes?: string;
  [key: string]: any;
}

interface BookingFormProps {
  defaultValues?: Partial<BookingFormData>;
  loading?: boolean;
  onSubmit: (data: BookingFormData) => void;
}

const schema = z.object({
  teamName: z.string().min(3, "Please enter a valid team name"),
  phone: z.string().regex(/^\+256(?!0)\d{9}$/, {
    message: "Enter a valid phone number (e.g. +256772879099)",
  }),
  contactPerson: z.string().min(6, {
    message: "Please enter a valid first name and last name",
  }),
  email: z.email("Enter a valid email address"),
  number_of_players: z.string(),
  notes: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function BookingForm({
  defaultValues,
  loading = false,
  onSubmit,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      ...defaultValues,
      number_of_players: defaultValues?.number_of_players?.toString(),
    },

    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-600">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Information</h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter your team and contact details to complete the booking.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        {/* Team Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Team Name
          </label>

          <input
            type="text"
            placeholder="e.g. Kampala United FC"
            {...register("teamName")}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.teamName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.teamName.message}
            </p>
          )}
        </div>

        {/* Contact Person */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contact Person
          </label>

          <input
            type="text"
            placeholder="Full name"
            {...register("contactPerson")}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.contactPerson && (
            <p className="mt-1 text-sm text-red-500">
              {errors.contactPerson.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+256700000000"
            {...register("phone")}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="team@example.com"
            {...register("email")}
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      {/* Players */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Number of Players
        </label>

        <input
          type="number"
          min={5}
          max={30}
          {...register("number_of_players", {
            required: "Number of players is required",
          })}
          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
        />

        {errors.number_of_players && (
          <p className="mt-1 text-sm text-red-500">
            {errors.number_of_players.message}
          </p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Additional Notes
        </label>

        <textarea
          rows={4}
          placeholder="Optional information..."
          {...register("notes")}
          className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Processing..." : "Continue to Booking Summary"}
      </button>
    </form>
  );
}
