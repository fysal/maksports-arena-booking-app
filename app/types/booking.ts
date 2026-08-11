export type BookingStatus =
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Booking {
  id: string;

  teamId: string;
  teamName: string;

  date: string;

  startTime: string;
  endTime: string;

  startAt: string;
  endAt: string;

  status: BookingStatus;

  createdBy: string;
  createdAt: string;
}