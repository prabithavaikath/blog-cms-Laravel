# ────────────────────────────────────────────────
# docker/app/Dockerfile
# PHP-FPM 8.3 for Laravel
# ────────────────────────────────────────────────
FROM php:8.3-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# 🔧 Fix permissions for Laravel writable dirs
RUN mkdir -p /app/storage /app/bootstrap/cache \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Switch to www-data user (no root permission issues later)
USER www-data

# Default PHP-FPM command
CMD ["php-fpm"]
        