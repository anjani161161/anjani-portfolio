# TanStack Start Portfolio (Vite + React)

A personal portfolio web app built with **TanStack Start** (file-based routing) and **React**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routing (TanStack Start)](#routing-tanstack-start)
- [Development Scripts](#development-scripts)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- Modern UI components
- File-based routing
- Responsive layout
- Case studies / projects section with images
- Theme / interactive UI elements (accordion, tabs, dialogs, etc.)

---

## Tech Stack

- **React**
- **TanStack Start** (routing + app structure)
- **Vite**
- **TypeScript**
- **Tailwind CSS** (via `@tailwindcss/vite`)
- **Radix UI** (component primitives)
- **recharts**, **lucide-react**, **sonner** (UI utilities)

---

## Getting Started

### 1) Install dependencies

```bash
bun install
```

### 2) Run in development mode

```bash
bun run dev
```

### 3) Build for production

```bash
bun run build
```

### 4) Preview production build

```bash
bun run preview
```

---

## Project Structure

Key folders/files:

- `src/routes/`
  - Route entry files (`.tsx`) using TanStack Start file-based routing
  - `__root.tsx` is the app shell / root layout
- `src/components/`
  - Reusable UI components
  - Portfolio-specific sections
- `src/lib/`
  - Utilities, configuration, and data (e.g. portfolio data)
- `src/assets/`
  - Images used by the UI (hero image + project images)

---

## Routing (TanStack Start)

TanStack Start uses **file-based routing**.

Rules (high level):

- Every `.tsx` file in `src/routes/` becomes a route.
- The only root layout is `src/routes/__root.tsx`.
- `routeTree.gen.ts` is auto-generated and should not be edited.

---

## Development Scripts

From `package.json` / Bun scripts:

- `dev` → `vite dev`
- `build` → `vite build`
- `build:dev` → `vite build --mode development`
- `preview` → `vite preview`
- `lint` → `eslint .`
- `format` → `prettier --write .`

---

## Deployment

Common options:

- Vercel / Netlify (static hosting where supported)
- Any Node-capable host that can run Vite build artifacts

Add your preferred deployment steps here, including:

- Environment variables
- Build command
- Output directory
