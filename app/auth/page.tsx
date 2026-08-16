"use client";

import Navbar from "../components/nav/Navbar";
import TeamLogin from "./widgets/teamLogin";
import RegisterTeam from "./widgets/registerTeam";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

export default function AuthPage() {
  const tabs = ["login", "register team"];

  const [activeTab, setActiveTab] = useState<number>(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.get("act");
    if (!params) return;

    const timeout = setTimeout(() => {
      if (params.toLowerCase() === "register") setActiveTab(1);
      else setActiveTab(0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 mb-10">
        <div className="w-full">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              ⚽ MAK Sports Arena
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Team Access Portal
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Login to manage your bookings or register your team and start
              reserving arena time.
            </p>
          </div>

          {/* Auth Sections */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm">
              {tabs.map((tab: string, idx: number) => {
                const isActive = idx === activeTab;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`
            relative rounded-xl px-6 py-3
            cursor-pointer
            text-sm font-semibold capitalize
            transition-all duration-200
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-green-500
            focus-visible:ring-offset-2
            ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
            }
          `}>
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-2xl m-auto">
            {/* Login Section */}
            {activeTab === 0 && (
              <div>
                <TeamLogin />
              </div>
            )}
            {/* Registration Section */}
            {activeTab === 1 && <RegisterTeam />}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-slate-500">
            By continuing you agree to the Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
