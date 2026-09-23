"use client";
import {
  BookingsContext,
  ProfilesContext,
  SettingsContext,
  TeamsContext,
  UserContext,
} from "@/app/lib/context";
import AdminHelper from "@/app/lib/firebase/admin_helper_functions";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock3,
  CreditCard,
  FileBarChart2,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard" },
  { icon: CalendarDays, label: "Bookings", link: "/dashboard/bookings" },
  { icon: Users, label: "Teams", link: "/dashboard/teams" },
  { icon: Clock3, label: "Schedules", link: "/dashboard/schedules" },
];

const secondary_links = [
  { icon: CreditCard, label: "Payments", link: "/dashboard/payments" },
  { icon: FileBarChart2, label: "Preferences", link: "/dashboard/preferences" },
  { icon: Settings, label: "Settings", link: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  const { setBookings } = useContext(BookingsContext);
  const { currentUser } = useContext(UserContext);
  const { setProfiles } = useContext(ProfilesContext);
  const { setTeams } = useContext(TeamsContext);
  const { settings, setSettings } = useContext(SettingsContext);

  async function fetchBookings() {
    await AdminHelper.fetchAllBooking({
      setBookings,
    });
  }

  async function fetchTeams() {
    AdminHelper.fetchAllTeams({ setTeams });
  }

  async function fetchProfiles() {
    AdminHelper.fetchAllProfiles({ setProfiles });
  }

  async function fetchSettings() {
    AdminHelper.fetchSettings(setSettings);
  }

  useEffect(() => {
    if (!settings) fetchSettings();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([fetchBookings(), fetchTeams(), fetchProfiles()]);
  }, [currentUser]);

  return (
    <aside className="flex w-72 flex-col bg-[#062E1D] text-white">
      <Link
        href="/dashboard"
        className="p-8 border-b border-b-slate-100/10 mb-5">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={180}
          height={100}
          className="w-[150px] h-auto"
        />
      </Link>
      <div className="flex-1">
        <nav className="px-4">
          {links.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className={`mb-2 flex w-full text-sm items-center gap-4 rounded-xl px-4 py-4 text-left 
                transition-all hover:bg-white/10 cursor-pointer 
              ${pathname === item.link ? "border-l border-l-1 border-l-yellow-400 bg-white/10" : "bg-transparent"}`}>
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-100/20 mx-5 my-2" />
        <nav className="px-4">
          {secondary_links.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className={`mb-2 flex w-full text-sm items-center gap-4 rounded-xl px-4 py-4 text-left 
                transition-all hover:bg-white/10 cursor-pointer 
              ${pathname === item.link ? "border-l border-l-1 border-l-yellow-400 bg-white/10" : "bg-transparent"}`}>
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="m-4 rounded-3xl bg-green-900/60 p-5">
        <h3 className="font-semibold">Want more bookings?</h3>

        <p className="mt-2 text-sm text-green-100">
          Share your arena link and grow your bookings.
        </p>

        <button className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900">
          Copy Link
        </button>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
            A
          </div>

          <div>
            <p className="font-medium">Administrator</p>
            <p className="text-sm text-white/60">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
