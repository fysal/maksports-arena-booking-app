import { Timestamp } from "firebase/firestore";

export type BookingStatus =
  | "confirmed"
  | "canceled"
  | "completed"
  | "booked"
  | "pending"
  | "in progress"
  | "available";

export type BookingType = {
  bookingId?: string;
  teamId: string;
  teamName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  uid?: string | null;
  createdBy?: string;
  createdAt?: string | Timestamp;
  duration: number;
  contactInformation: ContactPerson;
  teamMembers?: number;
  fee: number;
  number_of_players: number;
  notes?: string;
  admin_name?: string;
};

export type slotBookingType = {
  fee: number;
  duration: number;
  teamName: string;
  teamId: string;
  date: Date;
  contactPerson: string;
  phone: string;
  email: string;
  number_of_players: number;
  notes?: string;
  startTime?: string;
  endTime?: string;
  createdBy: string;
  bookingId?: string;
  status?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  initials: string;
  captain?: boolean;
};

export type ContactPerson = {
  name?: string;
  phone: string;
  email?: string | null;
  uid?: string | null;
};

export type ISlot = {
  startTime: string;
  endTime: string;
  availble: boolean;
};
