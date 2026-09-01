export default function FeatureCard({
  num,
  icon,
  title,
  description,
}: {
  num: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-green-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-green-400/10 blur-2xl transition-all duration-500 group-hover:bg-green-400/20" />
      {/* Large background number */}
      <span className="pointer-events-none absolute right-5 top-3 text-6xl font-black tracking-tighter text-green-600/10 transition-colors duration-300 group-hover:text-green-600/20">
        0{num}
      </span>
      {/* Icon */}
      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${num % 2 !== 3 ? "bg-green-50 text-green-600" : "bg-green-600 text-white"}  transition-all duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-600/20`}>
          {icon}
        </div>
        {/* Small active indicator */}
        <span className="mt-2 h-2 w-2 rounded-full bg-green-500 opacity-40 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100" />
      </div>
      {/* Content */}
      <div className="relative mt-7">
        <h3 className="text-lg font-bold tracking-tight text-green-700 transition-colors group-hover:text-green-700">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-600 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
