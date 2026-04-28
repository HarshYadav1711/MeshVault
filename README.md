# MeshVault

MeshVault is a production-minded full-stack app for managing internal 3D asset requests.

## Why this project exists

This project is intentionally scoped for internship review: secure authentication, user-scoped request management, clean architecture, and free-tier deployment.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- MongoDB Atlas (free tier) + Mongoose
- `bcryptjs` for password hashing
- JWT session stored in signed `httpOnly` cookie (`jose`)
- Zod validation

## Features

- Real auth: signup, login, logout, current user detection
- User-scoped asset request CRUD
- Request status flow: `Pending`, `In Progress`, `Completed`
- Optional reference image URL (no paid storage dependency)
- Protected routes for `/dashboard` and `/requests/*`
- Clean API validation and explicit error responses

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
cp .env.example .env.local
```

- `MONGODB_URI` - Atlas connection string
- `JWT_SECRET` - at least 32 characters

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/requests`
- `POST /api/requests`
- `PATCH /api/requests/:id`
- `DELETE /api/requests/:id`

## Project Structure

- `app/` - routes, pages, and API handlers
- `components/` - reusable UI and form components
- `lib/` - auth/session/db/validation utilities
- `models/` - Mongoose models

## Deployment Notes

### MongoDB Atlas (Free Tier)

1. Create a free Atlas cluster.
2. Create a database user and allow your app IP (or `0.0.0.0/0` for development only).
3. Copy the connection string into `MONGODB_URI`.

### Vercel (Hobby)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set `MONGODB_URI` and `JWT_SECRET` in Project Settings -> Environment Variables.
4. Deploy.

## Reviewer Notes

- No paid services or card-required tools are used.
- Authentication is custom and implemented in-app (no external auth SaaS).
- All request operations are user-scoped on the backend.
