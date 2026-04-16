# Week Plan

This plan assumes `6 hours per day` until Friday and keeps auth as the only priority.

## Day 1: Architecture + Backend Foundation

Goal: understand the full auth flow before writing too much code.

- Spend 1 hour reading the folder structure and tracing request flow from frontend form to MongoDB.
- Spend 2 hours understanding the backend files: `server.js`, `app.js`, routes, controllers, model, middleware.
- Spend 2 hours setting up MongoDB Atlas, `.env`, and testing the register route with Postman.
- Spend 1 hour writing short notes in your own words:
  - What is hashing?
  - What is JWT?
  - What does middleware do?

Deliverable:

- Backend starts correctly
- MongoDB connects
- `POST /api/auth/register` works

## Day 2: Login + JWT + Protected API

Goal: make the backend secure and testable.

- Spend 1 hour revising register flow.
- Spend 2 hours understanding login logic and the JWT payload.
- Spend 2 hours testing protected routes in Postman:
  - Login
  - Copy token
  - Send `Authorization: Bearer <token>`
- Spend 1 hour explaining each backend file aloud like an interview answer.

Deliverable:

- `POST /api/auth/login` works
- `GET /api/auth/me` works with token
- `GET /api/patients/overview` returns protected data

## Day 3: Frontend Forms + API Connection

Goal: connect React forms to the backend.

- Spend 1 hour understanding `useState`, `onSubmit`, and `fetch`.
- Spend 2 hours tracing the register page and login page.
- Spend 2 hours testing success and failure states from the browser.
- Spend 1 hour writing your own explanation of:
  - why token is stored in localStorage
  - why passwords are never stored in localStorage

Deliverable:

- Register page creates a user
- Login page stores token
- Errors display clearly

## Day 4: Route Protection + Dashboard State

Goal: block unauthorized access and show logged-in user data.

- Spend 1 hour revising frontend auth state.
- Spend 2 hours understanding Zustand store and persisted token.
- Spend 2 hours understanding `ProtectedRoute` and logout flow.
- Spend 1 hour practicing the complete flow without help.

Deliverable:

- `/dashboard` redirects to `/login` when no token exists
- Dashboard shows `name`, `email`, `role`, and `uid`
- Logout clears state and blocks dashboard access

## Day 5: Deployment + Demo + Interview Revision

Goal: make the project presentable and explainable.

- Spend 2 hours deploying frontend to Vercel and backend to Render.
- Spend 1 hour fixing CORS and environment variables in production.
- Spend 1 hour recording the demo flow.
- Spend 2 hours interview prep from the docs in this folder.

Deliverable:

- Live frontend link
- Live backend link
- 3-minute demo video
- Ready answers for JWT, bcrypt, middleware, and localStorage questions
