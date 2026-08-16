"use client";

import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  ShieldCheck,
  Trophy,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import ProtectionBadge from "./components/ProtectionBadge";
import SectionHeader from "./components/SectionHeader";
import TeamStat from "./components/TeamStat";
import MemberCard from "./components/MemberCard";
import ScheduleRow from "./components/ScheduleRow";
import StatusBadge from "./components/StatusBadge";
import BookingCard from "./components/BookingCard";
import { BookingsContext, TeamContenxt, UserContext } from "../lib/context";
import { BookingType, TeamMember } from "../types/booking";

const members: TeamMember[] = [
  {
    id: "1",
    name: "Brian Okello",
    role: "Team Captain",
    phone: "+256 700 111 222",
    email: "brian@example.com",
    initials: "BO",
    captain: true,
  },
  {
    id: "2",
    name: "David Mugisha",
    role: "Player",
    phone: "+256 701 222 333",
    email: "david@example.com",
    initials: "DM",
  },
  {
    id: "3",
    name: "James Kato",
    role: "Player",
    phone: "+256 702 333 444",
    email: "james@example.com",
    initials: "JK",
  },
  {
    id: "4",
    name: "Patrick Ssemanda",
    role: "Player",
    phone: "+256 703 444 555",
    email: "patrick@example.com",
    initials: "PS",
  },
];

