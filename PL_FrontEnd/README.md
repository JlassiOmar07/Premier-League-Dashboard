# Player Stats Hub (Frontend)

React + TypeScript + Vite frontend for the Premier League player statistics dashboard.

## Requirements
- Node.js 18+
- npm

## Repository Layout
- Frontend (Vite): `PL_FrontEnd`
- Backend (Spring Boot): `PL_BackEnd`

## Backend Setup (Spring Boot)
1) Configure PostgreSQL (defaults in `../PL_BackEnd/src/main/resources/application.properties`):
   - Database: `players_stats`
   - Username: `postgres`
   - Password: set `DB_PASSWORD` in your environment
2) Start the backend:
```sh
cd ..\PL_BackEnd
.\mvnw spring-boot:run
```
Backend runs on `http://localhost:8080`.

## Frontend Setup (Vite)
1) Install dependencies:
```sh
npm install
```
2) Start the dev server:
```sh
npm run dev
```
Frontend runs on `http://localhost:5173`.

## API Endpoints
Base path: `/api/v1/player`

- `GET /api/v1/player`
  - Optional query params: `team`, `name`, `position`, `nation`
- `POST /api/v1/player`
- `PUT /api/v1/player`
- `DELETE /api/v1/player/{playerName}`
- `GET /api/v1/player/team/{team}`

## Dev Proxy
Vite proxies `/api` to `http://localhost:8080` (see `vite.config.ts`).

## Environment Overrides
Override the API base URL on the frontend with:
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Build
```sh
npm run build
```
