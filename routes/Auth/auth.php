<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;


Route::get('/getProfile', [LoginController::class, 'getProfile'])->name('getProfile');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::post('/resetBlocked', [LoginController::class, 'resetBlocked'])->name('resetBlocked');
Route::post('/changePassword', [LoginController::class, 'changePassword'])->name('changePassword');

Route::post('/register', [RegisterController::class, 'register'])->name('register');