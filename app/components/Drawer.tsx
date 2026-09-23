/* eslint-disable @typescript-eslint/no-explicit-any */

const Drawer = ({
  Component,
  elementId = "my-drawer-5",
}: {
  Component: any;
  elementId?: string;
}) => {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor={elementId}
        aria-label="close sidebar"
        className="drawer-overlay"></label>

      <div className="menu bg-base-200 min-h-full w-xl p-4">{Component}</div>
    </div>
  );
};

export default Drawer;
