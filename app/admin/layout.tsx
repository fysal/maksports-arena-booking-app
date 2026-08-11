import React from "react";
import { Sidebar } from "./components/Sidebar";

const adminLayout = ({children} : {children : React.ReactNode}) => {


    return <div className="flex min-h-screen bg-slate-50">

        <Sidebar />
         <main className="flex-1 p-6">
              {children}
              </main>
    </div>;




}

export default adminLayout;