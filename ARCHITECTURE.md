# Skillfy Architecture

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS v3 + residual MUI (gradual migration) |
| Global client state | **Zustand** |
| Server/async state | **TanStack Query v5** |
| Forms | React Hook Form + Zod (where applicable) |
| HTTP client | Axios (centralized instance in `src/lib/api.js`) |
| Backend | ASP.NET Core 8, C# |
| ORM | Entity Framework Core (SQL Server) |
| Auth | ASP.NET Identity (cookie sessions; JWT migration planned) |
| Video | Mux (direct upload + HLS playback) |
| Payments | Chapa (Ethiopian payment gateway) |

---

## State Management Decision

### Why Zustand + TanStack Query

**Problem with the original codebase:**  
No global state at all. Auth state was re-read from `localStorage` via `authService.getCurrentUser()` independently in every component. A logout required `window.location.reload()` to propagate. Cart data was hardcoded. The same API endpoints were independently fetched by multiple components with no caching.

**Decision: Zustand for client state, TanStack Query for server state**

This separation is intentional:
- **Zustand** manages client-owned state that doesn't come from the API: who is logged in, UI preferences, cart items. It is minimal, composable, and requires almost no boilerplate. It persists auth and cart to `localStorage` via the `persist` middleware.
- **TanStack Query** manages server-derived data (courses, categories, enrollments, etc.) — caching, background refetching, stale-time control, mutation invalidation. This avoids duplicating server data in the client store.
- **React Context** is not used for state management, only for component-level sharing in rare cases.

**Alternatives considered:**
- Redux Toolkit: More boilerplate, RTK Query is comparable to TanStack Query but less composable.
- SWR: Lighter than TanStack Query but fewer features (no mutations, no optimistic updates, no window-level query management).
- Single `useState` calls in each component: Original pattern — leads to duplicate requests and no cache.

### State Stores

| Store | File | Contents |
|-------|------|----------|
| `useAuthStore` | `src/store/authStore.js` | `user`, `token`, `isAuthenticated`, `getRole()`, `hasRole()`, `setAuth()`, `clearAuth()` |
| `useCartStore` | `src/store/cartStore.js` | `items[]`, `addItem()`, `removeItem()`, `clearCart()`, `total()`, `count()` |
| `useUiStore` | `src/store/uiStore.js` | `mobileNavOpen`, `toasts[]`, `addToast()`, `removeToast()` |

### Server State Queries (TanStack Query)

Server state is co-located with the components that use it. Common queries include:
- Course list: `useQuery(['courses'], fetchCourses)`
- Enrolled courses: `useQuery(['enrolled', userId], ...)`
- Course detail: `useQuery(['course', courseId], ...)`

Query keys follow the pattern `[resource, ...params]`.

---

## Frontend Directory Structure

```
src/
  App.jsx              — Route definitions
  main.jsx             — React root, QueryClientProvider
  index.css            — Tailwind directives + custom component layer
  
  lib/
    api.js             — Centralized Axios instance (auth header injection)
    utils.js           — toArray(), extractApiError()
  
  store/
    authStore.js       — Zustand auth store
    cartStore.js       — Zustand cart store
    uiStore.js         — Zustand UI/notification store
  
  Component/
    ui/                — Reusable design-system components
      Button.jsx       — Variant-based button (primary, secondary, outline, ghost, danger)
      Input.jsx        — Labeled, accessible input with error state
      Spinner.jsx      — Animated loading indicator
      ToastContainer.jsx — Global notification toasts
      EmptyState.jsx   — No-content placeholder
      ErrorState.jsx   — Error state with retry action
      SkeletonCard.jsx — Loading skeleton for course cards
      CourseCard.jsx   — Course listing card (Tailwind)
      LessonCard.jsx   — Enrolled course card with progress bar
    
    Header/            — Sticky header + responsive NavBar (Tailwind)
    Footer/            — Site footer (Tailwind)
    PrivateRoute.jsx   — Role-based route guard (reads Zustand auth store)
    ErrorBoundary.jsx  — React error boundary
    ...
  
  Pages/               — Route-level page components
  Services/            — Legacy API helpers (being superseded by lib/api.js)
```

---

## Backend Directory Structure

```
Skillfy.Server/
  Controllers/         — HTTP endpoints (thin; delegate to services/repos)
  Models/              — EF entity models
  Dto/                 — Request/response data transfer objects
  Repo/                — Repository interfaces + implementations
  service/             — Business logic services
  Data/                — ApplicationDbContext
  Api/                 — Third-party integrations (Chapa, Mux)
  ViewModel/           — Response wrapper (ResponsViewModel)
  Migrations/          — EF Core migrations
```

