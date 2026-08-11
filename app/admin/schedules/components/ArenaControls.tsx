import React from 'react'

const ArenaControls = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Arena Controls</h3>

      <div className="space-y-3">
        <button className="w-full rounded-2xl border border-slate-200 p-3 text-left transition hover:border-green-500">
          Generate Weekly Slots
        </button>

        <button className="w-full rounded-2xl border border-slate-200 p-3 text-left transition hover:border-green-500">
          Extend Operating Hours
        </button>

        <button className="w-full rounded-2xl border border-slate-200 p-3 text-left transition hover:border-green-500">
          Bulk Open Slots
        </button>

        <button className="w-full rounded-2xl border border-slate-200 p-3 text-left transition hover:border-green-500">
          Close Selected Slots
        </button>
      </div>
    </div>
  );
}

export default ArenaControls