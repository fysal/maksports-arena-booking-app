import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyConverter(value: bigint | number) {
  const formatter = Intl.NumberFormat("en-us", {
    currency: "UGX",
    style: "currency",
  });
  return formatter.format(value);
}

export function generateRandomIds() {
  return "MSA_" + crypto.randomBytes(5).toString("hex").toUpperCase();
}

export const getISOWeek = (date: Date = new Date()) => {
  const tempDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const dayNumber = tempDate.getUTCDay() || 7;

  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  return Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
};


export const getWeekOfMonth = (date: Date = new Date()) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const firstDayOfWeek = firstDay.getDay() || 7; // Monday = 1

  return Math.ceil((date.getDate() + firstDayOfWeek - 1) / 7);
};

