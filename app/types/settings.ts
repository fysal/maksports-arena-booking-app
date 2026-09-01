
export interface SlotPricing {
  id: string;
  duration: number;
  price: number;
  enabled: boolean;
}

export type Settings = {

    slotPricing : SlotPricing [],
      operatingHours: {
        openingTime: string,
        closingTime: string,
      },
      bookingRules: {
        advanceBookingDays: number,
        minimumBookingHours:number,
      },
      cancellation: {
        allowCancellation: boolean,
        cancellationHours: number | string,
      },
      payments: {
        requirePayment:boolean,
      },
      notifications: {
        bookingNotifications: boolean,
        emailNotifications:boolean,
      },
      system: {
        maintenanceMode: boolean,
      },
}