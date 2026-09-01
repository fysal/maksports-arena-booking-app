export default function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group relative px-2 md:px-5">
      
      {/* Main card */}
      <div className="relative flex h-full flex-col items-center text-center">
        
        {/* Step circle */}
        <div className="relative z-10">
          
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-full bg-green-400/10 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
          {/* Number circle */}
          <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-green-400/30 bg-slate-900 shadow-[0_0_0_8px_rgba(34,197,94,0.05)] transition-all duration-500 group-hover:scale-110 group-hover:border-green-400 group-hover:shadow-[0_0_0_12px_rgba(34,197,94,0.08)]">
            
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:bg-green-400">
              
              {icon}
            </div>
            {/* Number */}
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-900 bg-white text-[10px] font-black text-slate-900 shadow-sm">
              
              {number}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="mt-7 max-w-xs">
          
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-green-400">
            
            Step {number}
          </p>
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-green-400">
            
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            
            {description}
          </p>
        </div>
     
      </div>
    </div>
  );
}