---

## Authentication Flow

1. User POSTs credentials to `POST /api/account/login`
2. Server validates against ASP.NET Identity, creates a cookie session
3. Server returns `{ Id, Email, UserName, Fname, Lname, role[] }` in response body
4. Frontend stores user object in Zustand auth store (persisted to `localStorage`)
5. Frontend attaches Bearer token to subsequent requests via Axios interceptor

**Known limitation:** The current login endpoint returns cookie-based session auth. Frontend API calls do not yet send the cookie (cross-origin). A future migration should issue a JWT from the login endpoint and have the frontend send it as a `Bearer` token — the Axios interceptor in `src/lib/api.js` already reads from `localStorage.getItem('token')` in preparation for this.

---

## JSON Serialization

Changed from `ReferenceHandler.Preserve` (which wrapped all collections in `$id`/`$values` envelopes) to `ReferenceHandler.IgnoreCycles` (which breaks cycles without envelopes). This makes the API output plain JSON arrays instead of `{"$values": [...]}`. All frontend array parsers use `toArray()` from `src/lib/utils.js` which handles both formats for backward compatibility.

---

## CORS Policy

Changed from `AllowAnyOrigin` (fully open) to `AllowFrontend` policy:
- Allowed origins: configured in `appsettings.json` under `Cors:AllowedOrigins`
- Default: `https://localhost:5173` (Vite dev server)
- Production: set `Cors:AllowedOrigins` to your actual frontend domain

---

## Security Considerations

- API keys (Mux, Chapa, Google OAuth) must be stored in environment variables or .NET User Secrets — never in committed `appsettings.json`.
- Role assignment during registration is restricted to `"student"` only — privileged roles require admin action.
- Backend endpoints should have `[Authorize]` and `[Authorize(Roles = "...")]` attributes (partially applied; migration ongoing).
- Payment callback verification (Chapa HMAC) must be implemented before going to production.

---

## Frontend Design System

### Tailwind Version

Tailwind CSS **v3.4.19** (configured via PostCSS). The `postcss.config.js` uses the `tailwindcss` and `autoprefixer` plugins. No Tailwind v4 migration is planned until the full page migration is complete.

### Configuration

`skillfy.client/tailwind.config.js`:

- **Content paths:** `./index.html` and `./src/**/*.{js,ts,jsx,tsx}` — covers all React source files.
- **No custom breakpoints:** Tailwind defaults are used (sm:640, md:768, lg:1024, xl:1280, 2xl:1536), which cover the target viewport range of 320px–1440px+.
- **Plugins:** none.

### Design Tokens

Defined in both `tailwind.config.js` (Tailwind utilities) and `src/index.css` CSS custom properties (for use in remaining legacy CSS files).

#### Color Palette

