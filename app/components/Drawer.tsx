/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Drawer = ({ Component }: { Component: any }) => {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-5"
        aria-label="close sidebar"
        className="drawer-overlay"></label>

      <div className="menu bg-base-200 min-h-full w-xl p-4">{Component}</div>
    </div>
  );
};

export default Drawer;
