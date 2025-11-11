<?php

use App\Http\Controllers\pages\DashboardController;
use App\Http\Controllers\pages\LoginController;
use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'App\Http\Controllers\pages',
], function () {
    Route::get('/', [LoginController::class, 'index'])->name('index');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
    