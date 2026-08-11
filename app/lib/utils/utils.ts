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
