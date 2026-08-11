import React from "react";

const BlockArena = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Block Arena</h3>

      <div className="space-y-4">
        <input
          type="date"
          className="h-12 w-full rounded-2xl border border-slate-200 px-4"
        />

        <textarea
          rows={4}
          placeholder="Reason for blocking date..."
          className="w-full rounded-2xl border border-slate-200 p-4"
        />

        <button className="w-full rounded-2xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700">
          Block Selected Date
        </button>
      </div>
    </div>
  );
};

export default BlockArena;
