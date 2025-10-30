# Laravel + React + Docker Blog Starter

A full-stack starter template using:
- **Laravel 12 (API)**
- **React + Vite (Frontend)**
- **MySQL 8**
- **Docker Compose** with Nginx + PHP-FPM + Node

---

## 🚀 Quick Start

```bash
# Clone & build
git clone https://github.com/<your-username>/demo-blog-stack.git
cd demo-blog-stack
docker compose up -d --build

# Setup Laravel
docker exec -it blog_app bash
composer create-project laravel/laravel .
php artisan key:generate
php artisan migrate
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate
exit
