# Skillfy E-Learning Platform

An online learning platform built with React and ASP.NET Core, supporting video-based course delivery, student enrollment, and Chapa payment processing.

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS v3 |
| State | Zustand (client), TanStack Query (server) |
| Forms | React Hook Form, Zod |
| HTTP | Axios |
| Backend | ASP.NET Core 8, C# |
| Database | SQL Server |
| ORM | Entity Framework Core 8 |
| Identity | ASP.NET Identity |
| Video | Mux (upload + HLS playback) |
| Payments | Chapa (Ethiopian payment gateway) |

---

## Main Features

- **Students** — Browse courses, enroll via Chapa payment, watch video lessons, leave ratings
- **Instructors** — Create courses with chapters and lessons, upload videos via Mux, manage profile
- **Admins** — Dashboard for platform oversight (in progress)
- **Public** — Browse course catalog, search, filter by category

---

## User Roles

| Role | Description |
|------|-------------|
| `student` | Default role assigned at registration; can enroll and learn |
| `Instructor` | Can create and manage courses (assigned by admin) |
| `Admin` | Platform administration (assigned by admin) |

---

## Frontend Setup

**Requirements:** Node.js 18+

```bash
cd skillfy.client
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

The dev server runs at `http://localhost:5173` and proxies `/api` requests to the backend.

### Environment Variables

Create `skillfy.client/.env`:

```
VITE_API_URL=https://localhost:7182
```

---

## Backend Setup

**Requirements:** .NET 8 SDK, SQL Server

```bash
cd Skillfy.Server
cp appsettings.example.json appsettings.Development.json
# Edit appsettings.Development.json with your values
dotnet restore
dotnet ef database update
dotnet run
```

### Required Configuration

Set these values in `appsettings.Development.json` or environment variables:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=Elearning;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Mux": {
    "AccessToken": "YOUR_MUX_ACCESS_TOKEN",
    "SecretKey": "YOUR_MUX_SECRET_KEY"
  },
  "Chapa": {
    "PublicKey": "YOUR_CHAPA_PUBLIC_KEY",
    "SecretKey": "YOUR_CHAPA_SECRET_KEY",
    "Callback": "https://yourdomain.com/api/payment/callback"
  },
  "Authentication": {
    "Google": {
      "ClientId": "YOUR_GOOGLE_CLIENT_ID",
      "ClientSecret": "YOUR_GOOGLE_CLIENT_SECRET"
    }
  },
  "Cors": {
    "AllowedOrigins": ["https://localhost:5173"]
  }
}
```

**Never commit real credentials to source control.**

For development, use [.NET User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets):

```bash
cd Skillfy.Server
dotnet user-secrets set "Mux:AccessToken" "your-token"
dotnet user-secrets set "Chapa:SecretKey" "your-key"
```

---

## Database Setup

```bash
cd Skillfy.Server
dotnet ef migrations add <MigrationName>   # if making schema changes
dotnet ef database update
```

The database is seeded with three roles on startup: `Admin`, `User`, `Instructor`.

---

## Running in Development

Terminal 1 (backend):
```bash
cd Skillfy.Server
dotnet run
```

Terminal 2 (frontend):
```bash
cd skillfy.client
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Building for Production

Frontend:
```bash
cd skillfy.client
npm run build
# Output: skillfy.client/dist/
```

Backend:
```bash
cd Skillfy.Server
dotnet publish -c Release -o ./publish
```

The frontend `dist/` folder is served by the ASP.NET Core app via `UseStaticFiles()` + `MapFallbackToFile("index.html")`.

---

## Running Tests

Frontend linting:
```bash
cd skillfy.client
npm run lint
```

Backend tests (requires .NET SDK):
```bash
cd Skillfy.Server
dotnet test
```

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation of state management decisions, directory structure, authentication flow, and security considerations.

---

## Deployment Notes

1. Set all required environment variables or use a secrets manager.
2. Update `Cors:AllowedOrigins` to your production frontend domain.
3. Enable HTTPS in production.
4. Set `Authentication:Google:ClientId/ClientSecret` for Google OAuth to work.
5. Configure Chapa webhook to point at `/api/payment/callback` (currently stubbed).
6. Run `dotnet ef database update` against production database before starting the app.
7. Secure the Swagger UI in production (currently exposed in development only).

---

## Known Limitations

- JWT authentication is not yet implemented; login uses ASP.NET Identity cookies. Cross-origin API calls from the frontend do not currently send the session cookie, so `[Authorize]` attributes on backend endpoints will reject them. A JWT migration is planned.
- Admin dashboard is a placeholder; full admin features are not yet implemented.
- Chapa payment callback HMAC verification is commented out — do not run in production without implementing this.
- EF Core version should be updated to a stable release before production deployment.

