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
  BookOpen,
  CalendarDays,
  Clock3,
  CreditCard,
  FileBarChart2,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const links = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: CalendarDays,
    label: "Bookings",
    link: "/dashboard/bookings",
  },
  {
    icon: Users,
    label: "Teams",
    link: "/dashboard/teams",
  },
  {
    icon: Clock3,
    label: "Schedules",
    link: "/dashboard/schedules",
  },
];

const secondary_links = [
  {
    icon: CreditCard,
    label: "Payments",
    link: "/dashboard/payments",
  },
  {
    icon: FileBarChart2,
    label: "Preferences",
    link: "/dashboard/preferences",
  },
  {
    icon: Settings,
    label: "Settings",
    link: "/dashboard/settings",
  },
];

export function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}: {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    AdminHelper.fetchAllTeams({
      setTeams,
    });
  }

  async function fetchProfiles() {
    AdminHelper.fetchAllProfiles({
      setProfiles,
    });
  }

  async function fetchSettings() {
    AdminHelper.fetchSettings(setSettings);
  }

  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [settings]);

  useEffect(() => {
    if (!currentUser) return;

    Promise.all([fetchBookings(), fetchTeams(), fetchProfiles()]);
  }, [currentUser]);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setTimeout(() => {
      setMobileOpen(false);
    }, 0);
  }, [pathname]);

  const isActive = (link: string) => {
    if (link === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);

      // Add toast here if you already use one
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <>
      {/* Mobile Header */}

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 flex flex-col
          bg-[#062E1D] text-white
          transition-all duration-300 ease-in-out

          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

          ${collapsed ? "lg:w-20" : "lg:w-72"}

          w-[280px]
        `}>
        {/* Logo */}
        <div
          className={`
            flex items-center border-b border-white/10
            ${collapsed ? "justify-center px-3" : "justify-between px-7"}
            h-24
          `}>
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={180}
              height={100}
              className={`
                h-auto transition-all duration-300
                ${collapsed ? "w-10 object-cover object-left" : "w-[150px]"}
              `}
            />
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 lg:hidden"
            aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-5">
          {/* Main Navigation */}
          <nav className="px-3">
            {links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.link);

              return (
                <Link
                  href={item.link}
                  key={item.label}
                  title={collapsed ? item.label : undefined}
                  className={`
                    group mb-1.5 flex w-full items-center
                    rounded-xl py-3.5 text-left text-sm
                    font-medium transition-all

                    ${collapsed ? "justify-center px-3" : "gap-4 px-4"}

                    ${
                      active
                        ? "border-l-2 border-yellow-400 bg-white/10 text-white"
                        : "border-l-2 border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  `}>
                  <Icon size={20} className="shrink-0" />

                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="mx-5 my-4 border-t border-white/10" />

          {/* Secondary Navigation */}
          <nav className="px-3">
            {secondary_links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.link);

              return (
                <Link
                  href={item.link}
                  key={item.label}
                  title={collapsed ? item.label : undefined}
                  className={`
                    group mb-1.5 flex w-full items-center
                    rounded-xl py-3.5 text-left text-sm
                    font-medium transition-all

                    ${collapsed ? "justify-center px-3" : "gap-4 px-4"}

                    ${
                      active
                        ? "border-l-2 border-yellow-400 bg-white/10 text-white"
                        : "border-l-2 border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  `}>
                  <Icon size={20} className="shrink-0" />

                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Promo Card */}
          {!collapsed && (
            <div className="mx-3 mt-6 rounded-2xl bg-green-900/60 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <BookOpen size={17} />
              </div>

              <h3 className="font-semibold">Want more bookings?</h3>

              <p className="mt-2 text-sm leading-6 text-green-100/70">
                Share your arena link and grow your bookings.
              </p>

              <button
                type="button"
                onClick={handleCopyLink}
                className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-green-50">
                Copy Link
              </button>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="border-t border-white/10 p-4">
          <div
            className={`
              flex items-center
              ${collapsed ? "justify-center" : "gap-3"}
            `}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-semibold">
              A
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate font-medium">Administrator</p>

                <p className="truncate text-sm text-white/60">Super Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Collapse */}
        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="flex w-full items-center justify-center rounded-xl py-2.5 text-white/50 transition hover:bg-white/10 hover:text-white"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <ChevronIcon collapsed={collapsed} />
          </button>
        </div>
      </aside>

      {/* Mobile content spacer */}
      <div className="h-16 lg:hidden" />
    </>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${
        collapsed ? "rotate-180" : ""
      }`}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
