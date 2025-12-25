<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;

Route::prefix('v1')->group(function () {
    Route::get('/auth/login', [AuthController::class, 'login']);

    Route::get('/donation', [DonationController::class, 'index']);
    Route::get('/donation/{id}', [DonationController::class, 'show']);
    Route::post('/donation', [DonationController::class, 'store']);
    Route::delete('/donation/{id}', [DonationController::class, 'destroy']);
});
