import { CalendarCheck2, DollarSign, Users, Trophy } from "lucide-react";
import { StatCard } from "./StatCards";

export function StatsOverview() {
    const iconSize = 20;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Bookings Today"
        value="24"
        trend="+12%"
        icon={<CalendarCheck2 size={iconSize}/>}
      />

      <StatCard
        title="Revenue Today"
        value="UGX 1.2M"
        trend="+8%"
        color="#D5B101"
        icon={<DollarSign size={iconSize}/>}
      />

      <StatCard
        title="Active Teams"
        value="18"
        trend="+2"
        color="#6410CB"
        icon={<Users size={iconSize}/>}
      />

      <StatCard
        title="Arena Occupancy"
        value="82%"
        trend="+15%"
        color="#0E52BE"
        icon={<Trophy size={iconSize}/>}
      />
    </div>
  );
}
