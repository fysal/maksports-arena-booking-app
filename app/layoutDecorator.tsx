"use client";
import React, { useState } from "react";
import { SettingsContext, TeamContenxt, UserContext } from "./lib/context";
import { ToastContainer } from "react-toastify";
import { Team } from "./types/team";
import { currentUserType } from "./types/user";
import { Settings } from "./types/settings";
export default function MainLayoutDecorator({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<
    currentUserType | undefined | null
  >(undefined);

  const [teamInformation, setTeamInformation] = useState<Team | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null); 
  
  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <TeamContenxt.Provider value={{ teamInformation, setTeamInformation }}>
          {children}
        </TeamContenxt.Provider>
        <ToastContainer />
      </UserContext.Provider>
    </SettingsContext.Provider>
  );
}
