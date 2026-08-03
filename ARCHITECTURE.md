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
