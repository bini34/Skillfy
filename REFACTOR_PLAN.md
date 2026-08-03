# Skillfy Refactor Plan

**Audit date:** 2026-08-03  
**Auditor:** Biniyam Ambachew Beyene  
**Repository:** `c:/Users/biniy/Documents/GitHub/Skillfy`

---

## 1. Current Architecture Overview

Skillfy is a full-stack e-learning platform composed of two projects inside a single repository:

```
Skillfy/
├── skillfy.client/          # React 18 SPA (Vite 5)
│   ├── src/
│   │   ├── App.jsx          # Router configuration
│   │   ├── main.jsx         # Entry — QueryClientProvider + ToastContainer
│   │   ├── Component/       # Feature and UI components
│   │   ├── Pages/           # Route-level pages
│   │   ├── Services/        # authService.js (legacy axios wrapper)
│   │   ├── store/           # Zustand stores (authStore, cartStore, uiStore)
│   │   ├── lib/             # api.js (Axios instance), utils.js
│   │   └── assets/          # Images, logos, SVGs
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── Skillfy.Server/          # ASP.NET Core 8 Web API
    ├── Controllers/         # AccountController, CourseController, PaymentController,
    │                        # ChapterController (all methods commented out),
    │                        # LessonController, CategoryController
    ├── Data/                # ApplicationDbContext (EF Core)
    ├── Model/               # Entity models (Course, Lesson, Chapter, Enroll, Review…)
    ├── Models/              # Second model folder (duplication)
    ├── Dto/                 # Data Transfer Objects
    ├── ViewModel/           # ResponsViewModel wrapper
    ├── Repo/                # Repository interfaces + implementations
    ├── service/             # Business-logic services
    ├── Api/                 # External API clients (Mux, Chapa)
    └── Program.cs           # Composition root
```

**Auth flow (current):** Cookie-based ASP.NET Identity sessions. The frontend stores the user object returned by `/api/account/login` in `localStorage` via both `authService.js` (legacy) and Zustand `authStore` (new). No JWT is issued; the Bearer interceptor in `lib/api.js` is wired but never has a token to attach because the login endpoint returns a cookie session, not a token.

**Data flow:** The Vite dev server proxies `/api/*` to `https://localhost:7182` (ASP.NET Core). Axios calls use either the centralized `lib/api.js` instance or hardcoded `https://localhost:7182` URLs (inconsistent). The backend serializes with `ReferenceHandler.IgnoreCycles` + `WhenWritingNull`, returning plain arrays.

---

## 2. Technologies and Versions

### Frontend (`skillfy.client/package.json`)

| Package | Version | Status |
|---|---|---|
| react | 18.3.1 | Current |
| react-dom | 18.3.1 | Current |
| vite | 5.2.0 | Current |
| @vitejs/plugin-react | 4.2.1 | Current |
| react-router-dom | 6.23.1 | Current |
| @tanstack/react-query | 5.101.4 | Current |
| zustand | 5.0.14 | Current |
| react-hook-form | 7.84.0 | Current |
| @hookform/resolvers | 5.7.1 | Current |
| zod | 4.4.3 | Current |
| axios | 1.7.2 | Current |
| tailwindcss | 3.4.19 | Current |
| @mui/material | 5.15.19 | Partially migrated away |
| @mui/icons-material | 5.15.19 | Still used across components |
| @mantine/core | 7.11.0 | **Installed, NEVER used — dead dependency** |
| @mantine/hooks | 7.11.0 | **Installed, NEVER used — dead dependency** |
| @mux/mux-player-react | 2.7.0 | Used (video playback) |
| @mux/mux-uploader-react | 1.0.0-beta.18 | Pre-release; used in lesson upload |
| react-table | 7.8.0 | **Outdated** (v8 is current); used in InstructorDatagrid |
| react-quill | 2.0.0 | **React 18 incompatible** — uses deprecated `ReactDOM.render` |
| draft-js | 0.11.7 | **Legacy** — React 16 era, unmaintained |
| jwt-decode | 4.0.0 | Installed, not currently in use |
| js-cookie | 3.0.5 | Installed, not currently in use |
| quill | 2.0.2 | Peer dep of react-quill |
| react-icons | 5.2.1 | Installed, partial use |
| @szhsin/react-menu | 4.1.0 | Installed, minimal use |
| @emotion/react | 11.11.4 | MUI peer dep |
| @emotion/styled | 11.11.5 | MUI peer dep |
| @fontsource/roboto | 5.0.13 | MUI peer dep |

