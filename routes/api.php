<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::prefix('/auth')->group(function () {
    Route::post('/verify-auth', [AuthController::class, 'registerOrLoginWithOtp']);
    Route::post('/auth-check', [AuthController::class, 'check'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
})->middleware('throttle:5,1');

Route::post('/otp/send', [OtpController::class, 'OtpRequest'])->middleware('throttle:5,1');

Route::prefix('/user')->group(function () {
    Route::get('/{user_id}/subscriptions', [UserController::class, 'index'])
        ->name('subscriptions')
        ->middleware('throttle:60,1');
    Route::get('/{user_id}/subscribers', [UserController::class, 'index'])
        ->name('subscribers')
        ->middleware('throttle:5,1');
    Route::get('/{user_id}', [UserController::class, 'show'])
        ->middleware('throttle:60,1');
    Route::post('/update', [UserController::class, 'update'])
        ->middleware('auth:sanctum', 'throttle:5,1');
    Route::delete('/delete', [UserController::class, 'destroy'])
        ->middleware('auth:sanctum', 'throttle:20,1');
});

Route::prefix('post')->group(function () {
    Route::get('/user/{user_id}', [PostController::class, 'index'])
        ->name('posts')
        ->middleware('throttle:60,1');
    Route::get('/feed', [PostController::class, 'index'])
        ->name('posts')
        ->middleware('auth:sanctum', 'throttle:20,1');
    Route::post('/', [PostController::class, 'store'])->middleware('auth:sanctum');
    Route::get('/{post_id}', [PostController::class, 'show'])
        ->middleware( 'throttle:60,1');
    Route::delete('/{post_id}', [PostController::class, 'destroy'])
        ->middleware('auth:sanctum', 'throttle:20,1');
});

Route::prefix('posts/{post_id}/comments')->group(function () {
    Route::get('/', [CommentController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/', [CommentController::class, 'store'])->middleware('auth:sanctum');
    Route::delete('/', [CommentController::class, 'destroy'])->middleware('auth:sanctum');
})->middleware('throttle:40,1');

Route::post('favorites/toggle/{post_id}', [FavoriteController::class, 'storeOrDelete'])
    ->middleware('auth:sanctum', 'throttle:20,1');
