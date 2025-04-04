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
    Route::get('/{user_id}', [UserController::class, 'show']);
    Route::patch('/update', [UserController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/delete', [UserController::class, 'destroy'])->middleware('auth:sanctum');
});