### Backend (`Skillfy.Server`)

| Technology | Version | Notes |
|---|---|---|
| .NET / ASP.NET Core | 8.0 | Runtime 9.0.11 present locally; **SDK not confirmed installed** |
| Entity Framework Core | 9.0 (preview) | Should upgrade to stable EF Core 9 |
| ASP.NET Identity | 8.x | Cookie-based session auth |
| SQL Server | Latest | via `Microsoft.Data.SqlClient` |
| Newtonsoft.Json | Present | Mixed with System.Text.Json (dual serializer risk) |
| Swashbuckle (Swagger) | Present | Dev-only |

---

## 3. Existing Features

### Authentication
- User registration (`POST /api/account/register`) — creates user, assigns "student" role
- User login (`POST /api/account/login`) — password sign-in, returns user object + role
- Google OAuth configured in `Program.cs` (credentials removed from config, must be set via env)
- Social login UI buttons exist but are not wired to backend

### Course Management (Instructor)
- Course creation with thumbnail upload (`POST /api/course/createcourse`)
- Course listing by instructor (via `InstractorCoursesDatagrid`)
- Course update (`PUT /api/course/updatecourse`)
- Course delete (`DELETE /api/course/deletecourse/{courseId}`)
- Lesson creation with Mux video upload
- Category selection during course creation

### Course Discovery (Student)
- All courses listing page (`GET /api/course/coursecard`)
- Course detail page (`GET /api/course/coursedetail{id}`)
- Course search (`GET /api/course/search{coursename}`)
- Categories page (`GET /api/course/coursebycatagory{catagory}`)

### Payment (Chapa)
- Payment initialization (`POST /api/payment/Initialize`) — creates Chapa checkout
- Payment return handler (`GET /api/payment/paymentreturn/{courseId}/{userId}/...`) — enrolls user + pays instructor

### Enrolled Courses
- View enrolled courses (`GET /api/course/enrolledcourse{userid}`)
- Enrolled course detail with chapters/lessons (`GET /api/course/detailenrolled{courseid}`)
- Course player page (`CourseLearn` / `MainContent` / `Sidebar`)
- Rating form (saves to DB via `POST /api/course/rating`)

### Admin
- Admin dashboard page exists (placeholder only)

### UI Infrastructure
- Tailwind CSS v3 with custom design tokens (violet brand, emerald accent)
- Zustand stores: `authStore`, `cartStore`, `uiStore` (toast notifications)
- TanStack Query provider (configured, not yet used in most data-fetching)
- Reusable components: `Button`, `Spinner`, `ToastContainer`, `EmptyState`, `ErrorState`, `SkeletonCard`, `CourseCard`, `LessonCard`, `Input`
- Centralized Axios instance (`lib/api.js`) with Bearer interceptor
- `toArray()` utility handles both legacy `$values` and plain-array API responses

---

## 4. Broken / Unfinished Features

### Completely Broken

| Feature | Location | Problem |
|---|---|---|
| Chapter CRUD | `ChapterController.cs` | All action methods are commented out — chapter creation does not work |
| Cart (shopping cart) | `CartPage.jsx:9-31` | Hardcoded dummy data — not connected to backend or Zustand cartStore |
| Social login | `SignInSocialMedia.jsx` | Buttons render but have no `onClick` handlers and no backend OAuth flow |
| Forgot password | `ForgotPasswordPage.jsx` | UI form only; no backend endpoint and no email service |
| Admin dashboard | `AdminDashboardPage.jsx` | Placeholder — no user management, analytics, or actual functionality |
| `CourseDetailOverview` direct navigation | `CourseDetailOverview.jsx:22-27` | Entirely depends on `location.state.courseid`; returns null if user navigates directly (paste URL, refresh, bookmark) |

