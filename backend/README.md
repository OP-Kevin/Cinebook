# CineBook Backend (Beginner Friendly)

## Tech Used
- Express.js
- MongoDB with Mongoose

## Setup
1. Copy `.env.example` to `.env`
2. Set your MongoDB URL in `MONGO_URI`
3. Run:
   - `npm install`
   - `npm run dev`

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me/:userId`
- `GET /api/seats/:showId`
- `POST /api/bookings`
- `GET /api/bookings/history/:userId`
- `GET /api/bookings/latest/:userId`
