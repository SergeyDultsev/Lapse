<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::prefix('/auth')->group(function () {
    Route::post('/request-auth', [AuthController::class, 'initiateLogin']);
    Route::post('/verify-auth', [AuthController::class, 'registerOrLoginWithOtp']);
    Route::post('/check', [AuthController::class, 'check'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});