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

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[] | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <ProfilesContext.Provider value={{ profiles, setProfiles }}>
          <TeamsContext.Provider value={{ teams, setTeams }}>
            <BookingsContext.Provider value={{ bookings, setBookings }}>
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </BookingsContext.Provider>
          </TeamsContext.Provider>
        </ProfilesContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
};

export default WithAdminRoutes(AdminLayout);
