import React from "react";

const ScheduleLegends = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Schedule Legend</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-green-500" />
          <span>Available</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <span>Booked</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-amber-500" />
          <span>Reserved</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <span>Blocked</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLegends;
