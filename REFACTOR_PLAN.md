# Skillfy Refactor Plan

## Project Overview

Skillfy is an e-learning platform with a React 18 + Vite frontend and an ASP.NET Core 8 backend using SQL Server with Entity Framework Core. The application supports student enrollment, video-based course delivery via Mux, and payments via Chapa (Ethiopian payment gateway).

---

## Critical Problems Found

### Security (must fix before any deployment)
1. **Real API keys committed to source control** — Mux and Chapa credentials are in `appsettings.json`.
2. **No authorization on any API endpoint** — `[Authorize]` is commented out everywhere. Any anonymous caller can create courses, enroll users, or trigger payments.
3. **Client-controlled role assignment** — Registration accepts any role string from the client. A user can POST `"role": "Admin"` and gain admin access.
4. **Payment verification skipped** — Chapa callback handler is fully commented out. Enrollment is triggered by a simple GET redirect with no signature verification. Anyone can enroll for free by crafting the URL.
5. **CORS fully open** — `AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()` in production.
6. **Auth state in localStorage** — Vulnerable to XSS; entire user object accessible to any injected script.
7. **No credentials sent on API requests** — Frontend sends no auth token or cookie, so `[Authorize]` would reject every call anyway.

### Runtime Crashes
1. `Signin.jsx` — references `SigninSocialMedia` without importing it. Crashes on render.
2. `RatingForm.jsx` — uses `Typography`, `TextField`, `Button` from MUI without importing them. Crashes on render.
3. `MainContent.jsx` — references `ArrowBackIcon` without importing it. Crashes on render.
4. `Sidebar.jsx` — hardcoded fetch URL `detailenrolled58` instead of the dynamic course ID. No enrolled course ever loads.

### Logical Bugs
5. `CourseController.rating()` calls `AddAsync()` but never `SaveChangesAsync()` — ratings are never persisted.
6. `SearchPage.jsx` reads from `location.state` instead of URL params — crashes on direct navigation.
7. `CategoriesPage.jsx` — same pattern; crashes on direct navigation.
8. `.env` uses `REACT_APP_` prefix (CRA convention) but Vite requires `VITE_` — env variable is always `undefined`.
9. `CourseDetailsCard.jsx` calls `paymentreturn/{courseId}/{userId}` on mount unconditionally (wrong parameters, returns 404 every time).

### Missing State Management
- No global state management. Auth state is re-read from `localStorage` in every component independently.
- Shopping cart has no real state — hardcoded dummy data in `CartPage.jsx`.
- Same API calls are duplicated across `Courses.jsx`, `CategoriesPage.jsx`, `SearchPage.jsx`, and `Home/Course.jsx`.
- No server-state caching library.

### Architecture Issues
- `ReferenceHandler.Preserve` in JSON serialization wraps all collections in `$id`/`$values` envelopes, tightly coupling the API to frontend parsing.
- `LessonService` registered twice in DI.
- EF Core 9 preview (`9.0.0-preview.4`) used in production — unsupported.
- `HomeController` returns `View()` in an API project (always 404).
- Duplicate component folders: `ChapterLessons/` and `CourseLessons/`.
- Mantine installed but completely unused (dead dependency).

### Missing Features
- Admin dashboard is an empty `<div>AdminPage</div>`.
- `/admin/dashboard/` route is not defined in router.
- `/profile` route is not defined.
- `/auth/forgot-password` route is not defined.
- `ChapterController.cs` — all methods commented out.
- `MyCourseController.cs` — completely empty.
- Shopping cart has no backend integration.
- Progress tracking hardcoded at 60%.
- `ITeacherRepositary.cs` — empty interface, no implementation.

---

## Implementation Phases

### Phase 1: Discovery ✓ (complete)

### Phase 2: Foundation
- [ ] Configure Tailwind CSS v3 (compatible with Vite 5 / React 18)
- [ ] Add `tailwind.config.js` with design system (colors, spacing, fonts, radii, shadows)
- [ ] Add Zustand for global client state
- [ ] Add TanStack Query v5 for server state
- [ ] Create centralized Axios instance with credentials support
- [ ] Fix Vite env variable prefix (VITE_)
- [ ] Remove `ReferenceHandler.Preserve` from JSON serialization (fix `$values` wrapper)
- [ ] Remove duplicate `LessonService` DI registration
- [ ] Remove unused Mantine dependency
- [ ] Create reusable UI components: Button, Input, Modal, Card, Badge, Toast, Spinner, EmptyState, ErrorState

### Phase 3: Authentication
- [ ] Add JWT authentication to ASP.NET Core (replace cookie-only auth)
- [ ] Return JWT token from login and registration endpoints
- [ ] Attach JWT to all frontend API requests via Axios interceptor
- [ ] Fix role assignment security — whitelist allowed roles on backend
- [ ] Fix `Signin.jsx` crash (import SigninSocialMedia)
- [ ] Add proper auth Zustand store (user, token, role, isLoading)
- [ ] Remove user object from localStorage; store only JWT token securely
- [ ] Fix `PrivateRoute` to validate against Zustand auth store
- [ ] Define missing routes: `/admin/dashboard`, `/profile`, `/auth/forgot-password`
- [ ] Add authorization guards to all backend endpoints

