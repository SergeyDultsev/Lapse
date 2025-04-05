<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
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
    Route::patch('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/delete', [UserController::class, 'destroy'])->middleware('auth:sanctum');
});