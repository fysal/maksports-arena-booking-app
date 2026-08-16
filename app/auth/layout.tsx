'use client'
import { Fragment } from "react/jsx-runtime";
import WithAuthRoutes from "../RouteProtection/authRoutes";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
    {children}
    </Fragment>
  );
};

export default WithAuthRoutes(AuthLayout);
