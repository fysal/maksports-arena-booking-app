"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Trophy,
  CalendarDays,
  Search,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Filter,
  Shield,
  Activity,
} from "lucide-react";
import { StatCard } from "../components/StatCards";

type TeamStatus = "active" | "inactive" | "suspended";

interface Team {
  id: string;
  name: string;
  captain: string;
  email: string;
  phone: string;
  members: number;
  bookings: number;
  status: TeamStatus;
  logo?: string;
}

const teams: Team[] = [
  {
    id: "TM001",
    name: "Lions FC",
    captain: "John Doe",
    email: "john@lionsfc.com",
    phone: "+256700000001",
    members: 18,
    bookings: 24,
    status: "active",
  },
  {
    id: "TM002",
    name: "Eagles FC",
    captain: "Peter James",
    email: "peter@eaglesfc.com",
    phone: "+256700000002",
    members: 16,
    bookings: 18,
    status: "active",
  },
  {
    id: "TM003",
    name: "Tigers FC",
    captain: "Moses K",
    email: "moses@tigersfc.com",
    phone: "+256700000003",
    members: 20,
    bookings: 12,
    status: "inactive",
  },
];

function StatusBadge({ status }: { status: TeamStatus }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-slate-100 text-slate-700",
    suspended: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[status]
      }`}>
      {status}
    </span>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6  transition hover:border-green-400 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700">
            {team.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{team.name}</h3>

            <p className="text-sm text-slate-500">{team.members} members</p>
          </div>
        </div>

        <button className="rounded-xl p-2 hover:bg-slate-100">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mt-6">
        <StatusBadge status={team.status} />
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Captain
          </p>

          <p className="font-medium">{team.captain}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail size={14} />
          {team.email}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={14} />
          {team.phone}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Bookings</p>

          <p className="mt-1 text-lg font-semibold">{team.bookings}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Players</p>

          <p className="mt-1 text-lg font-semibold">{team.members}</p>
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

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const filteredTeams = useMemo(
    () =>
      teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teams</h1>

          <p className="mt-1 text-slate-500">
            Manage registered teams, captains and activity.
          </p>
        </div>

        <button
          className="flex items-center gap-2 rounded-lg text-sm bg-green-700 px-4 py-2 font-medium 
        text-white transition hover:bg-green-800 cursor-pointer">
          <Plus size={18} />
          Add Team
        </button>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Teams" value="18" icon={<Users size={20} />} />

        <StatCard title="Active Teams" value="14" icon={<Shield size={20} />} />

        <StatCard
          title="Bookings"
          value="124"
          icon={<CalendarDays size={20} />}
        />

        <StatCard title="Arena Usage" value="82%" icon={<Trophy size={20} />} />
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
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
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
  );
}
