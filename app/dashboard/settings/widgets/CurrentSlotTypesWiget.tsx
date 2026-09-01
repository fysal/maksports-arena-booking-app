import { Globe2 } from "lucide-react";
import React from "react";
import { currencyConverter } from "@/app/lib/utils/utils";
import { SlotPricing } from "@/app/types/settings";

const CurrentSlotTypesWiget = ({
  slotPricing,
}: {
  slotPricing: SlotPricing[];
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <Globe2 size={19} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Arena Configuration</h3>

          <p className="text-sm text-slate-500">Current booking setup</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {slotPricing.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-800">
                {slot.duration} Minutes
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {currencyConverter(slot.price)}
              </p>
            </div>

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                slot.enabled ? "bg-green-500" : "bg-slate-300"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentSlotTypesWiget;