### Silently Broken (Bug, No Error Shown)

| Feature | Location | Problem |
|---|---|---|
| Auto-enrollment on course view | `CourseDetailsCard.jsx:37-52` | `useEffect` fires `paymentreturn` API call on every render — enrolls user for free without payment |
| Wrong env-var syntax | `CourseDetailsCard.jsx:40` | Uses `process.env.REACT_APP_API_URL` (CRA syntax) — always `undefined` in Vite; call silently fails |
| Auth token never sent | `lib/api.js` + `authService.js` | Login returns cookie session, not a JWT; the Bearer interceptor has no token — all API calls that need auth fail |
| Progress tracking hardcoded | Lesson components | Progress is hardcoded; not read from or written to backend |

### Unfinished / Stub

| Feature | Location | Problem |
|---|---|---|
| `MyCourseController.cs` | Backend | Empty controller — no endpoints |
| Chapa HMAC webhook | `PaymentController.cs:84-107` | Commented out; webhook signature verification not implemented |
| Instructor profile update | `InstractorProfileUpdatePage.jsx` | Page exists in routing but feature completeness unknown |
| Certificate of completion | `CourseDetailsCard.jsx:66` | Listed in UI copy but no generation logic exists |
| TanStack Query | Throughout frontend | `QueryClient` configured in `main.jsx` but no `useQuery`/`useMutation` hooks used anywhere — all data fetching still uses raw `useEffect` + `axios` |

---

## 5. Frontend Problems

### Architecture Problems

1. **Dual auth pattern:** `authService.js` and `useAuthStore` coexist and partially duplicate each other. `CourseDetailsCard.jsx` still calls `authService.getCurrentUser()` (old pattern). `Signin.jsx` calls `authService.login()` then manually calls `setAuth()`. This leads to two sources of truth for the logged-in user.

2. **Hardcoded base URL:** `authService.js:4` uses `const API_URL = 'https://localhost:7182/api/account'`. `CourseDetailsCard.jsx:19` uses `https://localhost:7182/api/payment/Initialize`. `CourseDetailOverview.jsx:40` uses `https://localhost:7182/api/course/...`. These all break in production. The centralized `lib/api.js` instance with `VITE_API_URL` exists but is not used in these files.

3. **TanStack Query not adopted:** `QueryClientProvider` wraps the app but zero components use `useQuery`. All data fetching uses `useEffect` + `useState` + `axios` manually, bypassing caching and deduplication.

4. **Component folder duplication:** `Component/CourseLessons/` and `Component/ChapterLessons/` appear to be near-identical feature folders managing the same lesson-in-chapter flow. Only one should exist.

5. **react-quill React 18 incompatibility:** `react-quill@2` internally calls `ReactDOM.render()` which was removed in React 18. Will throw a runtime warning and may crash in strict mode. Should be replaced with a maintained alternative.

6. **draft-js is abandoned:** `draft-js@0.11.7` was archived in 2022 and does not support React 18. Should be removed if unused, or replaced with a maintained editor.

### Component-Level Bugs

7. **`CourseDetailsCard` auto-enrolls on mount** (`CourseDetailsCard.jsx:37-52`): The `useEffect` calls `/api/payment/paymentreturn` on every render of the course detail page. This is meant to only run after a Chapa redirect. As written it fires for every user viewing course details, silently enrolling them for free.

8. **`CourseDetailOverview` breaks on direct URL** (`CourseDetailOverview.jsx:63`): Returns `null` when `courseName` is falsy — always true on direct navigation because `location.state` is undefined. No URL-based fallback.

9. **`CartPage` has hardcoded dummy data** (`CartPage.jsx:9-31`): Three identical static courses replace actual cart state.

