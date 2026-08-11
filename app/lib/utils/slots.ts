export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export function generateTimeSlots({
  openingTime = "08:00",
  closingTime = "23:59",
  durationMinutes = 60,
}: {
  openingTime?: string;
  closingTime?: string;
  durationMinutes? :number;
}): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const [openHour, openMinute] = openingTime.split(":").map(Number);

  const [closeHour, closeMinute] = closingTime.split(":").map(Number);

  const openingMinutes = openHour * 60 + openMinute;
  const closingMinutes = closeHour * 60 + closeMinute;

  for (
    let startMinutes = openingMinutes;
    startMinutes + durationMinutes <= closingMinutes;
    startMinutes += durationMinutes
  ) {
    const endMinutes = startMinutes + durationMinutes;

    const startHour = Math.floor(startMinutes / 60);
    const startMinute = startMinutes % 60;

    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    slots.push({
      startTime: `${String(startHour).padStart(2, "0")}:${String(
        startMinute,
      ).padStart(2, "0")}`,
      endTime: `${String(endHour).padStart(2, "0")}:${String(
        endMinute,
      ).padStart(2, "0")}`,
    });
  }

  return slots;
}
