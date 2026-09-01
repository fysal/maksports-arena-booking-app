/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  X,
  Camera,
  Users,
  Phone,
  Mail,
  Save,
  ShieldCheck,
  UsersRound,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { UserProfile } from "@/app/types/user";
import { Team } from "@/app/types/team";
import { Input, SectionLabel } from "@/app/components/DrawerInner";

const schema = z.object({
  name: z.string().min(4, {
    message: "Enter a valid name",
  }),
  teamName: z.string().min(2, { message: "Team name is required" }),
  email: z.email(),
  phoneNumber: z.string().min(12, { message: "Enter a valid phone number" }),
  shortName: z
    .string()
    .min(2, {
      message: "Short name is required",
    })
    .max(2, { message: "Only 2 letters allowed" }),
  number_of_players: z
    .string()
    .min(1, { message: "Enter number of team members" }),
  description: z.string(),
  status: z.boolean(),
});

type formDataType = z.infer<typeof schema>;

export default function EditTeamAndProfile({
  toggleDrawer,
  profile,
  team,
}: {
  toggleDrawer: () => void;
  profile: UserProfile | null;
  team: Team | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<formDataType>({
    defaultValues: {
      name: profile?.name ?? "",
      teamName: team?.teamName ?? "",
      email: profile?.email ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
      shortName: team?.shortName ?? "",
      number_of_players: String(team?.number_of_players ?? ""),
      description: team?.description ?? "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: formDataType) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team`, {
        method: "POST",
        headers: {
          accept: "text/json",
          "Content-Type": "texxt/json",
        },
        body: JSON.stringify({
          ...formData,
          id: team?.id,
          uid: profile?.uid,
          status: formData.status === true ? "blocked" : "active",
        }),
      });
      toggleDrawer();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="fixed inset-0 z-[80] bg-slate-950/40 backdrop-blur-[2px]"
        onClick={toggleDrawer}
      />

      <aside
        className="
          fixed
          right-0
          top-0
          z-[90]
          flex
          h-screen
          w-full
          max-w-xl
          flex-col
          bg-white
          shadow-2xl
          animate-in
          slide-in-from-right
          duration-300
        ">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Users className="h-5 w-5" />
              </div>

              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Edit Team
              </h2>
            </div>

            <p className="mt-1 pl-11 text-sm text-slate-500">
              Update your &apos; information.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleDrawer}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-900
            ">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =================================================== */}
        {/* BODY */}
        {/* =================================================== */}

        {isSubmitSuccessful && (
          <div className="flex items-center gap-2 border border-green-500 mt-4 mx-4 rounded-lg py-3 px-3 text-sm bg-green-100 text-green-900">
            <span className="text-2xl">👏</span> Team updated successfully!
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-8 p-6">
            <section>
              <SectionLabel
                title="Team Identity"
                description="How your team appears across Maksports."
              />

              <div className="mt-5 flex items-center gap-5">
                {/* Logo */}
                <div className="group relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-green-400 to-green-600 text-2xl font-black text-white shadow-lg shadow-green-600/20">
                    {team?.shortName ?? "TM"}
                  </div>

                  <button
                    type="button"
                    className="
                      absolute
                      -bottom-2
                      -right-2
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border-2
                      border-white
                      bg-slate-950
                      text-white
                      shadow-lg
                      transition
                      hover:scale-105
                    ">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Team logo
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                    Upload a square image. JPG, PNG or WebP.
                  </p>

                  <button
                    type="button"
                    className="mt-3 text-xs font-bold text-green-600 hover:text-green-700">
                    Change logo
                  </button>
                </div>
              </div>
            </section>

            {/* =============================================== */}
            {/* BASIC INFORMATION */}
            {/* =============================================== */}

            <section>
              <SectionLabel
                title="Basic Information"
                description="Your team's public information."
              />

              <div className="mt-5 space-y-5">
                <Input
                  useformProps={{ ...register("teamName") }}
                  label="Team Name"
                  placeholder="e.g. Thunder Strikers FC"
                  icon={<Users />}
                  error={errors.teamName}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <Input
                    label="Short Name"
                    useformProps={{ ...register("shortName") }}
                    placeholder="e.g. TS"
                    maxLength={5}
                    icon={<ShieldCheck />}
                    error={errors.shortName}
                  />
                  <Input
                    label="Number of players"
                    type="number"
                    useformProps={{ ...register("number_of_players") }}
                    placeholder="5"
                    icon={<UsersRound />}
                    error={errors.number_of_players}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Team Description
                  </label>

                  <textarea
                    {...register("description")}
                    placeholder="Tell us a little about your team..."
                    rows={4}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-green-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-green-500/10
                    "
                  />

                  {/* <p className="mt-2 text-right text-xs text-slate-400">
                    {(form.description || "").length}/300
                  </p> */}
                </div>
              </div>
            </section>

            {/* =============================================== */}
            {/* CONTACT INFORMATION */}
            {/* =============================================== */}

            <section>
              <SectionLabel
                title="Contact Person Information"
                description="How Maksports can reach your team."
              />

              <div className="mt-5 space-y-5">
                <Input
                  label="Full Name"
                  useformProps={{ ...register("name") }}
                  disabled={isSubmitting}
                  placeholder="John Doe"
                  icon={<User />}
                  error={errors.email}
                />

                <Input
                  label="Team Email"
                  useformProps={{ ...register("email") }}
                  disabled={isSubmitting}
                  type="email"
                  placeholder="team@example.com"
                  icon={<Mail />}
                  error={errors.email}
                />

                <Input
                  label="Phone Number"
                  useformProps={{ ...register("phoneNumber") }}
                  type="tel"
                  disabled={isSubmitting}
                  placeholder="+256 700 000 000"
                  icon={<Phone />}
                  error={errors.phoneNumber}
                />
              </div>
            </section>

            {/* =============================================== */}
            {/* INFORMATION */}
            {/* =============================================== */}

            <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    This information is secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Team information is used to manage Mak sports account,
                    bookings and communications.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-orange-200 p-4 bg-orange-100/50">
              <p className="text-sm font-bold text-slate-900">Account Status</p>
              <div className="flex items-center gap-4 mt-3">
                <input
                  {...register("status")}
                  id="account-status"
                  className="checkbox rounded bg-orange-200 cursor-pointer"
                  type="checkbox"
                  defaultChecked={
                    profile?.status?.toLowerCase() === "active" ? false : true
                  }
                />
                <label
                  htmlFor="account-status"
                  className="cursor-pointer capitalize">
                  {profile?.status === "active"
                    ? "Block Account"
                    : "unblocked account "}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* FOOTER */}
        {/* =================================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white p-5">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleDrawer}
              disabled={isSubmitting}
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              ">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-green-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-green-600/20
                transition
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              ">
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </form>
  );
}
