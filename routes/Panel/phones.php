<?php

use App\Http\Controllers\Panel\PhoneController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PhoneController::class, 'getAllPhones'])->name('getAllPhones');
Route::post('/', [PhoneController::class, 'createPhone'])->name('createPhone');
Route::put('/{id}', [PhoneController::class, 'updatePhone'])->name('updatePhone');
Route::delete('/{id}', [PhoneController::class, 'deletePhone'])->name('deletePhone');
