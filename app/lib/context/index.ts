import { createContext } from "react";
import { Team } from "@/app/types/team";
import { BookingType } from "@/app/types/booking";
import { currentUserType } from "@/app/types/user";

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
