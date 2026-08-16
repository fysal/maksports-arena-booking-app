"use client";
import { Trophy } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#f7faf8]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-500/5 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo / Icon */}
        <div className="relative">
          {/* Outer pulse */}
          <div className="absolute -inset-5 animate-ping rounded-[28px] bg-green-500/10" />

          {/* Glow */}
          <div className="absolute -inset-3 rounded-[24px] bg-green-500/10 blur-xl" />

          {/* Logo container */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-slate-950 shadow-xl shadow-slate-900/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/30">
              <Trophy className="h-6 w-6 animate-bounce" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="mt-8 text-center">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            Maksports
            <span className="text-green-600"> Arena</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">Getting things ready...</p>
        </div>

        {/* Loading indicator */}
        <div className="mt-7 flex items-center gap-2">
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-green-600"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-green-600"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-green-600"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Progress line */}
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-loader rounded-full bg-green-600" />
        </div>
      </div>
    </div>
  );
}
