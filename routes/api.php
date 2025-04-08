<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::prefix('/auth')->group(function () {
    Route::post('/verify-auth', [AuthController::class, 'registerOrLoginWithOtp']);
    Route::post('/auth-check', [AuthController::class, 'check'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::post('/otp/send', [OtpController::class, 'OtpRequest']);

Route::prefix('/user')->group(function () {
    Route::get('/{user_id}/subscriptions', [UserController::class, 'index'])->name('subscriptions');
    Route::get('/{user_id}/subscribers', [UserController::class, 'index'])->name('subscribers');
    Route::get('/{user_id}', [UserController::class, 'show']);
    Route::post('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/delete', [UserController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('post')->group(function () {
    Route::get('/user/{user_id}', [PostController::class, 'index'])->name('posts');
    Route::get('/feed', [PostController::class, 'index'])->name('posts')->middleware('auth:sanctum');
    Route::post('/', [PostController::class, 'store'])->middleware('auth:sanctum');
    Route::get('/{post_id}', [PostController::class, 'show']);
    Route::delete('/{post_id}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('posts/{post_id}/comments')->group(function () {
    Route::get('/', [CommentController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/', [CommentController::class, 'store'])->middleware('auth:sanctum');
});