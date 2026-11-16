# Stage 8: AI log

## Tools
- Claude (Claude Code, in the terminal)

## Conversations
- Local Claude Code session (no public share link)

## Key requests

### 1. Checking stage 7 before moving on
- **Asked**: I asked Claude to confirm that stage 7 was complete before starting stage 8.
- **Got**: It compared the code with table 7.3 from the stage 7 guide (all `data-testid` attributes present, `tw.json` in the repository root) and checked that the stage 7 commits were pushed.
- **Changed or rejected**: Nothing had to change for stage 7.

### 2. Routing, layout and the detail page
- **Asked**: I asked for stage 8 to be implemented following the guide, adapted to SafeInstal.
- **Got**: `BrowserRouter` in `main.jsx`, the route map in `App.jsx`, a `Layout` component with `NavLink` and `Outlet`, the list page (`InterventiiPage`), the detail page (`InterventieDetaliuPage`) that reads the id with `useParams` and calls `fetchInterventie(id)`, plus `DesprePage` and `NotFoundPage`.
- **Changed or rejected**: The detail route uses the resource from `tw.json` (`/interventii/:id`), not `/tasks/:id`. The theme toggle moved into the layout so it works on every page, and the progress "pipe" counter moved from the header into the list panel, because the header is now shared. I added `categorie` and `descriere` to `db.json` so the detail page shows more than the card. The effect does not call `setLoading(true)` at the start, as the guide notes for the lint rule.

### 3. Moving styles to CSS Modules
- **Asked**: I asked for `App.css` to be split as the guide describes, without losing the stage 5 design.
- **Got**: `App.css` renamed to `index.css` with only the variables, the light/dark themes and the shared classes; one `.module.css` file next to each component and page.
- **Changed or rejected**: The rules were moved from my own stylesheet, not copied from the guide's appendix, so the look stays the same. The card title became a `Link` with `data-testid="item-link"` (instead of `item-title`), and the `<label>` around it became a `div`, with an `aria-label` on the checkbox.

### 4. Verification
- **Asked**: I asked Claude to check that everything works on the built app.
- **Got**: `npm run build` and `npm run lint` pass. Each route was opened in a headless browser against `vite preview`: `/` shows the list with all stage 7 attributes, `/interventii/2` shows `detail` and `detail-title`, `/interventii/999` shows the error message, `/ceva` shows `not-found`, and the active link is marked only on the current page.

## What I learned / what did not work
I learned how a single page application changes pages without reloading: `Link` and `NavLink` only change the address, and React Router draws the matching page inside the `Outlet` of the shared layout. `useParams` always returns text, and listing `[id]` as the effect dependency reloads the data when the address changes. CSS Modules give every class a unique name at build time, so the same class name in two components no longer collides. Classes used in several places (`panel`, `badge`, `btn`) stay global and are written as plain strings.
