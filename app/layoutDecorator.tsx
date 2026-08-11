"use client";
import React, { useState } from "react";
import { currentUserType } from "./lib/types";
import { TeamContenxt, UserContext } from "./lib/context";
import { ToastContainer } from "react-toastify";
import { Team } from "./types/team";
export default function MainLayoutDecorator({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<
    currentUserType | undefined | null
  >(undefined);

  const [teamInformation, setTeamInformation] = useState<Team | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <TeamContenxt.Provider value={{ teamInformation, setTeamInformation }}>
        {children}
      </TeamContenxt.Provider>
      <ToastContainer />
    </UserContext.Provider>
  );
}
