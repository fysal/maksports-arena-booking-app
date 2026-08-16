import { CalendarPlus, Users, Clock3, FileText } from "lucide-react";

const actions = [
  {
    title: "New Booking",
    icon: CalendarPlus,
    subtext: "Create new booking",
    color: "#02B467",
  },
  {
    title: "Add Team",
    icon: Users,
    subtext: "Register a new team",
    color: "#0290B4",
  },
  {
    title: "Manage Slots",
    icon: Clock3,
    subtext: "Create or edit slots",
    color: "#B4B102",
  },
  {
    title: "Reports",
    icon: FileText,
    subtext: "Analytics & reports",
    color: "#02B467",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6  shadow-sm">
      <h3 className="mb-6 widget-label">Quick Actions</h3>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.title}
            className="flex items-center gap-2 rounded-xl border border-slate-200
             p-5 px-2 transition hover:border-green-500 hover:bg-green-50 cursor-pointer">
            <div>
              <div
                className="h-8 w-8 flex items-center flex-col justify-center  rounded-full"
                style={{ backgroundColor: action.color+"30" }}>
                <action.icon size={16} style={{color: action.color}} />
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold">{action.title}</p>
              <p className="text-[11px]">{action.subtext}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
