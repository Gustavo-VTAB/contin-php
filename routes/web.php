<?php

use App\Http\Controllers\Pages\BMsController;
use App\Http\Controllers\Pages\CardsController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\LoginController;
use App\Http\Controllers\Pages\LogsController;
use App\Http\Controllers\Pages\PagesController;
use App\Http\Controllers\Pages\PhonesController;
use App\Http\Controllers\Pages\ProfilesController;
use App\Http\Controllers\Pages\RegisterController;
use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'App\Http\Controllers\Pages',
], function () {
    Route::get('/', [LoginController::class, 'index'])->name('index');
    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/cards', [CardsController::class, 'index'])->name('cards');
    Route::get('/bms', [BMsController::class, 'index'])->name('bms');
    Route::get('/pages', [PagesController::class, 'index'])->name('pages');
    Route::get('/phones', [PhonesController::class, 'index'])->name('phones');
    Route::get('/profiles', [ProfilesController::class, 'index'])->name('profiles');
    Route::get('/logs', [LogsController::class, 'index'])->name('logs');


});

Route::group([
    'prefix' => 'Auth',
    'as' => 'Auth.',
    'namespace' => 'App\Http\Controllers\Auth',
], function () {
    require __DIR__ . '/Auth/auth.php';
});
    