10. **`Signin.jsx` role parsing fragile** (`Signin.jsx:34`): Triple fallback `user?.role?.$values?.[0] || user?.role?.[0] || user?.role` exists because the auth response format changed. After `ReferenceHandler.IgnoreCycles`, `role` is always a plain array; the `$values` branch is dead code.

11. **Mixed CSS systems:** Most components use both a per-component `.css` file and Tailwind utility classes. The CSS files import global class names that create style conflicts. Tailwind migration is approximately 30% complete.

12. **MUI + Tailwind conflict:** `@mui/material` applies its own CSS-in-JS baseline via `@emotion`. Tailwind's `base` layer resets conflict with MUI defaults, causing inconsistent button/input sizing.

13. **No form validation:** Neither Signin nor Signup uses `react-hook-form` or Zod despite both being installed. Errors are only surfaced after a network call fails.

---

## 6. Backend Problems

### Critical

1. **`ChapterController` has no routes** (`ChapterController.cs`): The class has no `[ApiController]` attribute, no `[Route]` attribute, and all action methods are commented out. Chapter creation from the frontend will silently fail (404).

2. **`MyCourseController` is empty:** Exists as a file but contains no endpoints. Frontend code targeting a `mycourse` endpoint gets a 404.

3. **Payment redirect hardcodes localhost** (`PaymentController.cs:69`): `return Redirect("https://localhost:5173/")` — this will break in any non-local environment.

4. **No `[Authorize]` on protected endpoints:** All `CourseController` endpoints — including `createcourse`, `updatecourse`, `deletecourse`, and `rating` — have no `[Authorize]` attribute. Anonymous users can create, edit, and delete courses.

5. **Role seeding mismatch** (`Program.cs:108`): Seeds `"Admin"`, `"User"`, `"Instructor"` but not `"student"`. The `AccountController` creates `"student"` on demand during registration. The `"User"` role is seeded but never assigned.

### Moderate

6. **Dual serializer risk:** `Program.cs` configures `System.Text.Json` but several controllers import `Newtonsoft.Json` (`CourseController.cs:10`, `PaymentController.cs:9`). Mixing serializers leads to inconsistent behavior.

7. **Two model folders:** `Skillfy.Server/Model/` and `Skillfy.Server/Models/` both exist and are both referenced. This indicates incomplete refactoring.

8. **EF Core 9 preview dependency:** The project references EF Core 9 preview packages. The stable EF Core 9 release should be used instead.

9. **Non-standard route patterns:** Routes like `coursedetail{id}`, `enrolledcourse{userid}`, `search{coursename}` use path concatenation without a `/` separator. This is non-standard, breaks with special characters in values, and makes the API impossible to describe in OpenAPI correctly.

10. **File uploads stored on disk** (`CourseController.cs:40-50`): Thumbnails are saved to `wwwroot/coursethumbline/`. Files are lost on redeploy and this approach does not scale to multi-instance deployments.

11. **No global exception handler in production:** `app.UseExceptionHandler("/Home/Error")` references an MVC action that does not exist in an API project. Unhandled exceptions in production return an unformatted 500.

---

## 7. Security Problems

### High Severity

1. **No `[Authorize]` on any endpoint:** Course creation, update, deletion, and rating are all accessible without authentication.

2. **Payment return endpoint is an unauthenticated GET** (`PaymentController.cs:49`): `GET /api/payment/paymentreturn/{courseId}/{userId}/{bankaccount}/{price}` accepts `userId` as a URL path parameter. Any user can craft a URL to enroll any other user in any course.

3. **`CourseDetailsCard` fires paymentreturn on every render:** Any student who opens the course detail page triggers the paymentreturn endpoint, which runs the enrollment logic without payment having occurred (see Frontend Bug 7).

4. **No Chapa HMAC webhook verification** (`PaymentController.cs:84-107`): Without HMAC validation, anyone can POST a fake payment success and enroll without paying.

5. **Bank account number in payment return URL** (`PaymentController.cs:49`): `bankaccount` appears as a URL path segment — it is logged in server access logs and browser history.

### Medium Severity

6. **No rate limiting on login:** The login endpoint has `lockoutOnFailure: false`. Brute-force attacks are unrestricted.

