# AGENTS.md

## Project

Restaurant landing page. The landing (index) is already designed and approved.

Current focus: **reservations** — the flow is reserving only (no menu in the reservation step). The menu may get its own page later.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

Node >= 22.12. Stack: Astro, TypeScript, Tailwind CSS.

## Rules

- Do not touch the index page unless explicitly asked to integrate a component.
- Do not invent features or business logic. Only implement what is requested.
- UI changes: avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.

## Backend

Separate repo (provided on request). Data comes from an API.