### Phase 4: Main Features
- [ ] Fix `RatingForm.jsx` crash (add MUI imports)
- [ ] Fix `MainContent.jsx` crash (add ArrowBackIcon import)
- [ ] Fix `Sidebar.jsx` hardcoded fetch URL
- [ ] Fix rating not saved (`SaveChangesAsync()` missing in `CourseController`)
- [ ] Fix `SearchPage.jsx` to read from URL params
- [ ] Fix `CategoriesPage.jsx` to read from URL params
- [ ] Fix `CourseDetailsCard.jsx` spurious enrollment call on mount
- [ ] Implement Chapa payment callback verification
- [ ] Implement shopping cart with real state (Zustand)
- [ ] Implement progress tracking (real persistence, not hardcoded)
- [ ] Implement admin dashboard
- [ ] Fix `ChapterController.cs` (uncomment and test CRUD)
- [ ] Fix `MyCourseController.cs` (add endpoints)

### Phase 5: Responsive UI
- [ ] Migrate Header and NavBar to Tailwind
- [ ] Migrate Footer to Tailwind
- [ ] Migrate Home page (Hero, Categories, Course cards) to Tailwind
- [ ] Migrate Auth pages (Signin, Signup) to Tailwind
- [ ] Migrate Course listing page to Tailwind
- [ ] Migrate Course detail page to Tailwind
- [ ] Migrate Course learning page to Tailwind
- [ ] Migrate Instructor dashboard to Tailwind
- [ ] Migrate Course creation flow to Tailwind
- [ ] Migrate My Courses page to Tailwind
- [ ] Mobile-first breakpoints for all layouts
- [ ] Convert desktop sidebar to mobile drawer
- [ ] Fix horizontal overflow issues
- [ ] Accessibility: semantic HTML, focus states, ARIA labels, keyboard navigation

### Phase 6: Backend Quality and Security
- [ ] Move secrets to environment variables / user secrets (Mux, Chapa, Google OAuth)
- [ ] Add `appsettings.example.json` with placeholder values
- [ ] Replace open CORS with allowed-origins list
- [ ] Add rate limiting on login, registration, and payment endpoints
- [ ] Add centralized exception handling middleware
- [ ] Add structured logging
- [ ] Use DTOs consistently; never return EF entities directly
- [ ] Prevent mass assignment on sensitive fields (role)
- [ ] Upgrade EF Core from preview to stable release
- [ ] Add missing database indexes
- [ ] Fix N+1 queries in course listings
- [ ] Add pagination to all list endpoints

### Phase 7: Testing
- [ ] Add Vitest + React Testing Library to frontend
- [ ] Add tests for auth store, PrivateRoute, login form, search
- [ ] Add xUnit tests for AccountController, CourseController, authorization checks
- [ ] Run linting, build, and test checks

### Phase 8: Production Preparation
- [ ] Update README.md with full setup, environment variables, and deployment instructions
- [ ] Add `.env.example` for frontend
- [ ] Add health check endpoint to backend
- [ ] Secure Swagger behind authentication in production
- [ ] Add Docker support
- [ ] Configure security headers (HSTS, CSP, X-Frame-Options)
- [ ] Create `ARCHITECTURE.md` documenting state-management decisions

---

## Design System (Tailwind Config)

```
Primary:   #7C3AED (violet-600) — main brand color
Secondary: #10B981 (emerald-500) — success/CTA accents
Neutral:   Gray scale from Tailwind defaults
Danger:    #EF4444 (red-500)
Warning:   #F59E0B (amber-500)
Font:      Inter (primary), system-ui (fallback)
Radius:    sm=4px, md=8px, lg=12px, xl=16px
Shadow:    sm, md, lg from Tailwind defaults
```

---

## State Management Decision

**Zustand** for global client state:
- Auth state (user, token, role, isAuthenticated)
- Cart state (items, totals)
- UI state (mobile nav open, active notifications)

**TanStack Query v5** for server state:
- Courses, categories, enrollments, progress, reviews
- Automatic caching, refetching, mutation invalidation

Rationale: Zustand is minimal and composable (no boilerplate); TanStack Query handles the async lifecycle of API data correctly without duplicating server state in the client store.

---

## Commit Plan

```
chore: audit project and document refactor plan
chore: configure tailwind and design system
feat: add zustand and tanstack query state management
fix: add missing imports causing runtime crashes
fix: fix rating persistence and search navigation
fix: secure role assignment and add jwt authentication
refactor: migrate components to tailwind
fix: make all pages responsive
refactor: improve backend architecture and security
chore: prepare for production deployment
```
