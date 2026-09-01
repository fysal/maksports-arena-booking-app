import React from "react";

const SettingsStatCard = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: number | string;
  subtext?: string | null;
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

      <p className="mt-2 text-xs font-medium text-green-600">{subtext}</p>
    </div>
  );
};

export default SettingsStatCard;