7. **`AllowCredentials()` with `AllowAnyHeader()`/`AllowAnyMethod()`:** The CORS policy uses `WithOrigins` (correct) but allows any header and any method, which is broader than necessary.

8. **Google OAuth credentials must use User Secrets:** `appsettings.json` has empty strings for OAuth credentials. Any developer who accidentally commits real credentials will expose them in git history.

---

## 8. Responsive Design Problems

1. **Instructor dashboard has no responsive layout** (`InstructorAdminDashBoardPage.css`): Uses a fixed-position sidebar. Collapses or overlaps on screens below 1024px.

2. **`CourseDetailOverview.jsx` layout is CSS-only** (`CourseDetailOverview.css`): Two-column layout has no responsive breakpoints. On mobile, the sidebar card and main content overlap.

3. **`CartPage.jsx` uses legacy CSS** (`CartPage.css`): Custom flex/grid with no media queries.

4. **Login/Signup pages:** Two-column layout — the left banner is hidden on narrow screens, but the form column still uses fixed-width CSS.

5. **Tailwind migration is incomplete (≈30%):** Components partially converted to Tailwind (Header, Footer, Courses, SearchPage, CategoriesPage, CourseCard, LessonCard) exist alongside untouched CSS-class components (CourseDetail, InstructorDashboard, CartPage, Signin, Signup). No unified breakpoint system exists.

---

## 9. State Management Problems

1. **Dual auth state:** Both `authService.js` (writes `localStorage.user`) and `useAuthStore` (Zustand persist, writes `localStorage.auth-store`) store user data. `CourseDetailsCard` reads from `authService.getCurrentUser()` while `PrivateRoute` and `NavBar` read from `authStore`. If logout clears `authStore`, stale data in `localStorage.user` persists.

2. **Token never populated:** `useAuthStore.token` is always `null` after login because the login endpoint returns a session cookie, not a JWT. The Bearer interceptor attaches `null`. Any endpoint checking for a Bearer token will fail.

3. **`cartStore` disconnected from `CartPage`:** `cartStore.js` exists with `persist` middleware but `CartPage.jsx` ignores it entirely and renders hardcoded dummy data.

4. **Dual toast systems:** Most components still use MUI `Snackbar` (Signin, Signup) while `main.jsx` mounts `ToastContainer` backed by `uiStore`. Two toast systems coexist.

5. **Dead `$values` branch in `authStore.getRole()`** (`authStore.js:26-27`): Guards against the old `ReferenceHandler.Preserve` format which is no longer returned by the backend. Dead code adds complexity.

6. **No server-state caching:** TanStack Query is configured but unused. Every page navigation re-fetches the same course list from the API with no caching or deduplication.

---

## 10. Testing Problems

1. **Zero test files exist** in the entire repository — no unit tests, integration tests, or E2E tests for either the frontend or backend.

2. **No test framework configured:** `package.json` has no `vitest`, `jest`, `@testing-library/react`, or any test runner as a dev dependency.

3. **No backend test project:** There is no `*.Tests.csproj` or `*.Tests/` directory in the solution.

4. **Critical security paths are untested:** The payment flow, enrollment logic, and role-based access control have no automated verification.

5. **ESLint `max-warnings 0` masks lint debt:** Several `useEffect` dependency warnings are suppressed with `// eslint-disable-next-line` comments rather than being fixed.

---

## 11. Recommended Architecture

### Frontend Target State

```
src/
├── lib/
│   ├── api.js              # Centralized Axios — SINGLE base URL from VITE_API_URL
│   └── utils.js            # toArray(), extractApiError()
├── store/
│   ├── authStore.js        # Zustand: user, token, role — SINGLE auth source of truth
│   ├── cartStore.js        # Zustand: cart items (backed by API, not dummy data)
│   └── uiStore.js          # Zustand: global toast queue
├── hooks/
│   ├── useCourses.js       # useQuery wrapper for course list
│   ├── useCourseDetail.js  # useQuery wrapper for single course
│   └── useEnrolled.js      # useQuery wrapper for enrolled courses
├── Component/
│   ├── ui/                 # Purely presentational, no data fetching
│   └── [Feature]/          # Feature components get data via props or hooks
├── Pages/                  # Route components — compose feature components
└── schemas/                # Zod validation schemas (shared between forms)
```

