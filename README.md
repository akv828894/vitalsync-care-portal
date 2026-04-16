# VitalSync Care Portal

VitalSync Care Portal is a client-facing healthcare access experience built as a fullstack authentication MVP. It gives patients a polished login and dashboard flow while keeping the backend architecture production-ready with JWT authentication, password hashing, protected routes, and deployable frontend/backend separation.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/akv828894/vitalsync-care-portal)

## Product Snapshot

- Sky-blue and white client-ready patient portal UI
- React frontend with routes for `/login`, `/register`, and `/dashboard`
- Express backend with bcrypt password hashing and JWT auth
- Protected API routes for authenticated portal access
- Zustand-based persisted session state on the frontend
- Render-ready backend blueprint and Vercel-ready frontend routing

## Repository Structure

```text
week14-vitalsync-auth-mvp/
|-- client/
|-- server/
|-- docs/
|-- render.yaml
`-- README.md
```

## Local Development

### 1. Install dependencies

```bash
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Create environment files

- Copy `server/.env.example` to `server/.env`
- Copy `client/.env.example` to `client/.env`

### 3. Start the project

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Demo Mode vs Production

### Local demo mode

If `MONGO_URI` is missing and `NODE_ENV` is not `production`, the backend falls back to an in-memory demo mode. This is useful for UI review and flow testing without a database.

### Production mode

For any real deployment, set:

- `NODE_ENV=production`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URLS`
- `DEMO_MODE=false`

If `MONGO_URI` is missing in production, the backend now fails fast instead of silently running in demo mode.

## Deployment Targets

### Frontend: Vercel

The frontend is prepared for Vercel deployment with [client/vercel.json](./client/vercel.json), which rewrites all routes to `index.html` so React Router works correctly on refresh and direct navigation.

Repository:

- `https://github.com/akv828894/vitalsync-care-portal`

Required Vercel environment variable:

- `VITE_API_BASE_URL=https://your-render-backend.onrender.com`

### Backend: Render

The backend is prepared for Render deployment with [render.yaml](./render.yaml).

One-click Render setup:

- `https://render.com/deploy?repo=https://github.com/akv828894/vitalsync-care-portal`

Required Render environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URLS=https://your-vercel-frontend.vercel.app`
- `DEMO_MODE=false`

Health check:

- `GET /api/health`

## Core Auth Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/patients/overview`
- `GET /api/health`

## Core Frontend Files

- App routing: [client/src/App.jsx](./client/src/App.jsx)
- Login page: [client/src/pages/LoginPage.jsx](./client/src/pages/LoginPage.jsx)
- Register page: [client/src/pages/RegisterPage.jsx](./client/src/pages/RegisterPage.jsx)
- Dashboard page: [client/src/pages/DashboardPage.jsx](./client/src/pages/DashboardPage.jsx)
- Styling: [client/src/index.css](./client/src/index.css)

## Core Backend Files

- Auth controller: [server/src/controllers/authController.js](./server/src/controllers/authController.js)
- User model: [server/src/models/User.js](./server/src/models/User.js)
- Auth middleware: [server/src/middleware/authMiddleware.js](./server/src/middleware/authMiddleware.js)
- Environment config: [server/src/config/env.js](./server/src/config/env.js)

## Verification

The following checks have already been run locally:

- Frontend lint passed
- Frontend production build passed
- Backend syntax check passed
- Register -> login -> protected route flow passed in local demo mode

## Supporting Docs

- Daily study plan: [docs/week-plan.md](./docs/week-plan.md)
- End-of-day test bank: [docs/end-of-day-tests.md](./docs/end-of-day-tests.md)
- Interview prep: [docs/interview-prep.md](./docs/interview-prep.md)
