# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forma is a React‑based calisthenics training application built with Vite. It offers a linear A‑Z progression of bodyweight skills, adaptive workout plans, and comprehensive performance tracking.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (hot‑reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint the codebase
npm run lint
```

*There is currently no test script configured. If tests are added, a typical command would be `npm test` or a framework‑specific command such as `npx vitest run`.*

## Deployment

The repository uses a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the app on pushes to the `main` branch and deploys the `dist` folder to GitHub Pages.

- To view the CI run locally: `gh run list` and `gh run view <run-id>`.
- The site is served from `https://<owner>.github.io/<repo>` after a successful deployment.

## High‑Level Architecture

### Entry Point & Rendering
- **src/main.jsx** – bootstraps the React app, applies the `ThemeProvider`, and renders `<App />` into the `#root` element.

### Core App Structure
- **src/App.jsx** – sets up a `HashRouter`, defines top‑level routes (`/`, `/roadmap`, `/profile`), and manages the optional skill‑detail modal.
- **Routing** – uses `react-router-dom`'s `HashRouter` for client‑side navigation, suitable for static hosting.

### State Management
- **src/hooks/useFormaState.js** – central hook that stores user data, active/mastered skills, workout history, and daily workout cycle. Persists to `localStorage` with migration support.
- **src/hooks/useProgression.js**, **useWorkoutSession.js**, **useWorkoutEngine.js** – handle workout lifecycle, progression logic, and timing.

### Theme & Styling
- **src/theme/ThemeContext.jsx** – provides dark/light theme context.
- **src/components/ThemeToggle.jsx** – UI toggle for the theme.
- Tailwind CSS is configured via `tailwind.config.cjs`; utility‑first classes drive the UI.

### Data Layer
- **src/data/curriculum.js** – defines 174+ skills with IDs, difficulty tiers, and exercise prescriptions.
- **src/data/training‑plans/** – contains phase‑based plans for each skill; `default-plan.js` supplies fallbacks.
- **src/data/exercises/** – utility modules for hold‑based and rep‑based exercises.

### Key Components (selected)
- `Layout.jsx` – layout wrapper with navigation tab bar.
- `TabBar.jsx` – top navigation (Home, Roadmap, Profile).
- `ExerciseCard.jsx`, `CriteriaTracker.jsx` – UI for individual exercises and form‑quality tracking.
- `SkillDetail.jsx` – modal showing detailed skill info and workout controls.

### Data Flow Summary
1. **Assessment** (currently disabled) would set the starting skill index.
2. **Training plan** generates a phased list of exercises for the current skill.
3. **Workout session** tracks timers, reps, and performance ratings.
4. **Progression hook** updates difficulty based on recent results.
5. **State hook** persists changes and updates the roadmap view.

## CI / GitHub Actions

- The `deploy.yml` workflow runs on pushes to `main`.
- Steps: checkout → Node setup → `npm ci` → `npm run build` → upload `dist` as GitHub Pages artifact.
- Permissions: `contents: read`, `pages: write`, `id-token: write`.

## Miscellaneous Notes

- Assessment flow is temporarily bypassed; users land directly on the app.
- Skills are identified by unique IDs referenced throughout the code.
- Workout sessions support both hold‑based and rep‑based exercises.
- Form‑quality tracking ensures proper execution before progression.
