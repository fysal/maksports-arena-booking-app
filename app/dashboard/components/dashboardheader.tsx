"use client";
import { adminMenu } from "@/app/components/nav/Navbar";
import { UserContext } from "@/app/lib/context";
import { logoutUser } from "@/app/lib/firebase/auth";
import { ArrowLeft, Bell, Calendar, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export function DashboardHeader() {
  const iconSize = 16;

  const { currentUser } = useContext(UserContext);

  async function signout() {
    await logoutUser();
  }

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
        <Link
          href="/"
          className="text-sm flex items-center hover:bg-slate-200 p-2 rounded">
          <ArrowLeft size={13} /> <span>Go Home</span>
        </Link>
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
        <div className="dropdown dropdown-end">
          <div
            className="avatar avatar-online avatar-placeholder"
            tabIndex={0}
            role="button">
            <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full uppercase cursor-pointer">
              <span className="text-xl">
                {currentUser?.name.substring(0, 2)}
              </span>
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {adminMenu.map((item, idx: number) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  className="flex items-center justify-start gap-3">
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
            <button
              onClick={signout}
              className="flex items-center rounded gap-3 px-3 py-2 hover:bg-black/10 cursor-pointer">
              <LogOut size={iconSize} />
              Logout
            </button>
          </ul>
        </div>
      </div>
    </header>
  );
}
