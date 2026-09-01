import StatusBadge from "@/app/team-management/components/StatusBadge";
import { Team } from "@/app/types/team";
import { UserProfile } from "@/app/types/user";
import { Mail, MoreVertical, Phone } from "lucide-react";

export function TeamCard({
  team,
  profile,
  bookingCount,
  toggleDrawer,
}: {
  team: Team;
  profile: UserProfile | null;
  bookingCount: number;
  toggleDrawer: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6  transition hover:border-green-400 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700">
            {team.teamName.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{team.teamName}</h3>

            <p className="text-sm text-slate-500">
              {team.number_of_players ?? 0} members
            </p>
          </div>
        </div>

        <button
          onClick={toggleDrawer}
          className="rounded-xl p-2 hover:bg-slate-100 cursor-pointer">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Captain
            </p>

            <p className="font-medium">{profile?.name}</p>
          </div>
          <StatusBadge status={profile?.status ?? "active"} />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail size={14} />
          {profile?.email}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={14} />
          {profile?.phoneNumber}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Bookings</p>
          <p className="mt-1 text-lg font-semibold">{bookingCount}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Players</p>

          <p className="mt-1 text-lg font-semibold">
            {team.number_of_players ?? 0}
          </p>
        </div>
      </div>

      {/* <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium transition hover:border-green-500">
          View Team
        </button>

        <button className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700">
          Edit
        </button>
      </div> */}
    </div>
  );
}
