"use client";
import { useContext, useEffect, useMemo } from "react";
import { BookingsContext, TeamsContext } from "../lib/context";
import { BookingTrends } from "./components/bookingtrendchart";
import { DashboardHeader } from "./components/dashboardheader";
import { QuickActions } from "./components/quickaction";
import { RecentBookings } from "./components/RecentBookings";
import { StatsOverview } from "./components/statcardgrid";
import {
  filterTodaysSchedules,
  TodaySchedule,
} from "./components/todayschedule";
import AdminHelper from "../lib/firebase/admin_helper_functions";
import { usePathname } from "next/navigation";

export default function AdminDashboard() {
  const { teams, setTeams } = useContext(TeamsContext);
  const { bookings } = useContext(BookingsContext);

  const pathname = usePathname();

  const todaysScheduleCount = useMemo(
    () => filterTodaysSchedules(bookings),
    [bookings],
  )?.length;

  useEffect(() => {
    const unsubscribe = AdminHelper.fetchAllTeams({ setTeams });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <div className="">
        <DashboardHeader showForm={true} />

        <div className="mt-8 space-y-6">
          <div>
            <h1 className="font-bold text-3xl">
              Welcome back, Administrator 👋
            </h1>
            <p className="text-md text-slate-500">
              Here is what is happening at Mak Sports Arena
            </p>
          </div>
          <StatsOverview
            todaysScheduleCount={todaysScheduleCount}
            teams={teams?.length}
          />

          <div className="grid gap-4 xl:grid-cols-5">
            <BookingTrends className="xl:col-span-3" />
            <TodaySchedule className="xl:col-span-2" />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <RecentBookings className="xl:col-span-2" />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
