<?php

use App\Http\Controllers\Panel\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/getAllPages', [PageController::class, 'getAllPages'])->name('getAllPages');
Route::post('/createPage', [PageController::class, 'createPage'])->name('createPage');
Route::put('/updatePage/{id}', [PageController::class, 'updatePage'])->name('updatePage');
Route::delete('/destroy/{id}', [PageController::class, 'destroy'])->name('deletePage');