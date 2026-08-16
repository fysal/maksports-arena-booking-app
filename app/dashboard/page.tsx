import { DashboardHeader } from "@/app/dashboard/components/DashboardHeader";
import { TodaySchedule } from "@/app/dashboard/components/TodaySchedule";
import { RecentBookings } from "@/app/dashboard/components/RecentBookings";
import { QuickActions } from "@/app/dashboard/components/QuickAction";
import { StatsOverview } from "./components/StatCardGrid";
import { BookingTrends } from "./components/BookingTrendChart";

export default function AdminDashboard() {
  return (
    <div className="">
      <div className="">
        <DashboardHeader />

        <div className="mt-8 space-y-6">
          <div>
            <h1 className="font-bold text-3xl">
              Welcome back, Administrator 👋
            </h1>
            <p className="text-md text-slate-500">
              Here is what is happening at Mak Sports Arena
            </p>
          </div>
          <StatsOverview />

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
