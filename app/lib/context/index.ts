import { createContext } from "react";
import { currentUserType } from "../types";
import { Team } from "@/app/types/team";
import { Booking } from "@/app/types/booking";

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
  bookings: Booking[],
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export const BookingsContext = createContext<bookingsContextType>({
  bookings: [],
  setBookings: () => { }
});