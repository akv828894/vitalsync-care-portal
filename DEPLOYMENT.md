# Deployment Checklist

## Frontend on Vercel

Deploy from the `client` directory.

Repository URL:

- `https://github.com/akv828894/vitalsync-care-portal`

Build settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Environment variable:

- `BACKEND_URL=https://your-render-backend.onrender.com`

## Backend on Render

Deploy from the repository root using `render.yaml`.

One-click deploy:

- `https://render.com/deploy?repo=https://github.com/akv828894/vitalsync-care-portal`

Environment variables to set:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URLS=https://your-vercel-frontend.vercel.app`
- `DEMO_MODE=false`

Render health check:

- `/api/health`

## Recommended Order

1. Push the code to GitHub.
2. Create the Render backend first and copy its live URL.
3. Add that URL as `VITE_API_BASE_URL` in Vercel.
4. Deploy the frontend to Vercel.
5. Update Render `CLIENT_URLS` with the final Vercel domain.
6. Redeploy backend once to confirm CORS is correct.
