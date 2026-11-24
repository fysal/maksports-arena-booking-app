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
  console.log(slots);
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
              cursor-pointer
             
              ${
                !slot.available
                  ? "cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-400"
                  : active
                    ? "border-green-800 bg-green-600 text-white hover:bg-green-600"
                    : "bg-white hover:border-black  hover:bg-green-500 hover:border-slate-700"
              }
            `}>
            {slot.startTime}
            {" - "}
            {slot.endTime}
          </button>
        );
      })}
    </div>
  );
}