| Token group | Base hue | Use |
|---|---|---|
| `primary` | Violet (#7c3aed at 600) | Brand, CTAs, links, focus rings |
| `secondary` | Emerald (#10b981 at 500) | Secondary actions, success-adjacent |
| `success` | Green (#16a34a at 600) | Enrollment success, progress, confirmations |
| `warning` | Amber (#d97706 at 600) | Draft state, low-urgency alerts |
| `error` | Red (#dc2626 at 600) | Form errors, destructive actions |
| `info` | Blue (#2563eb at 600) | Informational notices |
| Grays | Tailwind default | Surfaces, borders, text, backgrounds |

Tailwind extends all six color groups, so utilities like `bg-primary-600`, `text-error-700`, `border-success-200` are available throughout the app.

CSS custom properties available to legacy CSS files via `var(--color-*)`:

```css
--color-primary-600   /* #7c3aed */
--color-surface       /* #ffffff */
--color-surface-muted /* #f9fafb */
--color-border        /* #e5e7eb */
--color-text-primary  /* #111827 */
--color-text-secondary /* #6b7280 */
--color-success / --color-warning / --color-error / --color-info
```

#### Named Spacing

| Token | Value | Use |
|---|---|---|
| `spacing.header` | `4rem` (64px) | Header height, `h-header`, `mt-header` |
| `spacing.sidebar` | `15rem` (240px) | Instructor sidebar width |

#### Z-Index Layers

| Layer | Value | Class |
|---|---|---|
| Header (sticky) | 40 | `z-40` (Tailwind default) |
| Sidebar | 30 | `z-30` (Tailwind default) |
| Dropdown | 50 | `z-50` (Tailwind default) |
| Overlay backdrop | 60 | `z-60` (extended) |
| Modal panel | 70 | `z-70` (extended) |
| Toast stack | 80 | `z-80` (extended) |

#### Shadows

| Class | Use |
|---|---|
| `shadow-card` | Default card elevation |
| `shadow-card-hover` | Hovered card elevation |
| `shadow-modal` | Modal/dialog elevation |
| `shadow-nav` | Sticky header shadow |

#### Animations

| Class | Duration | Use |
|---|---|---|
| `animate-fade-in` | 200ms | Dropdowns, toasts |
| `animate-slide-up` | 300ms | Modals, drawers appearing from below |
| `animate-slide-down` | 300ms | Panels appearing from above |

### Typography

Font family: **Inter** (`font-sans`) — loaded from the system stack or Google Fonts if added later. The `sans` stack fallback is `system-ui, -apple-system`.

| Context | Tailwind classes |
|---|---|
| Page heading | `text-2xl sm:text-3xl font-bold text-gray-900` (`.section-heading`) |
| Card title | `text-base font-semibold text-gray-900 leading-snug` (`.card-title`) |
| Body text | `text-sm text-gray-700` |
| Secondary / muted text | `text-sm text-gray-500` (`.text-muted`) |
| Label | `text-sm font-medium text-gray-700 mb-1` (`.label`) |
| Button text | `text-sm font-semibold` (`.btn`) |

### Layout Conventions

| Component class | Purpose |
|---|---|
| `.page-container` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — used on every page |
| `.page-section` | `py-10 sm:py-14` — standard vertical section rhythm |
| `.dashboard-layout` | CSS Grid with sidebar + header + main areas (instructor/admin pages) |
| `.dashboard-sidebar` | Sidebar slot in the dashboard grid |
| `.dashboard-header` | Header slot in the dashboard grid |
| `.dashboard-main` | Main content slot in the dashboard grid |
| `.form-container` | `max-w-md mx-auto` — standard auth/settings form width |
| `.form-container-lg` | `max-w-2xl mx-auto` — wider form context |
| `.overlay` | Full-screen modal backdrop (`fixed inset-0 bg-black/50 z-60`) |
| `.nav-dropdown` | Standard dropdown panel (rounded, shadowed, animated) |

### Responsive Conventions

Mobile-first. All layout utilities use Tailwind's responsive prefix stack:
- No custom breakpoints — Tailwind defaults (sm:640, md:768, lg:1024, xl:1280, 2xl:1536) are sufficient.
- Grid layouts default to a single column on mobile, widening at `sm` and `lg`.
- The `.dashboard-layout` grid collapses to a single column on viewports narrower than 768px (sidebar hidden).

### Global CSS Rules (`src/index.css`)

Rules that live in the global stylesheet rather than components:

- `scroll-behavior: smooth` on `html`
- `body { min-height: 100dvh; overflow-x: hidden; }`
- `*:focus-visible` — 2px violet focus ring (keyboard navigation only)
- `*:focus:not(:focus-visible)` — suppresses ring on pointer click
- `::selection` — primary-200 background, primary-900 text
- `@media (prefers-reduced-motion: reduce)` — kills animations/transitions
- `img, video { max-width: 100%; display: block; }`

### Component Migration Status

| Component / Area | Status |
|---|---|
| Header, NavBar, Footer | ✅ Tailwind only |
| Courses, SearchPage, CategoriesPage | ✅ Tailwind only |
| CourseCard, LessonCard, SkeletonCard | ✅ Tailwind only |
| Button, Input, Spinner, EmptyState, ErrorState, ToastContainer | ✅ Tailwind only |
| Signin, Signup | ⏳ Still uses MUI + legacy CSS |
| CourseDetailOverview | ⏳ Mixed CSS/Tailwind |
| InstructorAdminDashBoardPage | ⏳ Legacy CSS (uses new `.dashboard-layout` classes) |
| CartPage | ⏳ Legacy CSS + hardcoded dummy data |
| CourseCreate, ChapterLessons | ⏳ Mixed |
| CourseLearn (MainContent, Sidebar) | ⏳ Legacy CSS |

Full component migration is tracked in `REFACTOR_PLAN.md` Phase 4.

### Guidance for Future Component Migration

1. Replace per-component `.css` imports with Tailwind utility classes.
2. Use CSS custom properties (`var(--color-*)`) only in legacy CSS files until they are migrated.
3. All new components should use only Tailwind utilities and the component classes defined in `index.css`.
4. Do not add new global classes to `index.css` for component-specific styles — those belong in the component file via `className`.
5. MUI components (`@mui/material`) should be replaced with plain HTML + Tailwind as each page is migrated. Do not add new MUI imports.
6. After all MUI usage is removed, `@mui/material`, `@emotion/react`, `@emotion/styled`, and `@fontsource/roboto` can be deleted from `package.json`.
