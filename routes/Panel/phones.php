<?php

use App\Http\Controllers\Panel\PhoneController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllPhones', [PhoneController::class, 'getAllPhones'])->name('getAllPhones');
Route::post('/createPhone', [PhoneController::class, 'createPhone'])->name('createPhone');
Route::put('/updatePhone/{id}', [PhoneController::class, 'updatePhone'])->name('updatePhone');
Route::delete('/destroy/{id}', [PhoneController::class, 'destroy'])->name('destroy');