**Principles:**
- All data fetching via TanStack Query `useQuery`/`useMutation`
- All API calls via `lib/api.js` — no hardcoded base URLs anywhere
- `authStore` is the only place user state lives; delete `authService.getCurrentUser()` calls
- Replace `react-quill` with a React 18 compatible rich-text editor (`@uiw/react-quill-new` or plain `quill`)
- Remove `@mantine/*` entirely (zero usage)
- Remove `draft-js` entirely (unmaintained, not used)

### Backend Target State

- Apply `[Authorize]` to all non-public endpoints
- `[Authorize(Roles = "Instructor")]` on course create/update/delete
- Fix `ChapterController` — uncomment and complete all action methods; add routes
- Complete `MyCourseController`
- Standardize route patterns to REST: `GET /api/courses/{id}` not `GET /api/course/coursedetail{id}`
- Move file uploads to Azure Blob Storage or S3
- Add global exception middleware returning consistent `{ success, message, data }` shape
- Upgrade to stable EF Core 9
- Remove Newtonsoft.Json (use System.Text.Json consistently)
- Consolidate `Model/` and `Models/` into a single namespace
- Add ASP.NET Core rate limiting on auth endpoints

---

## 12. Phased Implementation Plan

### Phase 1 — Critical Bug Fixes (do first, unblocks everything else)

| # | Task | File(s) | Risk |
|---|---|---|---|
| 1.1 | Remove the `useEffect` in `CourseDetailsCard` that fires `paymentreturn` on mount | `CourseDetailsCard.jsx:37-52` | High — currently enrolls users for free |
| 1.2 | Replace `process.env.REACT_APP_API_URL` with `import.meta.env.VITE_API_URL` | `CourseDetailsCard.jsx:40` | Low |
| 1.3 | Switch `CourseDetailsCard` to use `useAuthStore` instead of `authService.getCurrentUser()` | `CourseDetailsCard.jsx:9` | Low |
| 1.4 | Fix `CourseDetailOverview` to load course by URL param when `location.state` is absent | `CourseDetailOverview.jsx:22-27` | Medium |
| 1.5 | Add `[Authorize]` to `CourseController` and restore `ChapterController` routes | Backend controllers | Medium |
| 1.6 | Fix payment redirect from hardcoded `localhost:5173` to a configurable URL | `PaymentController.cs:69` | Medium |
| 1.7 | Add rate limiting to the login endpoint | `Program.cs`, `AccountController.cs` | Medium |

### Phase 2 — State & Data Layer Consolidation

| # | Task | File(s) |
|---|---|---|
| 2.1 | Remove all `authService.js` calls from components; use `lib/api.js` + `authStore` exclusively | `CourseDetailsCard.jsx`, `Signin.jsx`, `Signup.jsx` |
| 2.2 | Migrate all `useEffect` + `axios` data fetching to TanStack Query `useQuery` hooks | All page components |
| 2.3 | Wire `CartPage` to `cartStore` and a real cart API endpoint | `CartPage.jsx`, `cartStore.js` |
| 2.4 | Remove dead `$values` branch from `authStore.getRole()` | `authStore.js:26-27` |
| 2.5 | Consolidate toast system — remove MUI `Snackbar` from Signin/Signup; use `uiStore` | `Signin.jsx`, `Signup.jsx` |

### Phase 3 — Backend Completion

