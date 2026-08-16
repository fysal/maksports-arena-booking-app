export type BookingStatus = "confirmed" | "cancelled" | "completed" | "pending";

export type BookingType = {
  bookingId?: string;
  teamId: string;
  teamName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status?: BookingStatus;
  uid?: string | null;
  createdBy?: string;
  createdAt?: string;
  duration: number;
  contactInformation: ContactPerson;
  teamMembers?: number;
  fee: number;
  numberOfPlayers: number;
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
  numberOfPlayers: number;
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

type ContactPerson = {
  name?: string;
  phone: string;
  email?: string | null;
  uid?: string | null;
};
