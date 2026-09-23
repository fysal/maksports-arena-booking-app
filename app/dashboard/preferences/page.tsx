"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { SettingsContext } from "@/app/lib/context";
import AdminHelper from "@/app/lib/firebase/admin_helper_functions";
import { Settings } from "@/app/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Save } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import PageLoading from "@/app/components/pageloading";

const schema = z.object({
  email: z.email("Enter a valid email address"),
});

type TPreference = z.infer<typeof schema>;

export default function PreferencesPage() {
  const { settings } = useContext(SettingsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TPreference>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // Populate form when settings are loaded
  useEffect(() => {
    if (settings) {
      reset({
        email: settings.preferences?.email ?? "",
      });
    }
  }, [settings, reset]);

  const onSubmit = async (data: TPreference) => {
    try {
      await AdminHelper.updateSettings({
        ...settings,
        preferences: {
          ...settings?.preferences,
          email: data.email,
        },
      } as Settings);

      // Keep the form value in sync after saving
      reset({
        email: data.email,
      });

      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update preferences");
    }
  };

  if (!settings) {
    return <PageLoading />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-full bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Preferences
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your account preferences.
            </p>
          </div>

          {/* Email Preference */}
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Email Address
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the email address associated with your account.
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                {errors.email && (
                  <div className="text-xs font-medium text-red-600">
                    Invalid email address
                  </div>
                )}
              </div>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  className={`h-12 w-full rounded-xl border pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${
                    errors.email
                      ? "border-red-200 bg-red-50/50"
                      : "border-slate-200 bg-white"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}

              <p className="mt-4 text-sm text-slate-500">
                This email address will be used to receive booking-related
                notifications and updates.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-60">
                <Save size={16} />

                {isSubmitting ? "Saving changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
