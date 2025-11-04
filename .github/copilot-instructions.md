# Copilot Instructions for blog-cms

## Project Overview
This repository is a full-stack blog CMS built with:
- **Backend:** Laravel (PHP, API-first)
- **Frontend:** React + TypeScript (Vite)
- **Containerization:** Docker Compose (Nginx, PHP-FPM, Node)
- **Database:** MySQL

## Architecture & Key Directories
- `backend/` (Laravel):
  - `app/Http/Controllers/`, `app/Models/`, `routes/api.php`, `routes/web.php`
  - API endpoints are defined in `routes/api.php` and use controllers in `app/Http/Controllers/`
  - Eloquent ORM models in `app/Models/`
  - Config files in `config/`
- `frontend/` (React):
  - `src/pages/`, `src/components/`, `src/lib/`
  - Uses Vite for dev/build, Tailwind for styling
  - API calls typically use fetch/axios to `/api/*` endpoints
- `docker/` and `docker-compose.yml`: Container setup for local development

## Developer Workflows
- **Start full stack (local):**
  ```bash
  docker compose up -d --build
  ```
- **Backend setup (inside container):**
  ```bash
  docker exec -it blog_app bash
  composer install
  php artisan migrate
  php artisan key:generate
  exit
  ```
- **Frontend dev server:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Run backend tests:**
  ```bash
  docker exec -it blog_app bash
  php artisan test
  ```
- **Run frontend tests:**
  ```bash
  cd frontend
  npm test
  ```

## Conventions & Patterns
- **API-first:** All business logic exposed via RESTful endpoints (`routes/api.php`).
- **Sanctum for auth:** Laravel Sanctum is used for API authentication.
- **Frontend-backend integration:** Frontend fetches data from backend API, expects JSON responses.
- **Styling:** Tailwind CSS is used in frontend.
- **Environment config:** `.env` files for both backend and frontend; secrets are not committed.
- **Database migrations:** Use `php artisan migrate` for schema changes.

## Integration Points
- **Auth:** Laravel Sanctum (`composer require laravel/sanctum`)
- **API:** All endpoints under `/api/*` (see `routes/api.php`)
- **Frontend:** Communicates with backend via fetch/axios to `/api/*`
- **Docker:** Nginx serves frontend and proxies API requests to backend

## Examples
- To add a new API endpoint: create a controller in `app/Http/Controllers/`, register route in `routes/api.php`
- To add a new frontend page: create a file in `src/pages/`, link via React Router

## References
- See `demo/README.md` for quickstart and setup
- See `backend/README.md` and `frontend/README.md` for framework-specific details

---
For questions or unclear conventions, check the respective README files or ask for clarification.
