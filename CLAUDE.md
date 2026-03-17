# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (strict port — will fail if in use)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

No test framework is configured.

## Architecture

React + Vite SPA. No TypeScript, no external state library — all state lives in `App.jsx` via hooks.

**State (App.jsx):** `selectedElement`, `selectedCategory`, `searchTerm`, `isFullscreen`

**Component tree:**
```
App
├── SearchBar          (controlled input → searchTerm)
├── CategoryFilter     (buttons → selectedCategory)
├── PeriodicTable      (grid, filtering/search logic, renders Element per item)
│   └── Element        (card; click → setSelectedElement)
└── ElementModal       (conditional overlay for selected element detail)
```

**Data:** `src/data/elements.js` exports `elements` (118 objects) and `categories` (11 categories with color/textColor). Each element has atomic properties, physical properties, `group`/`period` for grid positioning, and `category` for color coding.

**Layout:** CSS Grid with dynamic `gridRow`/`gridColumn` from element data. Lanthanides (period 9) and actinides (period 10) are repositioned to fit the standard periodic table layout — handled inside `PeriodicTable.jsx`.

**Filtering:** Implemented in `PeriodicTable.jsx`. Matches search against `name`, `symbol`, or `atomicNumber`. Category filter and search compose additively. Matched elements get a glow/scale highlight via CSS class.

**Fullscreen:** Uses the browser Fullscreen API (`requestFullscreen`/`exitFullscreen`) with an Escape key listener. In fullscreen, header/footer hide and category filter labels abbreviate.

## Deployment

`vite.config.js` sets `base: '/periodic-table/'`, so all asset paths are rooted there. The app is deployed to GitHub Pages via `.github/workflows/` — `npm run build` output goes to `dist/`. Running `npm run preview` locally also serves under `/periodic-table/`.

## ESLint

Uses ESLint 9 flat config format. Variables matching `/^[A-Z_]/` may be unused without warning (allows unused component imports and constants).
