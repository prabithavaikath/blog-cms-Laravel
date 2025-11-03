<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

// Token login
Route::post('/auth/login', [AuthController::class, 'tokenLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'tokenLogout']);

    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class)
        ->only(['index','store','update','destroy']);
});

// Public reads
Route::get('/public/posts', [PostController::class, 'publicIndex']);
Route::get('/public/posts/{slug}', [PostController::class, 'showBySlug']);
