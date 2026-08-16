import { ShieldCheck } from 'lucide-react';
import React from 'react'

const ProtectionBadge = () => {
  return (
    <div className="rounded-[26px] border border-green-100 bg-green-50 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
        <ShieldCheck className="h-5 w-5" />
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        Your bookings are protected
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Confirmed arena slots are protected against double booking.
      </p>
    </div>
  );
}

export default ProtectionBadge