import { TeamMember } from "@/app/types/booking";
import { Mail, MoreHorizontal, Phone } from "lucide-react";

export default function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 font-bold text-green-700">
          {member.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-bold text-slate-900">{member.name}</h3>

            {member.captain && (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
                Captain
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-400">{member.role}</p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone className="h-4 w-4 text-slate-400" />
          {member.phone}
        </div>

        <div className="mt-2 flex items-center gap-2 truncate text-sm text-slate-500">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          {member.email}
        </div>
      </div>
    </div>
  );
}
