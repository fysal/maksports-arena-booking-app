import React from "react";
import { Toggle } from "../page";

const SystemMaintenanceControl = ({
  maintenanceMode,
  setMaintenanceMode,
  setSavingRequired,
}: {
  maintenanceMode: boolean;
  setMaintenanceMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSavingRequired: React.Dispatch<
    React.SetStateAction<{
      message: string;
      isRequired: boolean;
    }>
  >;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900">System Controls</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        Manage availability of the booking platform.
      </p>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/50 p-4">
        <div>
          <p className="font-medium text-slate-800">Maintenance Mode</p>

          <p className="mt-1 text-xs text-slate-500">
            Temporarily disable bookings.
          </p>
        </div>

        <Toggle
          checked={maintenanceMode}
          onChange={() => {
            setMaintenanceMode((current) => !current);

            setSavingRequired((current) => ({
              ...current,
              isRequired: true,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default SystemMaintenanceControl;
