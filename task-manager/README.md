# My Task Manager

A fully functional Task Manager built with Next.js 16, React 19, and Tailwind CSS v4 as part of ISM3232 Module 10.

## How to Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

- [x] Add tasks — controlled form with blank input validation
- [x] Toggle done — tasks display visually different when complete
- [x] Delete tasks — permanently removes a single task
- [x] Filter view — All / Active / Done filter buttons
- [x] Stats bar — live total, active, and completed counts
- [x] Clear completed — removes all done tasks at once
- [x] Persist on refresh — tasks saved to localStorage

## Design Decisions

I chose a **Colorful** design direction with:
- Purple, pink, and yellow gradient background
- Rounded pill-shaped buttons and cards
- Color-coded stats (green for active, pink for completed)
- Emoji accents for personality (✅, ✨, 🗑️)
- Clean white card container with shadow for the task board

## AI Usage Log

- **Asked Copilot to help scaffold each component** — Copilot generated the initial structure for TaskBoard, TaskList, TaskCard, AddTaskForm, and TaskStats. I reviewed every line and added my own comments explaining the why behind each decision.
- **Asked Copilot to explain concepts** — I asked why React requires immutable state updates, why useEffect dependency arrays matter, and why localStorage must be read in useEffect instead of useState in Next.js. These explanations informed my comments.
- **Asked Copilot to help with Tailwind styling** — Copilot suggested the purple/pink color palette and rounded design. I adjusted spacing and chose which emoji accents to include.