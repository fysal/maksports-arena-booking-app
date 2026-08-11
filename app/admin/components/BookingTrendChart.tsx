import { cn } from "@/app/lib/utils/utils";
import ChatStats from "./ChatStats";

export function BookingTrends({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-6 shadow-sm",
        className,
      )}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="widget-label">Booking Trends</h3>

        <select className="select rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option>This Week</option>
        </select>
      </div>

      <div className="h-[300px] rounded-2xl bg-slate-50">
        <ChatStats />
      </div>
    </div>
  );
}
