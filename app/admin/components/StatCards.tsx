import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  trend?: string;
  icon: ReactNode;
  color?: string;
}

export function StatCard({
  title,
  value,
  trend,
  icon,
  color = "#008230",
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 px-4  shadow-slate-300">
      <div className="flex gap-5">
        <div
          className={`flex h-13 w-13 items-center justify-center rounded-full`}
          style={{ backgroundColor: color + "20", color }}>
          {icon}
        </div>
        <div>
          <p className="text-slate-500 text-sm ">{title}</p>
          <h3 className="mt-2 text-xl font-bold">{value}</h3>
         {trend && <p className="mt-2 text-sm text-green-600">{trend} vs yesterday</p>}
        </div>
      </div>
    </div>
  );
}
