import React from 'react'
import SectionHeader from './SectionHeader';
import { CalendarDays, CheckCircle2, UserPlus } from 'lucide-react';
import { Activity } from '../page';

const RecentActivities = () => {
  return (
    <section className="mt-10">
      <SectionHeader
        title="Recent Activity"
        description="A quick look at your team's latest activity."
      />

      <div className="mt-5 rounded-[26px] border border-slate-200 bg-white shadow-sm">
        <Activity
          icon={<CheckCircle2 />}
          title="Booking confirmed"
          description="Saturday, August 15 · 4:00 PM"
          time="2 hours ago"
        />

        <Activity
          icon={<UserPlus />}
          title="New team member added"
          description="Patrick Ssemanda joined the team"
          time="Yesterday"
        />

        <Activity
          icon={<CalendarDays />}
          title="Booking completed"
          description="Saturday, August 2 · 5:00 PM"
          time="9 days ago"
        />
      </div>
    </section>
  );
}

export default RecentActivities