| # | Task | File(s) |
|---|---|---|
| 3.1 | Uncomment and complete `ChapterController` action methods; add `[ApiController]` + `[Route]` | `ChapterController.cs` |
| 3.2 | Implement `MyCourseController` endpoints | `MyCourseController.cs` |
| 3.3 | Standardize API route patterns to RESTful format | All controllers |
| 3.4 | Implement Chapa HMAC webhook verification | `PaymentController.cs` |
| 3.5 | Add global exception handler middleware | `Program.cs` |
| 3.6 | Consolidate `Model/` and `Models/` folders | Backend model files |
| 3.7 | Remove Newtonsoft.Json; use System.Text.Json throughout | `CourseController.cs`, `PaymentController.cs` |
| 3.8 | Move thumbnail storage to a cloud blob store | `CourseController.cs:40-50` |

### Phase 4 — Frontend Completion & Tailwind Migration

#### 4.0 — Design System Foundation ✅ COMPLETE (2026-08-03)

Completed in this session:
- `tailwind.config.js`: Added `success`, `warning`, `error`, `info` semantic color scales; named z-index layers (60/70/80); `spacing.header`/`spacing.sidebar` tokens; `slide-down` animation; `shadow-nav`.
- `src/index.css`: Added CSS custom properties (`--color-*`, layout tokens); `scroll-behavior: smooth`; `body { min-height: 100dvh; overflow-x: hidden }`; `*:focus-visible` ring; `*:focus:not(:focus-visible)` cleanup; `::selection` colors; `@media (prefers-reduced-motion)` block; `img/video` defaults; new component classes: `.page-section`, `.dashboard-layout`, `.dashboard-sidebar`, `.dashboard-header`, `.dashboard-main`, `.form-container`, `.form-container-lg`, `.overlay`, `.nav-dropdown`, `.card-title`, `.text-muted`, `.badge-info`; updated `.badge-*` and `.btn-danger` to use semantic color tokens.
- `src/App.css`: Removed conflicting `button { background-color: inherit; color: black; border: none; }` rule.
- `index.html`: Updated title to "Skillfy"; added `<meta name="description">`.
- `ARCHITECTURE.md`: Added "Frontend Design System" section documenting tokens, conventions, migration status.

#### 4.1–4.9 — Page & Component Migration (pending)

| # | Task | File(s) |
|---|---|---|
| 4.1 | Migrate `Signin.jsx` and `Signup.jsx` to Tailwind; remove MUI TextField/Button | `Signin.jsx`, `Signup.jsx` |
| 4.2 | Migrate `CourseDetailOverview.jsx` to Tailwind; add responsive layout | `CourseDetailOverview.jsx`, `.css` |
| 4.3 | Migrate `InstructorAdminDashBoardPage` to Tailwind with mobile sidebar | `InstructorAdminDashBoardPage.jsx` |
| 4.4 | Migrate `CartPage` to Tailwind and connect to real cart data | `CartPage.jsx` |
| 4.5 | Replace `react-quill` with a React-18-compatible editor | Lesson creation form |
| 4.6 | Remove `@mantine/*` and `draft-js` (dead dependencies) | `package.json` |
| 4.7 | Add `react-hook-form` + Zod validation to all forms | `Signin.jsx`, `Signup.jsx`, `CourseCreate.jsx` |
| 4.8 | Implement Admin dashboard with user management | `AdminDashboardPage.jsx` |
| 4.9 | Consolidate `CourseLessons/` and `ChapterLessons/` component folders | Component folders |

### Phase 5 — Testing Infrastructure

| # | Task |
|---|---|
| 5.1 | Add Vitest + `@testing-library/react` to the frontend project |
| 5.2 | Write unit tests for `authStore`, `cartStore`, `toArray()`, `extractApiError()` |
| 5.3 | Write integration tests for critical user flows: login, enroll, view course |
| 5.4 | Add an xUnit test project to the backend solution |
| 5.5 | Write tests for `EnrollmentService`, `CourseService`, and `AccountController` |
| 5.6 | Add E2E tests with Playwright for the payment flow |

---

## 13. Risks and Important Files

### Highest-Risk Files (change with care)

