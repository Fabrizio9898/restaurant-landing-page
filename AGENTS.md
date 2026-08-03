# AGENT.md

## Project

Official restaurant website. It looks like a landing page but should be treated as a product-oriented web app.

Core purpose:
- Showcase the restaurant
- Display the menu
- Handle table reservations
- Allow discounted pre-orders during booking

Goal: improve customer experience before arrival and streamline restaurant operations.

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS
- CSS Modules (when needed)

## Code Principles

- Respect the existing architecture.
- Build small, reusable, typed components.
- Keep components focused on a single responsibility.
- Write clean, maintainable code.
- Do not introduce unnecessary complexity.

## Project Structure

Use and preserve the existing structure:

- layouts
- pages
- components
- ui
- sections
- hooks
- services
- utils
- types

## UI & UX

- Do not invent features or business logic.
- Only implement what is requested.
- Prioritize clear UX, responsive layouts, and visual consistency.
- When designing a page, first define the layout and user flow, then build the requested components.

## Backend

- Assume data comes from an API.
- Keep UI and business logic separated.
- Avoid hardcoded data unless explicitly requested.
- Use services/adapters for data access.

## Behavior

- Do not modify project architecture unless requested.
- Do not add dependencies without justification.
- Do not create unnecessary files.
- Do not change global styles unless requested.
- If information is missing, choose the simplest scalable solution.