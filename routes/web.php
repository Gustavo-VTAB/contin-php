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
    Route::get('/profile', [ProfilesController::class, 'profile'])->name('profile');
});

Route::group([
    'prefix' => 'Auth',
    'as' => 'Auth.',
    'namespace' => 'App\Http\Controllers\Auth',
], function () {
    require __DIR__ . '/Auth/auth.php';
});

Route::group([
    'prefix' => 'profiles',
    'as' => 'profiles.',
    'namespace' => 'App\Http\Controllers\Panel',
], function () {
    require __DIR__ . '/Panel/profiles.php';   
});

Route::group([
    'prefix' => 'phones',
    'as' => 'phones.',
    'namespace' => 'App\Http\Controllers\Panel',
], function () {
    require __DIR__ . '/Panel/phones.php';
});


Route::group([
    'prefix' => 'logs',
    'as' => 'logs.',
    'namespace' => 'App\Http\Controllers\Panel',
], function () {
    require __DIR__ . '/Panel/logs.php';
});
>>>>>>> 9ec8b22844b2994419c1ff7b93001eb7595bd2d7
