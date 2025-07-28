
# 🛠 World Time Buddy Clone – A to Z Implementation Guide for Claude Code

This document provides a **strict step-by-step development checklist** for implementing a World Time Buddy clone with full feature parity and user experience similar to [https://www.worldtimebuddy.com](https://www.worldtimebuddy.com). Follow every step precisely.

---

## 🔧 Step 0. Setup & Dependencies

- Create or confirm a Next.js 13+ app (with App Router) setup.
- Install `luxon` for timezone handling:

```
pnpm add luxon
```

- Ensure Tailwind CSS and shadcn/ui is installed and configured.

---

## 📁 Step 1. Static Grid Layout

- Render a **static 24xN** table (N = number of cities).
- Columns = 24 hours (00:00 ~ 23:00)
- Rows = UTC, Seoul (KST), New York (EST) – default cities.
- Use Tailwind grid/flex utilities. Do NOT hardcode widths.

```tsx
<div className="grid grid-cols-[150px_repeat(24,_minmax(40px,_1fr))]">
  {/* Location column + 24 hourly columns */}
</div>
```

- Each cell shows the converted time (`HH:mm`) for the city's time zone on the selected day.

---

## 🧭 Step 2. Date Navigation

- Add 3 controls at top right:
  - `Today` button → resets to today
  - `<` and `>` buttons → subtract/add one day

- Use `useState` to manage `selectedDate: DateTime`
- Clicking buttons should update `selectedDate` and re-render grid.

```tsx
const [selectedDate, setSelectedDate] = useState(DateTime.local());
```

---

## ⏰ Step 3. Current Time Indicator (Live)

- Add `DateTime.now().setZone(...)` to get current time for each city.
- Display current time in row label (`12:38`, `21:38`, etc.)
- Use `useEffect` + `setInterval(() => { setNow(DateTime.now()) }, 1000)` for real-time updates

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setNow(DateTime.now());
  }, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 🎯 Step 4. Clickable Highlighting

- Allow user to **click any hour column**.
- Highlight that column across all rows with **orange border**.
- Use `selectedHour` state to track the active column.

```tsx
const [selectedHour, setSelectedHour] = useState<number | null>(null);
```

- On cell click, update state. If same column is clicked again, deselect.

---

## 🌍 Step 5. Add / Remove Locations

- Add a search bar with city autocomplete (at least fixed list: `['UTC', 'Seoul', 'New York', 'London', 'Tokyo', 'Sydney']`).
- On selection, append the city to state: `cities: { name, zone }[]`
- Prevent duplicates (`UTC` should not be removable).
- Render each city in its own row.

- Add small ❌ icon to the right of each city row (except UTC). Clicking removes the city.

---

## 🌓 Step 6. Time Format Toggle

- Add toggle at top-right to switch between `24h` and `12h` formats.
- Use boolean state `is24Hour: boolean`
- Render time strings accordingly:

```tsx
time.toFormat(is24Hour ? "HH:mm" : "h:mm a")
```

---

## ✅ Final Output Expectations

- Functional 24-hour horizontal time grid.
- City rows with dynamic time conversion.
- Clickable hour highlight across all rows.
- Real-time current time on left.
- Add/remove city rows (except UTC).
- 24h / AMPM toggle.
- Full Tailwind styling (hover, rounded, spacing, responsiveness).

---

## ⚠️ Things NOT to Miss

- Grid must re-render on date/hour toggle.
- Only one hour block can be highlighted at a time.
- Today button should jump to today and reset hour selection.
- No page reloads – all should be done with state.

---

## 📦 Bonus

- (Optional) Scrollable X-axis for long time tables on small screens.
- (Optional) Keyboard shortcuts for date navigation.

---

**DO NOT proceed to later steps unless the earlier ones are completed and visually working.**

This guide must be followed exactly for a fully functioning clone.
