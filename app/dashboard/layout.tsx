"use client";
import React, { useState } from "react";
import { BookingType } from "../types/booking";
import {
  BookingsContext,
  ProfilesContext,
  SettingsContext,
  TeamsContext,
} from "../lib/context";
import WithAdminRoutes from "../RouteProtection/adminRoutes";
import { Sidebar } from "./components/sidebar";
import { Team } from "../types/team";
import { UserProfile } from "../types/user";
import { Settings } from "../types/settings";
import { DashboardHeader } from "./components/dashboardheader";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[] | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <ProfilesContext.Provider value={{ profiles, setProfiles }}>
          <TeamsContext.Provider value={{ teams, setTeams }}>
            <BookingsContext.Provider value={{ bookings, setBookings }}>
              <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
              <main className="flex-1 p-6">
                <header className="relative rounded mb-6 left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-[#062E1D] px-4 lg:hidden">
                  <Link href="/dashboard">
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={140}
                      height={70}
                      className="h-auto w-[120px]"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                    aria-label="Open navigation">
                    <Menu size={21} />
                  </button>
                </header>
                {!["/dashboard"].includes(pathname) ? (
                  <DashboardHeader />
                ) : (
                  <div />
                )}

                {children}
              </main>
            </BookingsContext.Provider>
          </TeamsContext.Provider>
        </ProfilesContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
};

export default WithAdminRoutes(AdminLayout);
