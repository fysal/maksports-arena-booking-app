/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookingStatus } from "@/app/types/booking";
import { TeamStatus } from "@/app/types/team";

export default function StatusBadge({
  status,
}: {
  status?: BookingStatus | TeamStatus | any;
}) {
  const styles: Record<string, string> = {
    confirmed: "bg-green-50 text-green-700 border-green-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    completed: "bg-slate-100 text-slate-600 border-slate-200",
    cancelled: "bg-red-50 text-red-700 border-red-100",
    canceled: "bg-red-50 text-red-700 border-red-100",
    active: "bg-green-50 text-green-700 border-green-100",
    inactive: "bg-amber-50 text-amber-700 border-amber-100",
    blocked: "bg-red-50 text-red-700 border-red-100",
    suspended: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${styles[status!] ?? ""}`}>
      {status}
    </span>
  );
}
