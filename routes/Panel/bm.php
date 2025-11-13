<?php

use App\Http\Controllers\Panel\BmController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllBms', [BmController::class, 'index'])->name('index');
Route::post('/store', [BmController::class, 'store'])->name('store');
Route::put('/update/{id}', [BmController::class, 'update'])->name('update');
Route::delete('/destroy/{id}', [BmController::class, 'destroy'])->name('destroy');