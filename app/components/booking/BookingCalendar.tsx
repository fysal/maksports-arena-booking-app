"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface Props {
  onSelect: (date: Date) => void;
}

export default function BookingCalendar({
  onSelect,
}: Props) {
  const [selected, setSelected] =
    useState<Date>();

  function handleSelect(
    date: Date | undefined,
  ) {
    if (!date) return;

    setSelected(date);
    onSelect(date);
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={{
          before: new Date(),
        }}
      />
    </div>
  );
}