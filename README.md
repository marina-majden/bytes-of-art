# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
lit-art-project
├── .react-router
├── app/
│   ├── assets/       # Static assets
│   ├── components/   # Components
│   ├── data/         # Data files 
│   ├── lib/          # Shared business logic
│   ├── routes/       # Route modules / pages
│   ├── types/        # Type definitions
│   ├── app.css       # App-level styles
│   ├── root.tsx      # Root component
│   └── routes.ts     # Route definitions  
│   ├── public/         # Static assets
│   ├── routes/    # Route definitions
├── node_modules/   # Node modules
├── public/         # Static assets
├── .dockerignore
├── .gitignore
├── .hintrc
├── components.json
├── Dockerfile
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── react-router-config.ts
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

---
# a) Mathematical/Table Form Review

| Area                | Quality      | Notes / Issues                                                                              | Score (1-5) |
|---------------------|-------------|--------------------------------------------------------------------------------------------|-------------|
| Code Cleanliness    | Good        | Mostly clean and modular, but some duplication and variable naming issues                   | 4           |
| Effectiveness       | High        | Logical structure, interactive UX achieved, but occasional redundant logic                  | 4           |
| Best Practices      | Mostly Good | Uses hooks, separate utility files, modularization; some old/unused code present            | 4           |
| Naming Conventions  | Mixed       | Several names are good, but others (e.g. Card, CardContent as functions, iffy variable ids) | 3           |
| Consistency         | Fair        | Some components use different logic for the same actions (e.g. mobile detection logic)      | 3           |
| Unused Code         | Yes         | Some example code (e.g. destinations in Bento) for travel, not relevant to art lessons      | 2           |
| Logic Uniformity    | Mixed       | Some logic branched in different ways, not uniform (e.g. theme logic, grid logic)           | 3           |
| Content Quality     | High        | Content is thoughtful, rich, bilingual, points out concepts clearly                        | 5           |
| UX/UI Friendliness  | High        | Immersive, animated, clear navigation, responsive design                                   | 4           |
| First-Time UX       | Very Good   | Landing content clear, but symbol references can be dense for total beginners               | 4           |

---

# b) Coherent Text Summary & Recommendations

## Code Quality & Best Practices

- The project follows modern React/TypeScript best practices, with good use of hooks, modularized components, and responsive style (Tailwind).
- Utility functions (e.g. `cn()` for merging classes) simplify code readability.
- Occasional duplicate logic exists: e.g. theme logic and card grid initialization, which could be unified through shared helpers.
- Some unused code/components (e.g. travel `destinations` array in `Bento.tsx`) appear left over, which can cause confusion.
- Variable and component naming is sometimes inconsistent or unclear (e.g. a function named `Card` and `CardContent`, sometimes with type oddities). More descriptive naming would help maintainability and onboarding.
- There are signs of data imported from different sources with slightly different formatting (e.g. `bentoCardData` in multiple locations).
- Mobile detection and animation disabling logic might be simplified and gathered in a custom hook.

## Consistency & Logic

- Theming/logical branches (impressionism/expressionism, etc.) sometimes handled by if-else locally, sometimes by a themeStyles object. A context/provider for theme selection would help consistency.
- Grid and card logic occasionally repeats similar checks/branches in several places (refactor: DRY).
- Magic strings (`md:col-span-1 md:row-span-1`) could be extracted to constants or mapped from card data for clarity.

## Content & UX Review

- The educational content is rich, interdisciplinary, and the theme-based toggles work smoothly.
- UI is engaging for new visitors: navigable, responsive, and styles are immersive and clear.
- Some headers (e.g. symbol names, lesson names) could be visually emphasized for clarity.
- Navigation text is in native language (Croatian), which is authentic but possibly not internationalized; adding i18n support may help.
- The density of information in certain tabular areas (like symbolism) could be overwhelming for very new visitors; more tooltips or progressive disclosure could improve onboarding.

---

## Suggested Changes & Improvements

1. **Remove unused code/props**:
   - Delete travel-related data structures/components not relevant to the project's educational/art focus.

2. **Unify naming conventions**:
   - Use more descriptive names for functions/components (e.g. `BentoArtCard` instead of `Card`, `ThemeToggleButton` instead of `PerceptionToggle`).
   - Avoid generic variable names (`data`, `content`, etc) for deeply nested objects.

3. **Centralize theme/context logic**:
   - Use React Context for global theme and animation state to avoid prop drilling and improve uniformity.

4. **Refactor repeated logic**:
   - Move repeated grid/card initializations and mobile detection to custom hooks or helpers.

5. **Internationalization**:
   - Consider adding i18n for multi-language support. At minimum, provide an easy toggle for English/Croatian.

6. **Improve onboarding for new users**:
   - Add tooltips, helper popups, or short guides for first-time visitors.
   - Make click/tap effects more obvious or provide instructions for interactive elements.

7. **UI enhancements**:
   - Standardize header/component styles.
   - Ensure contrast and accessibility (test for vision-impaired modes).
   - Add ARIA tags where needed for better A11y.

8. **Content structure**:
   - Consider a short 'About' or 'How to Use' section on landing screens.
   - Use progressive disclosure for content-heavy pages (expand sections on demand).

---

## Summary Table (Improvements)

| Area              | Change                | Why?                          |
|-------------------|----------------------|-------------------------------|
| Naming            | Unify & clarify       | Easier maintenance            |
| Logic             | DRY, central theme    | More robust, less bugs        |
| Unused Code       | Remove                | Reduce confusion, faster load |
| i18n              | Add                  | Welcoming for global users    |
| Onboarding        | Tooltips/help         | Guide new visitors            |
| A11y/UI           | Consistent, accessible| Inclusive audience            |

