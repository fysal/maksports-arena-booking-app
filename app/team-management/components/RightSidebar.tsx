import React from "react";
import QuickAction from "./QuickAction";
import { ArrowRight, CalendarDays, Edit3, Mail, Phone } from "lucide-react";
import { ContactRow } from "../page";
import { currentUserType } from "@/app/types/user";

const RightSidebar = ({
  currentUser,
  toggleDrawer,
}: {
  currentUser?: currentUserType | null;
  toggleDrawer: () => void;
}) => {
  return (
    <aside className="space-y-6">
      {/* Quick actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">Quick Actions</h3>

        <div className="mt-4 space-y-2">
          <QuickAction
            icon={<CalendarDays />}
            title="Book Arena"
            description="Find an available slot"
            href="/booking"
          />

          <button
            type="button"
            onClick={toggleDrawer}
            className="flex w-full items-center group cursor-pointer justify-between gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white w-5  transitione">
                <Edit3 className="h-5  " />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Edit Team
                </p>

                <p className="text-xs text-slate-400">
                  Update team information
                </p>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600" />
          </button>

          {/* <QuickAction
                    icon={<UserPlus />}
                    title="Add Member"
                    description="Invite a teammate"
                    href="#"
                  /> */}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">Team Contact</h3>

        <div className="mt-5 space-y-4">
          <ContactRow icon={<Phone />} value={currentUser?.phoneNumber} />

          <ContactRow icon={<Mail />} value={currentUser?.email} />
        </div>
      </div>

      {/* Protection */}
      {/* <ProtectionBadge/> */}
    </aside>
  );
};

export default RightSidebar;
