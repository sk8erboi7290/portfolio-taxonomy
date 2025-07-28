🧭 Project Goal: WorldTimeBuddy Clone (Interactive Timezone Grid UI)
A full-featured, interactive time zone converter that visually aligns hours across locations. The UX must closely follow the reference at worldtimebuddy.com.

✅ Core Features (기능 요약)
1. 🕒 Location List Panel
Add multiple locations (e.g., "Seoul", "UTC", "New York")

Each location includes:

City name

Country

Timezone abbreviation (e.g., KST, UTC)

Current time (real-time updating)

2. 📅 Date & Time Grid
Horizontally scrollable 24-hour grid

1-hour columns

Vertically aligned rows for each location

Current time block visually highlighted

Optional toggle between 24h and AM/PM

3. 🖱️ Interactive Timeline Selector
Clickable timeline block highlights same moment across time zones

Hover = light highlight

Click = strong selection border (e.g., select 21:00 → all rows show aligned 21:00 in each time zone)

4. 📆 Date Navigation
Date picker (calendar dropdown or ← July 27 | July 28 | July 29 →)

Grid updates to selected day

"Today" highlight bar persists if selected date is today

5. ➕ Add/Remove Locations
Location search input (auto-suggest with debounce)

Add to top/bottom of list

Remove location (via ❌ icon or ‘Remove’ button)

🧱 Layout Structure (구성 요소)
tsx
복사
편집
<AppLayout>
  <Header>World Time Buddy Clone</Header>

  <DatePickerBar />
  
  <TimeGrid>
    <LocationRow location="Seoul" />
    <LocationRow location="UTC" />
    <LocationRow location="Suwon" />
    ...
  </TimeGrid>
</AppLayout>
🎨 UI Interaction Details
Element	Behavior
Hover on time block	Subtle highlight
Click on time block	Show vertical selection line
Scroll left/right	Moves full 24h grid
Add Location	Opens dropdown input with suggestions
Remove Location	One-click remove from list
Current Time	Highlighted (e.g., blue block)
Grid Alignment	All time blocks horizontally synchronized

⚙️ Tech Stack Recommendations
📦 Frontend: Next.js (App Router), TailwindCSS

📆 Date/time lib: luxon

📚 UI lib (optional): shadcn/ui

🧠 State: useState, useRef, useEffect

🖱️ Scroll sync: manual ref syncing or libraries like react-scroll-sync

📋 Suggested File Structure
swift
복사
편집
/app/tools/worldtimebuddy
├── page.tsx
├── components/
│   ├── LocationRow.tsx
│   ├── TimeCell.tsx
│   ├── DatePicker.tsx
│   └── AddLocationInput.tsx
├── utils/
│   └── timezone.ts
└── styles/
    └── worldtime.css (optional)
🪜 Recommended Implementation Steps
 Set up static LocationRow with mock data for 3 cities

 Add horizontal scrollable 24h grid layout

 Implement click/hover time highlighting

 Create dynamic timezone conversion logic (luxon)

 Add location search + removal

 Date navigation UI

 Real-time current time indicator (highlight bar)

 Final polish: mobile responsiveness, hover tooltips, dark mode (optional)