| File | Risk | Why |
|---|---|---|
| `Program.cs` | High | Composition root — DI registration, middleware order, CORS. Wrong order breaks auth. |
| `ApplicationDbContext.cs` | High | EF Core model config — wrong `OnDelete` or FK changes generate dangerous migrations |
| `PaymentController.cs` | High | Enrollment logic coupled to payment; bugs here enroll users for free or fail after payment |
| `authStore.js` | High | Single auth source of truth — bugs cascade to PrivateRoute, NavBar, all protected pages |
| `lib/api.js` | Medium | Axios interceptors affect every API call in the app |
| `PrivateRoute.jsx` | Medium | Role guard for all protected routes |
| `EnrollmentService.cs` | Medium | Handles actual enrollment — duplicate enrollments or missing null checks break course access |

### Files That Are Safe to Delete or Consolidate

| File / Folder | Action |
|---|---|
| `@mantine/core`, `@mantine/hooks` | Remove from `package.json` — zero usage confirmed |
| `draft-js` | Remove — unmaintained, not used |
| `Component/CourseLessons/` or `Component/ChapterLessons/` | Consolidate to one folder after auditing which is the active code path |
| `Skillfy.Server/Models/` | Merge into `Skillfy.Server/Model/` |
| `authService.js` | Migrate all callers to `lib/api.js` + `authStore`, then delete |
| `js-cookie` | Remove if unused after JWT migration decision is made |

### Database Migration Warning

Any rename of entity properties or removal of columns requires an EF Core migration. The current `ApplicationDbContext` has several `OnDelete(DeleteBehavior.NoAction)` constraints to avoid cascade issues. Adding or changing FK relationships must be done carefully; test all migrations on a dev database before applying to production.

---

## 14. Commands to Run the Project

### Prerequisites

- Node.js 18+ installed
- .NET Runtime 9.0.x installed (note: **SDK presence is not confirmed** — build may fail without it)
- SQL Server running locally (or connection string pointing to a remote instance)
- Git Bash or PowerShell

### Frontend (Vite Dev Server)

```bash
# From the repository root:
cd skillfy.client

# Install dependencies (first time only):
npm install

# Create local env file:
cp .env.example .env
# Edit .env and set VITE_API_URL=https://localhost:7182

# Start dev server (proxies /api/* to backend):
npm run dev
# Runs at http://localhost:5173
```

### Backend (ASP.NET Core)

```bash
# From the repository root:
cd Skillfy.Server

# Set required secrets (requires .NET SDK):
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=.;Database=Skillfy;Trusted_Connection=True;TrustServerCertificate=True;"
dotnet user-secrets set "Authentication:Google:ClientId" "<your-google-client-id>"
dotnet user-secrets set "Authentication:Google:ClientSecret" "<your-google-client-secret>"
dotnet user-secrets set "Chapa:SecretKey" "<your-chapa-secret>"
dotnet user-secrets set "Mux:TokenId" "<your-mux-token-id>"
dotnet user-secrets set "Mux:TokenSecret" "<your-mux-token-secret>"

# Apply EF migrations (database must be reachable):
dotnet ef database update

# Run the API server:
dotnet run
# Runs at https://localhost:7182 with Swagger at https://localhost:7182/swagger
```

### Lint Check

```bash
cd skillfy.client
npm run lint
```

### Build (production bundle)

```bash
cd skillfy.client
npm run build
# Output in skillfy.client/dist/

cd ../Skillfy.Server
dotnet publish -c Release -o ./publish
```

### Important Notes

- The Vite proxy (`/api/*` → `https://localhost:7182`) means the frontend can use relative `/api/...` URLs in development. Components currently using hardcoded `https://localhost:7182/...` must be migrated to use `lib/api.js`.
- The backend's `UseStaticFiles()` + `MapFallbackToFile("/index.html")` means the built frontend is served by the ASP.NET server in production. Run `npm run build` and place the `dist/` output in `wwwroot/` before publishing the backend.
- SQL Server must be running before starting the backend. If using a local SQL Server instance, include `TrustServerCertificate=True` in the connection string.
- The .NET SDK may not be installed on the development machine (only the runtime 9.0.11 is confirmed). Run `dotnet --version` to check. Without the SDK, `dotnet run`, `dotnet build`, and `dotnet ef` are unavailable.
