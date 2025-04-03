<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::prefix('/auth')->group(function () {
    Route::post('/request-auth', [AuthController::class, 'initiateLogin']);
    Route::post('/verify-auth', [AuthController::class, 'registerOrLoginWithOtp']);
    Route::post('/check', [AuthController::class, 'check'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::prefix('/user')->group(function () {
    Route::post('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
});