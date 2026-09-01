"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Users,
  Trophy,
  CalendarDays,
  Search,
  Filter,
  Shield,
  Activity,
} from "lucide-react";
import { StatCard } from "../components/statcards";
import {
  BookingsContext,
  ProfilesContext,
  TeamsContext,
} from "@/app/lib/context";
import { Team } from "@/app/types/team";
import { UserProfile } from "@/app/types/user";
import { TeamCard } from "./TeamCard";
import EditTeamAndProfile from "../components/EditTeamAndProfile";
import Drawer from "@/app/components/Drawer";

interface inforInEditType {
  team: Team | null;
  profile: UserProfile | null;
}

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const { teams } = useContext(TeamsContext);
  const { profiles } = useContext(ProfilesContext);
  const { bookings } = useContext(BookingsContext);

  const [infoInEdit, setInfoInEdit] = useState<inforInEditType>({
    team: null,
    profile: null,
  });

  const drawerRef = useRef<HTMLInputElement>(null);

  const filteredTeams = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return teams?.filter((team: Team) => {
      const matchesTeamName = team.teamName.toLowerCase().includes(searchTerm);

      const matchesProfile = profiles?.some(
        (profile) =>
          profile.uid === team.uid &&
          profile.name.toLowerCase().includes(searchTerm),
      );

      return matchesTeamName || matchesProfile;
    });
  }, [search, teams, profiles]);

  const filterProfileOnTeam = (uid: string): UserProfile | null => {
    const profile = profiles?.find((profile) => profile.uid === uid);

    if (!profile) return null;

    return profile;
  };

  async function toggleDrawer(teamId?: string) {
    if (drawerRef.current === null) return;

    if (drawerRef.current.checked === true) {
      setInfoInEdit({
        team: null,
        profile: null,
      });

      return (drawerRef.current.checked = false);
    }

    const team = teams?.find((team) => team.id === teamId);

    const profile = profiles?.find((profile) => profile.uid === team?.uid);

    if (!team || !profile) return;

    setInfoInEdit({
      team,
      profile,
    });
  }

  const teamBookingCount = (teamId: string): number => {
    return bookings.filter((booking) => booking.teamId === teamId).length;
  };

  useEffect(() => {
    if (infoInEdit.team !== null && drawerRef.current !== null) {
      drawerRef.current.checked = !drawerRef.current.checked;
    }
  }, [infoInEdit]);

  return (
    <div className="drawer drawer-end">
      <input
        id="drawer-controller"
        type="checkbox"
        ref={drawerRef}
        className="drawer-toggle"
      />
      <div className="space-y-6">
        {/* Header */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Teams</h1>

            <p className="mt-1 text-slate-500">
              Manage registered teams, captains and activity.
            </p>
          </div>

          {/* <button
          className="flex items-center gap-2 rounded-lg text-sm bg-green-700 px-4 py-2 font-medium 
        text-white transition hover:bg-green-800 cursor-pointer">
          <Plus size={18} />
          Add Team
        </button> */}
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Teams"
            value={teams?.length}
            icon={<Users size={20} />}
          />

          <StatCard
            title="Active Teams"
            value={teams?.length}
            icon={<Shield size={20} />}
          />

          <StatCard
            title="Bookings"
            value={bookings?.length}
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Arena Usage"
            value="82%"
            icon={<Trophy size={20} />}
          />
        </div>

        {/* Search & Filters */}

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teams..."
                className="h-12 w-full rounded-lg border border-slate-200 pl-11 outline-none focus:border-green-500"
              />
            </div>

            <button className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 px-5">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        {/* Team Grid */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTeams?.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              profile={filterProfileOnTeam(team.uid)}
              bookingCount={teamBookingCount(team.id)}
              toggleDrawer={() => toggleDrawer(team.id)}
            />
          ))}
        </div>

        {/* Activity Section */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Activity size={20} />
            <h3 className="text-lg font-semibold">Recent Team Activity</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              Lions FC booked a slot for tomorrow at 08:00 AM.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              Eagles FC updated team details.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              Tigers FC cancelled a booking.
            </div>
          </div>
        </div>
      </div>
      {/**.Drawer only active team, user and profiles are ready * */}
      {teams && profiles && infoInEdit.profile && infoInEdit.team && (
        <Drawer
          Component={
            <EditTeamAndProfile
              toggleDrawer={() => toggleDrawer(infoInEdit?.team?.id)}
              team={infoInEdit.team}
              profile={infoInEdit.profile}
            />
          }
        />
      )}
    </div>
  );
}
