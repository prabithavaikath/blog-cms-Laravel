<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\AdminController; // keep this

// AUTH routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// ADMIN routes (protected by Sanctum)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']); // ✅ fixed: now uses AdminController
    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class);
});

// PUBLIC routes
Route::get('/public/posts', [PostController::class, 'publicIndex']);
Route::get('/public/posts/{slug}', [PostController::class, 'showBySlug']);

Route::get('/test-error', function () {
    \Log::info('Test log message');
    throw new \Exception('This is a test exception');
});
