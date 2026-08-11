import { cn } from "@/app/lib/utils/utils";

type ScheduleStatus = "Available" | "Booked" | "In Progress" | "Canceled";

const schedule: Array<{
  timeSlot: string;
  teamName: string;
  status: ScheduleStatus;
}> = [
  {
    timeSlot: "08:00 AM - 09:00 AM",
    teamName: "Kampala United",
    status: "Booked",
  },
  {
    timeSlot: "09:00 AM - 10:00 AM",
    teamName: "Mak Lions",
    status: "Booked",
  },
  {
    timeSlot: "10:00 AM - 11:00 AM",
    teamName: "",
    status: "Available",
  },
  {
    timeSlot: "11:00 AM - 12:00 PM",
    teamName: "City Strikers",
    status: "Booked",
  },
  {
    timeSlot: "12:00 PM - 01:00 PM",
    teamName: "",
    status: "Canceled",
  },
  {
    timeSlot: "01:00 PM - 02:00 PM",
    teamName: "Thunder FC",
    status: "Booked",
  },
  {
    timeSlot: "02:00 PM - 03:00 PM",
    teamName: "",
    status: "Available",
  },
  {
    timeSlot: "03:00 PM - 04:00 PM",
    teamName: "Elite Warriors",
    status: "Booked",
  },
  {
    timeSlot: "04:00 PM - 05:00 PM",
    teamName: "Green Stars",
    status: "In Progress",
  },
  {
    timeSlot: "05:00 PM - 06:00 PM",
    teamName: "Victory SC",
    status: "Booked",
  },
  {
    timeSlot: "06:00 PM - 07:00 PM",
    teamName: "",
    status: "Available",
  },
  {
    timeSlot: "07:00 PM - 08:00 PM",
    teamName: "Blue Eagles",
    status: "Booked",
  },
];
const statusColors: Record<ScheduleStatus, string> = {
  Available: "#15803d",
  Booked: "#1d4ed8",
  "In Progress": "#95B409",
  Canceled: "#b45309",
};

export function TodaySchedule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `rounded-xl border border-slate-100 bg-white p-6 shadow-sm`,
        className,
      )}>
      <div className="mb-6 flex justify-between">
        <h3 className="widget-label">Todays Schedule</h3>

        <button className="text-xs text-slate-600">View Full Schedule</button>
      </div>

      <div className="space-y-2">
        {schedule.slice(0, 7).map((item) => (
          <div
            key={item.timeSlot}
            className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-6">
              <p className="font-medium text-xs">{item.timeSlot}</p>
              <p className="text-xs text-slate-500 font-semibold">
                {item.teamName}
              </p>
            </div>

            <span
              className="rounded-lg bg-green-100 px-3 py-1 text-[12px] font-medium text-green-700"
              style={{
                backgroundColor: statusColors[item.status] + "10",
                color: statusColors[item.status],
              }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
