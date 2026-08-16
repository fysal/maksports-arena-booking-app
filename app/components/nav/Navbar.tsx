/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TeamContenxt, UserContext } from "@/app/lib/context";
import {
  checkCurrentUserExists,
  loadTeamInformaition,
  logoutUser,
} from "@/app/lib/firebase/auth";
import {
  LogOut,
  CircleUser,
  Users,
  CalendarDays,
  LayoutDashboard,
  Clock3,
  CreditCard,
  FileBarChart2,
  Settings,
  CircleDollarSign,
} from "lucide-react";


  const iconSize = 16;

export   const adminMenu = [
  {
    icon: <LayoutDashboard size={iconSize} />,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <CalendarDays size={iconSize} />,
    name: "Bookings",
    link: "/dashboard/bookings",
  },
  {
    icon: <Users size={iconSize} />,
    name: "Teams",
    link: "/dashboard/teams",
  },
  {
    icon: <Clock3 size={iconSize} />,
    name: "Schedules",
    link: "/dashboard/schedules",
  },
  { icon: <CircleDollarSign size={iconSize} />, name: "Payments", link: "#" },
  { icon: <Settings size={iconSize} />, name: "Settings", link: "#" },
];


const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { teamInformation, setTeamInformation } = useContext(TeamContenxt);
  const userMenu = [
    {
      name: "My Account",
      link: "/",
      icon: <CircleUser size={iconSize} />,
    },
    {
      name: "Manage Team",
      link: "/team-management",
      icon: <Users size={iconSize} />,
    },
  ];



  async function fetchTeamInformation(uid: string) {
    const result: any = await loadTeamInformaition(uid);

    setTeamInformation(result);
  }

  useEffect(() => {
    if (currentUser === undefined) {
      //load user information
      checkCurrentUserExists(setCurrentUser);
    }
  }, [currentUser, setCurrentUser]);

  async function signout() {
    await logoutUser();
  }

  useEffect(() => {
    if (currentUser && !teamInformation) {
      fetchTeamInformation(currentUser.uid);
    }
  }, [currentUser, teamInformation]);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="py-1">
          <Image
            src="/images/logo-v2.png"
            width={150}
            height={100}
            alt="Logo"
          />
        </Link>

        {!currentUser && (
          <div className="flex items-center gap-3">
            <Link
              href="/auth?act=login"
              className="rounded-xl px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
              Login
            </Link>

            <Link
              href="/auth?act=register"
              className="rounded-xl bg-black px-5 py-2 font-medium text-white transition hover:bg-slate-900">
              Register Team
            </Link>
          </div>
        )}

        {currentUser && (
          <div className="flex items-center gap-3">
            <div className="font-semibold"> Hello,</div>
            <div>{currentUser?.name?.split(" ")[0]}</div>
            <div className="dropdown dropdown-end">
              <Image
                src={currentUser.photoUrl ?? "/images/default-avatar.jpg"}
                className="rounded-full cursor-pointer"
                width={40}
                height={40}
                alt="avatar"
                role="button"
                tabIndex={0}
              />
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {(currentUser.accountType === "admin"
                  ? adminMenu
                  : userMenu
                ).map((item, idx: number) => (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
