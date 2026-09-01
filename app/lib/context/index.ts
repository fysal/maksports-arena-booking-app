"use client";
import { createContext } from "react";
import { Team } from "@/app/types/team";
import { BookingType } from "@/app/types/booking";
import { currentUserType, UserProfile } from "@/app/types/user";
import { Settings } from "@/app/types/settings";

type userContextType = {
  currentUser: currentUserType | undefined | null;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<currentUserType | null | undefined>
  >;
};
export const UserContext = createContext<userContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

type teamContextType = {
  teamInformation: Team | null;
  setTeamInformation: React.Dispatch<React.SetStateAction<Team | null>>;
};

export const TeamContenxt = createContext<teamContextType>({
  teamInformation: null,
  setTeamInformation: () => {},
});

type bookingsContextType = {
  bookings: BookingType[];
  setBookings: React.Dispatch<React.SetStateAction<BookingType[]>>;
};

export const BookingsContext = createContext<bookingsContextType>({
  bookings: [],
  setBookings: () => {},
});

type teamsContextType = {
  teams: Team[] | null;
  setTeams: React.Dispatch<React.SetStateAction<Team[] | null>>;
};

export const TeamsContext = createContext<teamsContextType>({
  teams: null,
  setTeams: () => {},
});

type userProfileType = {
  profiles: UserProfile[] | null;
  setProfiles: React.Dispatch<React.SetStateAction<UserProfile[] | null>>;
};

export const ProfilesContext = createContext<userProfileType>({
  profiles: null,
  setProfiles: () => {},
});


type settingsContextType = {
  settings: Settings | null;
  setSettings: React.Dispatch<React.SetStateAction<Settings | null>>
}

export const SettingsContext = createContext<settingsContextType>({
  settings: null,
  setSettings: () => {},
});