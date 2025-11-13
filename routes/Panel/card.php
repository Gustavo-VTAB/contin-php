<?php

use App\Http\Controllers\Panel\CardController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllCards', [CardController::class, 'getAllCards'])->name('getAllCards');
Route::post('/createCard', [CardController::class, 'createCard'])->name('createCard');
Route::put('/updateCard/{id}', [CardController::class, 'updateCard'])->name('updateCard');
Route::delete('/deleteCard/{id}', [CardController::class, 'deleteCard'])->name('deleteCard');