/* ============================================================= */
/* PAGE */

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "schedule" | "members"
  >("overview");

  const [showInvite, setShowInvite] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const { bookings } = useContext(BookingsContext);

  const { teamInformation: team } = useContext(TeamContenxt);

  const { currentUser } = useContext(UserContext);

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "schedule",
      label: "Schedule",
    },
    {
      id: "members",
      label: "Team Members",
    },
  ];
  const upcomingBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        (booking.status.toLowerCase() === "confirmed" ||
          booking.status.toLowerCase() === "pending") &&
        new Date(booking.date).getTime() > now,
    );
  }, [bookings, now]);

  const completedBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.status.toLowerCase() === "completed",
      ),
    [bookings],
  );


  return (
    <main className="min-h-screen bg-[#f7faf8]">
      {/* ======================================================= */}
      {/* HEADER */}
      {/* ======================================================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Link
                  href="/dashboard"
                  className="transition hover:text-slate-900">
                  Dashboard
                </Link>

                <ChevronRight className="h-4 w-4" />

                <span className="text-slate-600">Team</span>
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Team Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your team, members and arena schedule.
              </p>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700">
              <Plus className="h-5 w-5" />
              New Booking
            </Link>
          </div>
        </div>
      </header>

      {/* ======================================================= */}
      {/* CONTENT */}
      {/* ======================================================= */}

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* ===================================================== */}
        {/* TEAM HERO */}
        {/* ===================================================== */}

        <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-xl md:p-8">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              {/* Team logo */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br from-green-400 to-green-600 text-2xl font-black text-white shadow-lg shadow-green-500/20 uppercase">
                {team?.teamName.substring(0, 2)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black md:text-3xl">
                    {team?.teamName}
                  </h2>

                  <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    Mak Sports Arena
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {/* { team?.createdAt} */}
                    Since{" "}
                    {team?.createdAt &&
                      new Date(team!.createdAt)?.getFullYear()}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {members.length} members
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Edit3 className="h-4 w-4" />
              Edit Team
            </button>
          </div>

          {/* Stats */}
          <div className="relative mt-8 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
            <TeamStat label="Matches" value={bookings.length} />

            <TeamStat label="Wins" value={0} />

            <TeamStat label="Upcoming" value={upcomingBookings.length} />
          </div>
        </section>

        {/* ===================================================== */}
        {/* TABS */}
        {/* ===================================================== */}

        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id as "overview" | "schedule" | "members")
                }
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* OVERVIEW */}
        {/* ===================================================== */}

        {activeTab === "overview" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Upcoming schedule */}
            <section>
              <SectionHeader
                title="Upcoming Schedule"
                description="Your team's next arena sessions."
                action={
                  <button
                    type="button"
                    onClick={() => setActiveTab("schedule")}
                    className="text-sm font-semibold text-green-600 hover:text-green-700">
                    View all
                  </button>
                }
              />

              <div className="mt-5 space-y-4">
                {upcomingBookings.map((booking: BookingType) => (
                  <BookingCard key={booking.bookingId} booking={booking} />
                ))}
              </div>

              {upcomingBookings.length === 0 && (
                <EmptyState
                  icon={<CalendarDays />}
                  title="No upcoming bookings"
                  description="Your team doesn't have any upcoming arena sessions."
                  action="Book a slot"
                  href="/booking"
                />
              )}
            </section>

            {/* Right sidebar */}
            <aside className="space-y-6">
              {/* Quick actions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">Quick Actions</h3>

                <div className="mt-4 space-y-2">
                  <QuickAction
                    icon={<CalendarDays />}
                    title="Book Arena"
                    description="Find an available slot"
                    href="/booking"
                  />

                  <button
                    type="button"
                    onClick={() => setShowInvite(true)}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <UserPlus className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Add Member
                      </p>

                      <p className="text-xs text-slate-400">
                        Invite a teammate
                      </p>
                    </div>
                  </button>

                  <QuickAction
                    icon={<Edit3 />}
                    title="Edit Team"
                    description="Update team information"
                    href="#"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">Team Contact</h3>

                <div className="mt-5 space-y-4">
                  <ContactRow
                    icon={<Phone />}
                    value={currentUser?.phoneNumber}
                  />

                  <ContactRow icon={<Mail />} value={currentUser?.email} />
                </div>
              </div>

              {/* Protection */}
              {/* <ProtectionBadge/> */}
            </aside>
          </div>
        )}

        {/* ===================================================== */}
        {/* SCHEDULE */}
        {/* ===================================================== */}

        {activeTab === "schedule" && (
          <section className="mt-8">
            <SectionHeader
              title="Team Schedule"
              description="View and manage your team's arena bookings."
              action={
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                  Book Slot
                </Link>
              }
            />

            <div className="mt-5 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
              <div className="divide-y divide-slate-100">
                {bookings.sort((a,b) => b.date.localeCompare(a.date)).map((booking) => (
                  <ScheduleRow key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================== */}
        {/* MEMBERS */}
        {/* ===================================================== */}

        {activeTab === "members" && (
          <section className="mt-8">
            <SectionHeader
              title="Team Members"
              description={`${members.length} people currently associated with your team.`}
              action={
                <button
                  type="button"
                  onClick={() => setShowInvite(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
                  <UserPlus className="h-4 w-4" />
                  Add Member
                </button>
              }
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* ===================================================== */}
        {/* RECENT ACTIVITY */}
        {/* ===================================================== */}
      </div>

      {/* ======================================================= */}
      {/* INVITE MODAL */}
      {/* ======================================================= */}

      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Add Team Member
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Invite someone to join your team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Input label="Full Name" placeholder="Enter member name" />

              <Input
                label="Email Address"
                placeholder="member@example.com"
                type="email"
              />

              <Input label="Phone Number" placeholder="+256 ..." />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ============================================================= */
/* BOOKING CARD */
/* ============================================================= */

/* ============================================================= */
/* SCHEDULE ROW */
/* ============================================================= */

/* ============================================================= */
/* STATUS */
/* ============================================================= */

/* ============================================================= */
/* MEMBER CARD */
/* ============================================================= */

/* ============================================================= */
/* QUICK ACTION */
/* ============================================================= */

function QuickAction({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>

        <p className="text-xs text-slate-400">{description}</p>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600" />
    </Link>
  );
}

/* ============================================================= */
/* CONTACT */
/* ============================================================= */

function ContactRow({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        {icon}
      </div>

      <span className="truncate text-sm text-slate-600">{value}</span>
    </div>
  );
}

/* ============================================================= */
/* ACTIVITY */
/* ============================================================= */

export function Activity({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 p-5 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <span className="shrink-0 text-xs text-slate-400">{time}</span>
    </div>
  );
}

/* ============================================================= */
/* EMPTY STATE */
/* ============================================================= */

function EmptyState({
  icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="rounded-[26px] border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
        <Plus className="h-4 w-4" />
        {action}
      </Link>
    </div>
  );
}

/* ============================================================= */
/* INPUT */
/* ============================================================= */

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
      />
    </label>
  );
}
