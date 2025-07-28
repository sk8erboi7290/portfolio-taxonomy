// lib/utils/worldtime.ts
import { DateTime } from "luxon";

export const getCityTimeSlots = (city: { label: string; zone: string }, date: Date) => {
  const dt = DateTime.fromJSDate(date).setZone(city.zone);
  return Array.from({ length: 24 }, (_, i) => dt.set({ hour: i, minute: 0 }));
};

export const cities = [
  { label: "UTC", zone: "UTC" },
  { label: "Seoul", zone: "Asia/Seoul" },
  { label: "New York", zone: "America/New_York" },
];
