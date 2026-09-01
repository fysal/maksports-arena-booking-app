"use client";
import { CalendarCheck2, DollarSign, Users, Trophy } from "lucide-react";
import { StatCard } from "./statcards";


export function StatsOverview({
  todaysScheduleCount = 0,
  revenue = "UGX 1.2M",
  teams = 0,
  occupancy = 18,
}: {
  todaysScheduleCount?: number;
    revenue?: string;
    teams?: number | string;
    occupancy?:string | number
}) {
  const iconSize = 20;




  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Bookings Today"
        value={todaysScheduleCount}
        trend="+12%"
        icon={<CalendarCheck2 size={iconSize} />}
      />

      <StatCard
        title="Revenue Today"
        value={ revenue}
        trend="+8%"
        color="#D5B101"
        icon={<DollarSign size={iconSize} />}
      />

      <StatCard
        title="Active Teams"
        value={ teams }
        trend="+2"
        color="#6410CB"
        icon={<Users size={iconSize} />}
      />

      <StatCard
        title="Arena Occupancy"
        value={occupancy}
        trend="+15%"
        color="#0E52BE"
        icon={<Trophy size={iconSize} />}
      />
    </div>
  );
}
