import { Bell, Calendar, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          placeholder="Search anything..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-12"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 text-sm bg-white px-4">
          <Calendar size={15} />
          <span className="text-xs">
            {new Date().toLocaleDateString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </button>

        <button className="relative rounded-xl bg-white p-3">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div>
          <button className="rounded-full h-5 w-5 p-5 bg-slate-300 flex items-center justify-center font-bold">
            A
          </button>
        </div>
      </div>
    </header>
  );
}
