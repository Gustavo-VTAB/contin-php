<?php

use App\Http\Controllers\Panel\LogController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllLogs', [LogController::class, 'getAllLogs'])->name('getAllLogs');
Route::post('/store', [LogController::class, 'createLog'])->name('createLog');
Route::put('/update/{id}', [LogController::class, 'updateLog'])->name('updateLog');
Route::delete('/destroy/{id}', [LogController::class, 'deleteLog'])->name('deleteLog');
