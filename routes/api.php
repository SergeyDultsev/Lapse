<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::prefix('/auth')->group(function () {
    Route::post('/verify-auth', [AuthController::class, 'registerOrLoginWithOtp']);
    Route::post('/check', [AuthController::class, 'check'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::post('/opt-request', [OtpController::class, 'OtpRequest']);

Route::prefix('/user')->group(function () {
    Route::get('/subscriptions/{user_id}', [UserController::class, 'index'])->name('subscriptions');
    Route::get('/subscribers/{user_id}', [UserController::class, 'index'])->name('subscribers');
    Route::get('/{user_id}', [UserController::class, 'show']);
    Route::post('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/delete', [UserController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('post')->group(function () {
    Route::get('/posts/{user_id}', [PostController::class, 'index'])->name('posts');
    Route::get('/feed/{user_id}', [PostController::class, 'index'])->name('feed');
    Route::post('/create', [PostController::class, 'store'])->middleware('auth:sanctum');
    Route::get('/{post_id}', [PostController::class, 'show'])->middleware('auth:sanctum');
    Route::delete('/{post_id}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
});