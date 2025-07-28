// app/tools/worldtime/page.tsx
"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const defaultCities = [
  { label: "UTC", zone: "UTC" },
  { label: "Seoul", zone: "Asia/Seoul" },
  { label: "New York", zone: "America/New_York" },
];

const getCityTimeSlots = (city: { label: string; zone: string }, date: DateTime) => {
  const dt = date.setZone(city.zone);
  return Array.from({ length: 24 }, (_, i) => dt.set({ hour: i, minute: 0 }));
};

export default function WorldTimePage() {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [cities, setCities] = useState(defaultCities);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [is24h, setIs24h] = useState(true);

  const addCity = (zone: string, label: string) => {
    if (!cities.some(c => c.zone === zone)) {
      setCities([...cities, { label, zone }]);
    }
  };

  const removeCity = (zone: string) => {
    setCities(cities.filter(c => c.zone !== zone || c.zone === "UTC"));
  };

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour === selectedHour ? null : hour);
  };

  const formatHour = (hour: number) => {
    if (is24h) return hour.toString().padStart(2, "0") + ":00";
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? "AM" : "PM";
    return `${h}${ampm}`;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🕓 World Time Buddy</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setIs24h(!is24h)} className="px-3 py-1 border rounded text-sm">
            {is24h ? "24h" : "12h"}
          </button>
          <button onClick={() => setSelectedDate(DateTime.now())} className="px-3 py-1 border rounded text-sm">
            Today
          </button>
          <button onClick={() => setSelectedDate(selectedDate.minus({ days: 1 }))} className="px-3 py-1 border rounded text-sm">
            &lt;
          </button>
          <span className="font-semibold">{selectedDate.toFormat("cccc, LLL dd yyyy")}</span>
          <button onClick={() => setSelectedDate(selectedDate.plus({ days: 1 }))} className="px-3 py-1 border rounded text-sm">
            &gt;
          </button>
        </div>
      </div>

      <div className="overflow-auto border rounded-md">
        <table className="min-w-[1200px] border-collapse table-fixed text-sm text-center">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="w-32 border px-2 py-1">Location</th>
              {Array.from({ length: 24 }, (_, i) => (
                <th
                  key={i}
                  onClick={() => handleHourClick(i)}
                  className={`border px-1 py-1 w-16 cursor-pointer ${selectedHour === i ? "bg-orange-200" : ""}`}
                >
                  {formatHour(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => {
              const timeSlots = getCityTimeSlots(city, selectedDate);
              return (
                <tr key={city.label}>
                  <td className="border font-medium bg-gray-50 px-2 py-1 sticky left-0 z-10 bg-white">
                    {city.label}
                    {city.zone !== "UTC" && (
                      <button onClick={() => removeCity(city.zone)} className="ml-1 text-xs text-red-500">✕</button>
                    )}
                  </td>
                  {timeSlots.map((t, idx) => (
                    <td
                      key={idx}
                      className={`border px-1 py-1 ${selectedHour === idx ? "bg-orange-100" : ""}`}
                    >
                      {t.toFormat(is24h ? "HH:mm" : "h:mm a")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}