<?php

use App\Http\Controllers\Panel\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllProfiles', [ProfileController::class, 'index'])->name('index');
Route::post('/store', [ProfileController::class, 'store'])->name('store');
Route::put('/update/{id}', [ProfileController::class, 'update'])->name('update');
Route::delete('/destroy/{id}', [ProfileController::class, 'destroy'])->name('destroy');