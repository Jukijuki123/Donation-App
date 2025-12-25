# Donation App – LKS Internal SIJA 2025

A simple donation monitoring application built with:

## Tech Stack
- Backend: Laravel 12
- Frontend: React 18 + React Router v7
- Styling: Bootstrap 5.3
- Database: MySQL

## Features
- Admin login
- View all donations
- View donation detail
- Create donation
- Delete donation (admin only)

## Setup Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
