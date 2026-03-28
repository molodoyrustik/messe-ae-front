# Repository Guidelines

## Project Structure & Module Organization
The app uses the Next.js App Router with strict TypeScript. Key directories:
- `src/app` holds route segments, page metadata, and layout wrappers; add co-located `loading.tsx` or `error.tsx` when needed.
- `src/components` contains shared UI built with MUI and Emotion; reuse existing patterns before introducing new primitives.
- `src/lib`, `src/utils`, and `src/hooks` capture data helpers, pure utilities, and client hooks. Prefer the `@/` alias over long relative paths.
- `src/contexts`, `src/theme`, and `src/types` centralize providers, design tokens, and shared contracts. Static assets live in `public/`.

## Build, Test, and Development Commands
```bash
npm run dev     # Start the TurboPack dev server on :3000
npm run build   # Validate production build output
npm run start   # Serve the built app locally
npm run lint    # Run Next.js ESLint rules (core-web-vitals + TypeScript)
npm run test    # Execute Vitest in jsdom mode
```
Run these from the repository root before opening a pull request.

## Coding Style & Naming Conventions
- TypeScript is strict; resolve compiler warnings and unused exports.
- Use 2-space indentation, double quotes in TS/TSX, and group imports by origin (framework, third-party, internal `@/`, then relative).
- Components and contexts use PascalCase; hooks and utilities use camelCase. Name files after their default export (`ThemeProvider.tsx`, `useMediaQuery.ts`).
- Prefer functional components with explicit prop types and rely on theme tokens or Emotion styles instead of inline CSS overrides.

## Testing Guidelines
- Write unit and integration tests with Vitest and Testing Library. Place files under `__tests__` beside the feature, e.g. `src/lib/api/__tests__/projects.test.ts`.
- Mock network calls with lightweight fixtures; avoid real HTTP requests.
- Cover new branches when adding features or fixes; for regressions, add a failing test before the fix.
- Use `npm run test -- --runInBand` when isolating nondeterministic suites.

## Commit & Pull Request Guidelines
- Keep commit subjects short, imperative, and scoped (e.g. `fix sitemap indexing`).
- PRs must describe user impact, link Jira/GitHub issues, and include screenshots or recordings for UI updates.
- Confirm `npm run lint` and `npm run test` succeed before requesting review; note any intentionally skipped checks in the PR body.

## Environment & Configuration
Store secrets in `.env.local` (git-ignored). At minimum set `NEXT_PUBLIC_GA_TRACKING_ID` for analytics. Document additional variables in the PR that introduces them and keep staging/production values separate.
