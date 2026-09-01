"use client";

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface Props {
  slots: TimeSlot[];
  selected?: string;
  onSelect: (slot: TimeSlot) => void;
}

export default function TimeSlotPicker({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {slots.map((slot) => {
        const active = selected === slot.startTime;

        return (
          <button
            key={slot.startTime}
            disabled={!slot.available}
            onClick={() => onSelect(slot)}
            className={`
              rounded-xl border px-4 py-4
              text-sm font-semibold
              transition

              ${
                !slot.available
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : active
                    ? "border-black bg-black text-white"
                    : "bg-white hover:border-black"
              }
            `}>
            {slot.startTime}
            {" - "}
            {slot.endTime}

            {!slot.available && (
              <span className="mt-1 block text-xs">Unavailable</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
