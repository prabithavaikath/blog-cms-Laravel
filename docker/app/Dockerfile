FROM php:8.2-fpm

WORKDIR /app

# Install PHP extensions needed by Laravel (adjust as needed)
RUN docker-php-ext-install pdo pdo_mysql

# Optional: Composer inside the container
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
