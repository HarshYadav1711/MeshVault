# MeshVault

MeshVault is a full-stack app for managing internal 3D asset requests.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- MongoDB Atlas + Mongoose
- bcrypt password hashing
- JWT session in signed `httpOnly` cookie
- Zod validation

## Features

- Signup, login, logout, and current user detection
- Duplicate email and invalid credential handling
- Protected routes for `/dashboard` and `/requests/*`
- User-scoped request CRUD
- Clean API error responses

## Environment Variables

Copy `.env.example` to `.env.local` and set values:

```bash
cp .env.example .env.local
```

- `MONGODB_URI`
- `JWT_SECRET` (32+ characters)

## Run

```bash
npm install
npm run dev
```

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/requests`
- `POST /api/requests`
- `PATCH /api/requests/:id`
- `DELETE /api/requests/:id`
