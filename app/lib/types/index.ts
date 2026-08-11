export type currentUserType = {
  uid: string;
  teamName: string;
  name: string;
  phoneNumber: string;
  accountType: string;
  photoUrl: string;
  email: string;
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
